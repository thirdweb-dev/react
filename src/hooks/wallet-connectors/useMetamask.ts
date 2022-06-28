import type { SUPPORTED_CHAIN_ID } from "@thirdweb-dev/sdk";
import { useCallback } from "react";
import { useConnect } from "wagmi";

export function useMetamask() {
  const {
    connect: _connect,
    error,
    isLoading,
    pendingConnector,
  } = useConnect();

  const connect = useCallback(
    async (chainId?: SUPPORTED_CHAIN_ID) => {
      const { MetaMaskConnector } = await import("wagmi/connectors/metaMask");
      return _connect({
        connector: new MetaMaskConnector({
          options: { shimChainChangedDisconnect: true, shimDisconnect: true },
        }),
        chainId,
      });
    },
    [_connect],
  );

  return {
    error,
    isConnecting: isLoading && pendingConnector?.id === "metaMask",
    connect,
  };
}
