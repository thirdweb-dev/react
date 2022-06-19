import { useThirdwebConfig } from "../../providers/thirdweb-sdk";
import type { SUPPORTED_CHAIN_ID } from "@thirdweb-dev/sdk";
import { useCallback } from "react";
import { useConnect } from "wagmi";

export function useWalletConnect() {
  const { chainIdToRPCUrlMap } = useThirdwebConfig();
  const { connect: _connect, error, isConnected, isConnecting } = useConnect();

  const connect = useCallback(
    async (chainId?: SUPPORTED_CHAIN_ID) => {
      const { WalletConnectConnector } = await import(
        "wagmi/connectors/walletConnect"
      );
      return _connect({
        connector: new WalletConnectConnector({
          options: { rpc: chainIdToRPCUrlMap },
        }),
        chainId,
      });
    },
    [_connect, chainIdToRPCUrlMap],
  );

  return { error, isConnected, isConnecting, connect };
}
