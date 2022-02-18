import React, { createContext, useEffect, useMemo, useState } from "react";
import { ThirdwebSDK, SDKOptions } from "@thirdweb-dev/sdk";
import {
  WagmiProvider,
  ProviderProps as WagmiproviderProps,
  useProvider,
} from "wagmi";
import { useSigner } from "./hooks/useSigner";
import invariant from "tiny-invariant";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { WalletLinkConnector } from "wagmi/connectors/walletLink";
import {
  Chain,
  defaultSupportedChains,
  SupportedChain,
} from "./constants/chain";

export type InjectedConnectorType =
  | "injected"
  | "metamask"
  | { name: "injected" | "metamask"; options?: InjectedConnector["options"] };

export type WalletConnectConnectorType =
  | "walletConnect"
  | { name: "walletConnect"; options: WalletConnectConnector["options"] };

export type WalletLinkConnectorType =
  | "walletLink"
  | "coinbase"
  | {
      name: "walletLink" | "coinbase";
      options: WalletLinkConnector["options"];
    };

export type WalletConnector =
  | InjectedConnectorType
  | WalletConnectConnectorType
  | WalletLinkConnectorType;

export type ChainRpc<TSupportedChain extends SupportedChain> = Record<
  TSupportedChain extends Chain ? TSupportedChain["id"] : TSupportedChain,
  string
>;

export interface DAppMetaData {
  name: string;
  description?: string;
  logoUrl?: string;
  url?: string;
  isDarkMode?: boolean;
}

export interface ThirdwebProviderProps<
  TSupportedChain extends SupportedChain = SupportedChain,
> {
  /**
   * The {@link SDKOptions} to pass to the thirdweb SDK
   * comes with sensible defaults
   */
  sdkOptions?: SDKOptions;
  /**
   * An array of chainIds or {@link Chain} objects that the dApp supports
   * If not provided, all chains supported by the SDK will be supported by default
   */
  supportedChains?: TSupportedChain[];
  /**
   * An array of connector types (strings) or {@link WalletConnector} objects that the dApp supports
   * If not provided, will default to metamask (injected), wallet connect and walletlink (coinbase wallet) with sensible defaults
   */
  walletConnectors?: WalletConnector[];
  /**
   * A partial map of chainIds to rpc urls to use for certain chains
   * If not provided, will default to the rpcUrls of the chain objects for the supported chains
   */
  chainRpc?: Partial<ChainRpc<TSupportedChain>>;
  /**
   * Metadata to pass to wallet connect and walletlink wallet connect. (Used to show *which* dApp is being connected to in mobile wallets that support it)
   * Defaults to just the name being passed as `thirdweb powered dApp`.
   */
  dAppMeta?: DAppMetaData;
  /**
   * The chainId that your dApp is running on.
   * While this *can* be `undefined` it is required to be passed. Passing `undefined` will cause no SDK to be instantiated.
   * When passing a chainId, it **must** be part of the `supportedChains` array.
   */
  desiredChainId: TSupportedChain extends Chain
    ? TSupportedChain["id"]
    : TSupportedChain | undefined;
}

const defaultChainRpc: ThirdwebProviderProps["chainRpc"] = {
  1: "mainnet",
  4: "rinkeby",
  137: "https://polygon-rpc.com",
  250: "https://rpc.ftm.tools",
  43114: "https://api.avax.network/ext/bc/C/rpc",
  80001: "https://rpc-mumbai.maticvigil.com",
};

const defaultdAppMeta: DAppMetaData = {
  name: "thirdweb powered dApp",
};

const defaultWalletConnectors: Required<
  ThirdwebProviderProps["walletConnectors"]
> = ["metamask", "walletConnect", "walletLink"];

export const ThirdwebProvider = <
  TSupportedChain extends SupportedChain = SupportedChain,
>({
  sdkOptions,
  chainRpc = defaultChainRpc,
  supportedChains = defaultSupportedChains.map(
    (c) => c.id,
  ) as TSupportedChain[],
  walletConnectors = defaultWalletConnectors,
  dAppMeta = defaultdAppMeta,
  desiredChainId,
  children,
}: React.PropsWithChildren<ThirdwebProviderProps<TSupportedChain>>) => {
  // construct the wagmi options

  const _supporrtedChains = useMemo(() => {
    return supportedChains
      .map((c) => {
        if (typeof c === "number") {
          return defaultSupportedChains.find((sc) => sc.id === c);
        }
        return c as Chain;
      })
      .filter((c) => c !== undefined) as Chain[];
  }, [supportedChains]);

  const _rpcUrlMap = useMemo(() => {
    return _supporrtedChains.reduce((prev, curr) => {
      prev[curr.id] =
        curr.id in chainRpc
          ? chainRpc[curr.id as keyof ChainRpc<TSupportedChain>] ||
            curr.rpcUrls[0]
          : curr.rpcUrls[0];
      return prev;
    }, {} as Record<number, string>);
  }, [chainRpc, _supporrtedChains]);

  const wagmiProps: WagmiproviderProps = useMemo(() => {
    const walletConnectClientMeta = {
      name: dAppMeta.name,
      url: dAppMeta.url || "",
      icons: [dAppMeta.logoUrl || ""],
      description: dAppMeta.description || "",
    };

    const walletLinkClientMeta = {
      appName: dAppMeta.name,
      appLogoUrl: dAppMeta.logoUrl,
      darkMode: dAppMeta.isDarkMode,
    };

    return {
      autoConnect: true,
      connectorStorageKey: "tw:provider:connectors",
      connectors: ({ chainId }: { chainId?: number }) => {
        return walletConnectors.map((connector) => {
          // injected connector
          if (
            (typeof connector === "string" &&
              (connector === "injected" || connector === "metamask")) ||
            (typeof connector === "object" &&
              (connector.name === "injected" || connector.name === "metamask"))
          ) {
            return new InjectedConnector({
              options:
                typeof connector === "string"
                  ? { shimDisconnect: true }
                  : connector.options,
              chains: _supporrtedChains,
            });
          } else if (
            (typeof connector === "string" && connector === "walletConnect") ||
            (typeof connector === "object" &&
              connector.name === "walletConnect")
          ) {
            return new WalletConnectConnector({
              options:
                typeof connector === "string"
                  ? {
                      chainId,
                      rpc: _rpcUrlMap,
                      clientMeta: walletConnectClientMeta,
                      qrcode: true,
                    }
                  : {
                      chainId,
                      rpc: _rpcUrlMap,
                      clientMeta: walletConnectClientMeta,
                      qrcode: true,
                      ...connector.options,
                    },
              chains: _supporrtedChains,
            });
          } else if (
            (typeof connector === "string" &&
              (connector === "coinbase" || connector === "walletLink")) ||
            (typeof connector === "object" &&
              (connector.name === "coinbase" ||
                connector.name === "walletLink"))
          ) {
            return new WalletLinkConnector({
              chains: _supporrtedChains,
              options:
                typeof connector === "string"
                  ? {
                      ...walletLinkClientMeta,
                      jsonRpcUrl: _rpcUrlMap[chainId || -1] || undefined,
                    }
                  : {
                      ...walletLinkClientMeta,
                      jsonRpcUrl: _rpcUrlMap[chainId || -1] || undefined,
                      ...connector.options,
                    },
            });
          }
        });
      },
    } as WagmiproviderProps;
  }, [walletConnectors, _supporrtedChains, dAppMeta]);

  return (
    <WagmiProvider {...wagmiProps}>
      <ThirdwebSDKProvider
        desiredChainId={desiredChainId}
        sdkOptions={sdkOptions}
      >
        {children}
      </ThirdwebSDKProvider>
    </WagmiProvider>
  );
};

interface SDKContext {
  sdk?: ThirdwebSDK;
  _inProvider?: true;
}

const ThirdwebSDKContext = createContext<SDKContext>({});

const ThirdwebSDKProvider: React.FC<
  Pick<ThirdwebProviderProps, "desiredChainId" | "sdkOptions">
> = ({ sdkOptions, desiredChainId, children }) => {
  const [sdk, setSDK] = useState<ThirdwebSDK | undefined>(undefined);
  const provider = useProvider();
  const signer = useSigner();

  useEffect(() => {
    if (desiredChainId) {
      const _sdk = new ThirdwebSDK(provider, sdkOptions);
      (_sdk as any)._chainId = desiredChainId;
      setSDK(_sdk);
    }
  }, [desiredChainId]);

  useEffect(() => {
    if (signer && sdk && (sdk as any)._chainId === desiredChainId) {
      sdk.updateSignerOrProvider(signer);
    }
  }, [signer, sdk, desiredChainId]);

  const ctxValue = useMemo(
    () => ({
      sdk,
      _inProvider: true as const,
    }),
    [sdk],
  );

  return (
    <ThirdwebSDKContext.Provider value={ctxValue}>
      {children}
    </ThirdwebSDKContext.Provider>
  );
};

export function useSDK(): ThirdwebSDK | undefined {
  const ctx = React.useContext(ThirdwebSDKContext);
  invariant(
    ctx._inProvider,
    "useSDK must be called from within a ThirdwebProvider, did you forget to wrap your app in a <ThirdwebProvider />?",
  );
  return ctx.sdk;
}
