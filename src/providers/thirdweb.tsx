import { defaultChains } from "../costants/chains";
import { ThirdwebSDKProvider, ThirdwebSDKProviderProps } from "./thirdweb-sdk";
import {
  ChainIdOrName,
  defaultRPCMap,
  getReadOnlyProvider,
} from "@thirdweb-dev/sdk/dist/browser";
import { Chain, InjectedConnector } from "@wagmi/core";
import { getDefaultProvider } from "ethers";
import React, { useMemo } from "react";
import {
  WagmiConfig,
  createClient,
  useClient,
  useNetwork,
  useSigner,
} from "wagmi";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

interface ThirdweProviderProps
  extends Omit<
    ThirdwebSDKProviderProps,
    "signer" | "queryClient" | "chainIdToRPCUrlMap" | "chainId"
  > {
  supportedChains?: Chain[];
  wagmiClient?: ReturnType<typeof createClient>;
  chainId?: ChainIdOrName;
}

export const ThirdwebProvider: React.FC<
  React.PropsWithChildren<ThirdweProviderProps>
> = ({
  children,
  wagmiClient,
  supportedChains = defaultChains,
  ...restProps
}) => {
  const mergedRPCMap = useMemo(() => {
    return {
      ...defaultRPCMap,
      // turn the supportedChains into a map of chainId to rpcUrl
      ...supportedChains.reduce((acc, curr) => {
        acc[curr.id] = curr.rpcUrls.default;
        return acc;
      }, {} as Record<number, string>),
    };
  }, [supportedChains]);

  // use the passed-in wagmi client or create a new one with the default config
  const client = useMemo(() => {
    if (wagmiClient) {
      return wagmiClient;
    }

    return createClient({
      autoConnect: true,
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
      <ThirdwebWagmiEnhancer {...restProps} chainIdToRPCUrlMap={mergedRPCMap}>
        {children}
      </ThirdwebWagmiEnhancer>
    </WagmiConfig>
  );
};

const ThirdwebWagmiEnhancer: React.FC<
  React.PropsWithChildren<
    Omit<ThirdwebSDKProviderProps, "signer" | "queryClient" | "chainId"> & {
      chainId?: ChainIdOrName;
    }
  >
> = ({ children, chainId, ...restProps }) => {
  const { data: signer } = useSigner();
  const { chain } = useNetwork();
  const wagmiClient = useClient();
  return (
    <ThirdwebSDKProvider
      {...restProps}
      chainId={chainId || chain?.id}
      signer={signer || undefined}
      queryClient={wagmiClient.queryClient}
    >
      {children}
    </ThirdwebSDKProvider>
  );
};
