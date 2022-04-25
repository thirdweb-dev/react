import { useConnect } from "../useConnect";
import invariant from "tiny-invariant";

/**
 * Hook for connecting to a Coinbase wallet.
 *
 * ```javascript
 * import { useCoinbaseWallet } from "@thirdweb-dev/react"
 * ```
 *
 *
 * @example
 * ```javascript
 * import { useCoinbaseWallet } from "@thirdweb-dev/react"
 *
 * const App = () => {
 *   const connectWithCoinbaseWallet = useCoinbaseWallet()
 *
 *   return (
 *     <button onClick={connectWithCoinbaseWallet}>
 *       Connect Coinbase Wallet
 *     </button>
 *   )
 * }
 * ```
 *
 * @public
 */
export function useCoinbaseWallet() {
  const [connectors, connect] = useConnect();
  if (connectors.loading) {
    return () => Promise.reject("Coinbase connector not ready to be used, yet");
  }
  const connector = connectors.data.connectors.find(
    (c) => c.id === "coinbasewallet",
  );
  invariant(
    connector,
    "Coinbase connector not found, please make sure it is provided to your <ThirdwebProvider />",
  );

  return () => connect(connector);
}

/**
 * Convienience hook for connecting to a wallet via WalletLink (coinbase wallet)
 * @returns a function that will prompt the user to connect their wallet via WalletLink (coinbase wallet)
 * @internal
 */
export function useWalletLink() {
  return useCoinbaseWallet();
}
