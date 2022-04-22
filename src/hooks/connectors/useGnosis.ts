import { useConnect } from "../useConnect";
import invariant from "tiny-invariant";

/**
 * Convienience hook for connecting to a gnosis safe
 * @returns a function that will prompt the user to connect their gnosis safe
 * @public
 */
export function useGnosis() {
  const [connectors, connect] = useConnect();
  if (connectors.loading) {
    return () => Promise.reject("Gnosis connector not ready to be used, yet");
  }
  const connector = connectors.data.connectors.find((c) => c.id === "gnosis");
  invariant(
    connector,
    "Gnosis connector not found, please make sure it is provided to your <ThirdwebProvider />",
  );

  return () => connect(connector);
}
