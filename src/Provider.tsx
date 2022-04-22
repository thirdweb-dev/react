import { MagicConnector, MagicConnectorArguments } from "./connectors/magic";
import {
  Chain,
  SupportedChain,
  defaultSupportedChains,
} from "./constants/chain";
import { useSigner } from "./hooks/useSigner";
import {
  IStorage,
  SDKOptions,
  SUPPORTED_CHAIN_ID,
  ThirdwebSDK,
} from "@thirdweb-dev/sdk";
import React, { createContext, useEffect, useMemo } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import invariant from "tiny-invariant";
import {
  WagmiProvider,
  ProviderProps as WagmiproviderProps,
  useProvider,
} from "wagmi";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

/**
 * @internal
 */
export type InjectedConnectorType =
  | "injected"
  | "metamask"
  | { name: "injected" | "metamask"; options?: InjectedConnector["options"] };

/**
 * @internal
 */
export type WalletConnectConnectorType =
  | "walletConnect"
  | { name: "walletConnect"; options: WalletConnectConnector["options"] };

/**
 * @internal
 */
export type WalletLinkConnectorType =
  | "walletLink"
  | "coinbase"
  | {
      name: "walletLink" | "coinbase";
      options: CoinbaseWalletConnector["options"];
    };

/**
 * @internal
 */
export type MagicConnectorType =
  | "magic"
  | {
      name: "magic";
      options: Omit<MagicConnectorArguments, "network">;
    };

/**
 * @internal
 */
export type WalletConnector =
  | InjectedConnectorType
  | WalletConnectConnectorType
  | WalletLinkConnectorType
  | MagicConnectorType;

/**
 * @internal
 */
export type ChainRpc<TSupportedChain extends SupportedChain> = Record<
  TSupportedChain extends Chain ? TSupportedChain["id"] : TSupportedChain,
  string
>;

/**
 * the metadata to pass to wallet connection dialog (may show up during the wallet-connection process)
 * @remarks this is only used for wallet connect and wallet link, metamask does not support it
 * @public
 */
export interface DAppMetaData {
  /**
   * the name of your app
   */
  name: string;
  /**
   * optional - a description of your app
   */
  description?: string;
  /**
   * optional - a url that points to a logo (or favicon) of your app
   */
  logoUrl?: string;
  /**
   * optional - the url where your app is hosted
   */
  url?: string;
  /**
   * optional - whether to show the connect dialog in darkmode or not
   */
  isDarkMode?: boolean;
}

/**
 * The possible props for the ThirdwebProvider.
 */
export interface ThirdwebProviderProps<
  TSupportedChain extends SupportedChain = SupportedChain,
> {
  /**
   * The {@link SDKOptions | Thirdweb SDK Options} to pass to the thirdweb SDK
   * comes with sensible defaults
   */
  sdkOptions?: SDKOptions;
  /**
   * An array of chainIds or {@link Chain} objects that the dApp supports
   * If not provided, all chains supported by the SDK will be supported by default
   */
  supportedChains?: TSupportedChain[];
  /**
   * An array of connector types (strings) or wallet connector objects that the dApp supports
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

  /**
   * The storage interface to use with the sdk.
   */
  storageInterface?: IStorage;

  /**
   * The react-query client to use. (Defaults to a default client.)
   * @beta
   */
  queryClient?: QueryClient;

  /**
   * Whether or not to attempt auto-connect to a wallet.
   */
  autoConnect?: boolean;
}

const defaultChainRpc: ChainRpc<SupportedChain> = defaultSupportedChains.reduce(
  (prev, curr) => ({ ...prev, [curr.id]: curr.rpcUrls[0] }),
  {},
);

const defaultdAppMeta: DAppMetaData = {
  name: "thirdweb powered dApp",
};

const defaultWalletConnectors: Required<
  ThirdwebProviderProps["walletConnectors"]
> = ["metamask", "walletConnect", "walletLink"];

/**
 *
 * The `<ThirdwebProvider />` component, you need to wrap your application with this provider to use the thirdweb react sdk.
 *
 *
 *
 * @example
 * Wrap your application with the Provider
 * ```jsx title="App.jsx"
 * import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";
 *
 * const App = () => {
 *   return (
 *     <ThirdwebProvider desiredChainId={ChainId.Mainnet}>
 *       <YourApp />
 *     </ThirdwebProvider>
 *   );
 * };
```
 *
 * @public
 *
 */
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
  storageInterface,
  queryClient,
  autoConnect = true,
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
      autoConnect,
      connectorStorageKey: "tw:provider:connectors",
      connectors: ({ chainId }: { chainId?: number }) => {
        return walletConnectors
          .map((connector) => {
            // injected connector
            if (
              (typeof connector === "string" &&
                (connector === "injected" || connector === "metamask")) ||
              (typeof connector === "object" &&
                (connector.name === "injected" ||
                  connector.name === "metamask"))
            ) {
              return new InjectedConnector({
                options:
                  typeof connector === "string"
                    ? { shimDisconnect: true, shimChainChangedDisconnect: true }
                    : connector.options,
                chains: _supporrtedChains,
              });
            }
            if (
              (typeof connector === "string" &&
                connector === "walletConnect") ||
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
            }
            if (
              (typeof connector === "string" &&
                (connector === "coinbase" || connector === "walletLink")) ||
              (typeof connector === "object" &&
                (connector.name === "coinbase" ||
                  connector.name === "walletLink"))
            ) {
              const jsonRpcUrl = _rpcUrlMap[chainId || desiredChainId || 1];
              return new CoinbaseWalletConnector({
                chains: _supporrtedChains,
                options:
                  typeof connector === "string"
                    ? {
                        ...walletLinkClientMeta,
                        jsonRpcUrl,
                      }
                    : {
                        ...walletLinkClientMeta,
                        jsonRpcUrl,
                        ...connector.options,
                      },
              });
            }
            if (typeof connector === "object" && connector.name === "magic") {
              const jsonRpcUrl = _rpcUrlMap[chainId || desiredChainId || 1];
              return new MagicConnector({
                chains: _supporrtedChains,
                options: {
                  ...connector.options,
                  network: { rpcUrl: jsonRpcUrl, chainId: desiredChainId || 1 },
                  rpcUrls: _rpcUrlMap,
                },
              });
            }
            return null;
          })
          .filter((c) => c !== null);
      },
    } as WagmiproviderProps;
  }, [walletConnectors, _supporrtedChains, dAppMeta]);

  const defaultSdkReadUrl =
    _rpcUrlMap[(desiredChainId || -1) as keyof typeof _rpcUrlMap];

  const sdkOptionsWithDefaults = useMemo(() => {
    const opts: SDKOptions = sdkOptions;
    return {
      ...opts,
      readonlySettings: {
        ...(opts?.readonlySettings || {}),
        rpcUrl: opts?.readonlySettings?.rpcUrl
          ? opts.readonlySettings.rpcUrl
          : defaultSdkReadUrl,
      },
    };
  }, [sdkOptions, defaultSdkReadUrl]);

  const queryClientWithDefault: QueryClient = useMemo(() => {
    return queryClient ? queryClient : new QueryClient();
  }, [queryClient]);

  return (
    <QueryClientProvider client={queryClientWithDefault}>
      <WagmiProvider {...wagmiProps}>
        <ThirdwebSDKProvider
          desiredChainId={desiredChainId}
          sdkOptions={sdkOptionsWithDefaults}
          storageInterface={storageInterface}
        >
          {children}
        </ThirdwebSDKProvider>
      </WagmiProvider>
    </QueryClientProvider>
  );
};

interface SDKContext {
  sdk?: ThirdwebSDK;
  _inProvider?: true;
  desiredChainId: number;
}

const ThirdwebSDKContext = createContext<SDKContext>({ desiredChainId: -1 });

const ThirdwebSDKProvider: React.FC<
  React.PropsWithChildren<
    Pick<
      ThirdwebProviderProps,
      "desiredChainId" | "sdkOptions" | "storageInterface"
    >
  >
> = ({ sdkOptions, desiredChainId, storageInterface, children }) => {
  const provider = useProvider();
  const signer = useSigner();

  const sdk = useMemo(() => {
    if (!desiredChainId || typeof window === "undefined") {
      return undefined;
    }
    const _sdk = new ThirdwebSDK(provider, sdkOptions, storageInterface);
    (_sdk as any)._chainId = desiredChainId;
    return _sdk;
  }, [provider, sdkOptions, storageInterface, desiredChainId]);

  useEffect(() => {
    if (signer && sdk && (sdk as any)._chainId === desiredChainId) {
      sdk.updateSignerOrProvider(signer);
    }
  }, [signer, sdk, desiredChainId]);

  const ctxValue = useMemo(
    () => ({
      sdk,
      desiredChainId: desiredChainId || -1,
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

/**
 *
 * @returns {@link ThirdwebSDK}
 * @internal
 */
export function useSDK(): ThirdwebSDK | undefined {
  const ctx = React.useContext(ThirdwebSDKContext);
  invariant(
    ctx._inProvider,
    "useSDK must be called from within a ThirdwebProvider, did you forget to wrap your app in a <ThirdwebProvider />?",
  );
  return ctx.sdk;
}

/**
 *
 * @internal
 */
export function useDesiredChainId(): number {
  const ctx = React.useContext(ThirdwebSDKContext);
  invariant(
    ctx._inProvider,
    "useDesiredChainId must be called from within a ThirdwebProvider, did you forget to wrap your app in a <ThirdwebProvider />?",
  );
  return ctx.desiredChainId;
}

/**
 *
 * @internal
 */
export function useActiveChainId(): SUPPORTED_CHAIN_ID | undefined {
  const ctx = React.useContext(ThirdwebSDKContext);
  invariant(
    ctx._inProvider,
    "useActiveChainId must be called from within a ThirdwebProvider, did you forget to wrap your app in a <ThirdwebProvider />?",
  );
  return (ctx.sdk as any)?._chainId;
}
