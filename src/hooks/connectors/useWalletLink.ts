import invariant from "tiny-invariant";
import { useConnect } from "../useConnect";

export function useWalletLink() {
  const [connectors, connect] = useConnect();
  if (connectors.loading) {
    return () =>
      Promise.reject(
        "WalletLink / Coinbase connector not ready to be used, yet",
      );
  }
  const connector = connectors.data.connectors.find(
    (c) => c.id === "walletLink",
  );
  invariant(
    connector,
    "WalletLink / Coinbase connector not found, please make sure it is provided to your <ThirdwebProvider />",
  );

  return () => connect(connector);
}

/**
 * an alias for the useWalletLink hook
 */
export function useCoinbaseWallet() {
  return useWalletLink();
}
