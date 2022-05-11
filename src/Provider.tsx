import { ThirdwebSDKProvider } from "./contexts/thirdweb-sdk-context";
import { RequiredParam } from "./types";
import { SDKOptions } from "@thirdweb-dev/sdk";
import { Signer, providers } from "ethers";
import React, { PropsWithChildren, useMemo } from "react";
import { QueryClient } from "react-query";
import { WagmiProvider, createClient, useProvider, useSigner } from "wagmi";

const DEFAULT_ALCHEMY_ID = "_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC";

interface ThirdwebProviderProps {
  queryClient?: QueryClient;
  sdkOptions: SDKOptions;
  desiredChainId: RequiredParam<number>;
}

export const ThirdwebProvider: React.FC<
  PropsWithChildren<ThirdwebProviderProps>
> = ({ queryClient, sdkOptions, desiredChainId, children }) => {
  const wagmiClient = useConfigureWagmiClient({
    queryClient,
    alchemyKey: DEFAULT_ALCHEMY_ID,
  });

  return (
    <WagmiProvider client={wagmiClient}>
      <WagmiWrappedProvider
        sdkOptions={sdkOptions}
        desiredChainId={desiredChainId}
      >
        {children}
      </WagmiWrappedProvider>
    </WagmiProvider>
  );
};

const WagmiWrappedProvider: React.FC<
  PropsWithChildren<
    Pick<ThirdwebProviderProps, "sdkOptions" | "desiredChainId">
  >
> = ({ sdkOptions, desiredChainId, children }) => {
  const provider = useProvider();
  const signer = useSigner();
  return (
    <ThirdwebSDKProvider
      signer={Signer.isSigner(signer.data) ? signer.data : undefined}
      provider={provider}
      sdkOptions={sdkOptions}
      desiredChainId={desiredChainId}
    >
      {children}
    </ThirdwebSDKProvider>
  );
};

function useConfigureWagmiClient(
  options: {
    queryClient?: QueryClient;
    alchemyKey: string;
  } = { alchemyKey: DEFAULT_ALCHEMY_ID },
) {
  const { queryClient } = options;
  return useMemo(() => {
    return createClient({
      autoConnect: true,
      queryClient,
      provider: ({ chainId }) => {
        return new providers.AlchemyProvider(chainId || 1, options.alchemyKey);
      },
    });
  }, [queryClient]);
}
