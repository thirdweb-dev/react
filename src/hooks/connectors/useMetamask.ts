import { useConnect } from "../useConnect";
import invariant from "tiny-invariant";

/**
 * Hook for connecting to a Metamask wallet.
 *
 * ```javascript
 * import { useMetamask } from "@thirdweb-dev/react"
 * ```
 *
 *
 * @example
 * We can allow users to connect their metamask wallets as follows:
 * ```javascript
 * import { useMetamask } from "@thirdweb-dev/react"
 *
 * const App = () => {
 *   const connectWithMetamask = useMetamask()
 *
 *   return (
 *     <button onClick={connectWithMetamask}>
 *       Connect Metamask
 *     </button>
 *   )
 * }
 * ```
 * Here, we use the `useMetamask` hook to handle metamask connection.
 * When a user clicks the button, we'll call the `connectWithMetamask` function, which will prompt users to connect their metamask wallet.
 *
 * @public
 */
export function useMetamask() {
  const [connectors, connect] = useConnect();
  if (connectors.loading) {
    return () => Promise.reject("Metamask connector not ready to be used, yet");
  }
  const connector = connectors.data.connectors.find((c) => c.id === "injected");
  invariant(
    connector,
    "Metamask connector not found, please make sure it is provided to your <ThirdwebProvider />",
  );

  return () => {
    if (typeof window !== "undefined") {
      // browser context
      if (!window.ethereum) {
        // no injected connector available
        window.open(
          `https://metamask.app.link/dapp/${
            window.location.host +
            window.location.pathname +
            window.location.search
          }`,
          "_blank",
        );
        invariant("Metamask not found");
      }
    }
    return connect(connector);
  };
}
