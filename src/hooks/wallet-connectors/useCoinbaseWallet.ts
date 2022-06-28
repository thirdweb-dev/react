import { useThirdwebConfig } from "../../providers/thirdweb-sdk";
import type { SUPPORTED_CHAIN_ID } from "@thirdweb-dev/sdk/dist/browser";
import { useCallback } from "react";
import { useConnect } from "wagmi";

export function useCoinbaseWallet() {
  const { appMetadata } = useThirdwebConfig();
  const {
    connect: _connect,
    error,
    isLoading,
    pendingConnector,
  } = useConnect();

  const connect = useCallback(
    async (chainId?: SUPPORTED_CHAIN_ID) => {
      const { CoinbaseWalletConnector } = await import(
        "wagmi/connectors/coinbaseWallet"
      );
      return _connect({
        connector: new CoinbaseWalletConnector({
          options: {
            appName: appMetadata.name,
            appLogoUrl: appMetadata.logoUrl,
          },
        }),
        chainId,
      });
    },
    [_connect, appMetadata.logoUrl, appMetadata.name],
  );

  return {
    error,
    isConnecting: isLoading && pendingConnector?.id === "coinbaseWallet",
    connect,
  };
}
