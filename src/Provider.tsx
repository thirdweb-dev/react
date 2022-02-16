import React, { createContext, useEffect, useMemo, useState } from "react";
import { ISDKOptions, ThirdwebSDK } from "@3rdweb/sdk";
import {
  WagmiProvider,
  ProviderProps as WagmiproviderProps,
  useProvider,
  Chain,
} from "wagmi";
import { useSigner } from "./hooks/useSigner";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  persistQueryClient,
  PersistQueryClientOptions,
} from "react-query/persistQueryClient-experimental";
import invariant from "tiny-invariant";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { WalletLinkConnector } from "wagmi/connectors/walletLink";

const createDefaultQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        // 24 hours
        cacheTime: 1000 * 60 * 60 * 24,
        // 30 seconds
        staleTime: 1000 * 30,
      },
    },
  });

const DEFAULT_RPC_URL_MAP = {
  1: "mainnet",
  4: "rinkeby",
  137: "https://polygon-rpc.com",
  250: "https://rpc.ftm.tools",
  43114: "https://api.avax.network/ext/bc/C/rpc",
  80001: "https://rpc-mumbai.maticvigil.com",
};

export interface ThirdwebPoviderProps {
  /**
   * The chain id / network you want the client to connect to
   */
  desiredChainId: number;
  /**
   * The name of your dApp. This will show up in the wallet connect / wallet link flow.
   */
  dAppName: string;
  /**
   *
   * The Thirdweb SDK options.
   * @see {@link https://thirdweb-dev.github.io/typescript-sdk/sdk.isdkoptions.html | ISDKOptions}
   */
  sdkOptions?: Partial<ISDKOptions>;
  /**
   *
   * Advanced options.
   */
  advanced?: {
    /**
     * Custom RPC URLs to use for different chains.
     */
    rpcUrlMap?: { [chainId: number]: string };
    /**
     * The supported chains that a user can connect to.
     * @see {@link https://wagmi-xyz.vercel.app/docs/connectors/injected#chains-optional | Chains}
     */
    supportedChains?: Chain[];
    /**
     * The options for the underlying wagmi provider.
     * @see {@link https://wagmi-xyz.vercel.app/docs/provider#configuration | WagmiproviderProps}
     */
    wagmiOptions?: Partial<WagmiproviderProps>;
    /**
     * The query client to use with react-query.
     * @see {@link https://react-query.tanstack.com/reference/QueryClient | QueryClient}
     */
    queryClient?: QueryClient;
    /**
     * The persistency options for the query client.
     * @see {@link https://react-query.tanstack.com/plugins/persistQueryClient#options | PersistQueryClientOptions}
     */
    persistClientOptions?: PersistQueryClientOptions;
  };
}

export const ThirdwebProvider: React.FC<ThirdwebPoviderProps> = ({
  sdkOptions,
  advanced,
  dAppName,
  desiredChainId,
  children,
}) => {
  // create the query client
  const actualQueryClient: QueryClient = useMemo(() => {
    return advanced?.queryClient
      ? advanced.queryClient
      : createDefaultQueryClient();
  }, [advanced?.queryClient]);

  // if we have a persister, persist with it
  useEffect(() => {
    if (advanced?.persistClientOptions) {
      persistQueryClient(advanced.persistClientOptions);
    }
  }, []);

  // construct the wagmi options
  const wagmiProps: WagmiproviderProps = useMemo(() => {
    const rpcUrlMap = advanced?.rpcUrlMap || DEFAULT_RPC_URL_MAP;

    const defaultProps: WagmiproviderProps = {
      autoConnect: true,
      connectorStorageKey: "tw:provider:connectors",
      connectors: ({ chainId }: { chainId?: number }) => {
        return [
          new InjectedConnector({
            options: { shimDisconnect: true },
            chains: advanced?.supportedChains,
          }),
          new WalletConnectConnector({
            options: {
              chainId,
              rpc: rpcUrlMap,
              qrcode: true,
            },
            chains: advanced?.supportedChains,
          }),
          new WalletLinkConnector({
            options: {
              appName: dAppName,
              appLogoUrl:
                typeof window !== "undefined"
                  ? `${window.location.origin}/favicon.ico`
                  : undefined,
              darkMode: false,
              jsonRpcUrl: rpcUrlMap[chainId || -1] || undefined,
            },
            chains: advanced?.supportedChains,
          }),
        ];
      },
    };

    return { ...defaultProps, ...advanced?.wagmiOptions };
  }, [
    advanced?.wagmiOptions,
    advanced?.supportedChains,
    advanced?.rpcUrlMap,
    dAppName,
  ]);

  return (
    <QueryClientProvider client={actualQueryClient}>
      <WagmiProvider {...wagmiProps}>
        <ThirdwebSDKProvider
          desiredChainId={desiredChainId}
          sdkOptions={sdkOptions}
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
}

const ThirdwebSDKContext = createContext<SDKContext>({});

const ThirdwebSDKProvider: React.FC<
  Pick<ThirdwebPoviderProps, "desiredChainId" | "sdkOptions">
> = ({ sdkOptions, desiredChainId, children }) => {
  const [sdk, setSDK] = useState<ThirdwebSDK | undefined>(undefined);
  const provider = useProvider();
  const signer = useSigner();

  useEffect(() => {
    if (desiredChainId) {
      const _sdk = new ThirdwebSDK(
        sdkOptions?.readOnlyRpcUrl || provider,
        sdkOptions,
      );
      (_sdk as any)._chainId = desiredChainId;
      setSDK(_sdk);
    }
  }, [desiredChainId]);

  useEffect(() => {
    if (signer.data && sdk && (sdk as any)._chainId === desiredChainId) {
      sdk.setProviderOrSigner(signer.data);
    }
  }, [signer.data, sdk, desiredChainId]);

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
