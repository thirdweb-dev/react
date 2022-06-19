import { ThirdwebSDKProvider, ThirdwebSDKProviderProps } from "./thirdweb-sdk";
import { defaultRPCMap, getReadOnlyProvider } from "@thirdweb-dev/sdk";
import { InjectedConnector } from "@wagmi/core";
import { getDefaultProvider, providers } from "ethers";
import React, { useMemo } from "react";
import {
  CreateClientConfig,
  WagmiConfig,
  createClient,
  useClient,
  useNetwork,
  useSigner,
} from "wagmi";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

const DEFAULT_WAGMI_CONFIG: CreateClientConfig<
  providers.BaseProvider,
  providers.WebSocketProvider
> = {
  autoConnect: true,
};

interface ThirdweProviderProps
  extends Omit<ThirdwebSDKProviderProps, "signer" | "queryClient"> {
  wagmiClient?: ReturnType<typeof createClient>;
}

export const ThirdwebProvider: React.FC<
  React.PropsWithChildren<ThirdweProviderProps>
> = ({ children, wagmiClient, chainIdToRPCUrlMap, ...restProps }) => {
  const mergedRPCMap = useMemo(() => {
    return { ...defaultRPCMap, ...chainIdToRPCUrlMap };
  }, [chainIdToRPCUrlMap]);

  // use the passed-in wagmi client or create a new one with the default config
  const client = useMemo(() => {
    if (wagmiClient) {
      return wagmiClient;
    }
    return createClient({
      ...DEFAULT_WAGMI_CONFIG,
      // if we have an rpc url for the current chain, use it
      provider: ({ chainId }) =>
        chainId && !!mergedRPCMap[chainId as keyof typeof mergedRPCMap]
          ? getReadOnlyProvider(
              mergedRPCMap[chainId as keyof typeof mergedRPCMap],
              chainId,
            )
          : getDefaultProvider(chainId),
      connectors: [
        new InjectedConnector({
          options: { shimChainChangedDisconnect: true, shimDisconnect: true },
        }),
        new WalletConnectConnector({ options: { rpc: mergedRPCMap } }),
        new CoinbaseWalletConnector({ options: { appName: "default" } }),
      ],
    });
  }, [wagmiClient, mergedRPCMap]);

  return (
    <WagmiConfig client={client}>
      <ThirdwebWagmiEnhancer
        {...restProps}
        chainIdToRPCUrlMap={chainIdToRPCUrlMap}
      >
        {children}
      </ThirdwebWagmiEnhancer>
    </WagmiConfig>
  );
};

const ThirdwebWagmiEnhancer: React.FC<
  React.PropsWithChildren<Omit<ThirdweProviderProps, "wagmiClient">>
> = ({ children, chainId, ...restProps }) => {
  const { data: signer } = useSigner();
  const { activeChain } = useNetwork();
  const wagmiClient = useClient();
  return (
    <ThirdwebSDKProvider
      {...restProps}
      chainId={chainId || activeChain?.id}
      signer={signer || undefined}
      queryClient={wagmiClient.queryClient}
    >
      {children}
    </ThirdwebSDKProvider>
  );
};
