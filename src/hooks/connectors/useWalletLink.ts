import { useConnect } from "../useConnect";
import invariant from "tiny-invariant";

/**
 * Convienience hook for connecting to a wallet via WalletLink (coinbase wallet)
 * @returns a function that will prompt the user to connect their wallet via WalletLink (coinbase wallet)
 * @internal
 */
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
 * Convienience hook for connecting to a wallet via Coinbase Wallet
 * @returns a function that will prompt the user to connect their wallet via Coinbase Wallet
 * @public
 */
export function useCoinbaseWallet() {
  return useWalletLink();
}
