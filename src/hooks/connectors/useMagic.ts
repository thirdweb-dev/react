import { MagicConnector } from "../../connectors/magic";
import { useConnect } from "../useConnect";
import invariant from "tiny-invariant";

/**
 * Convienience hook for connecting to magic link
 * @returns a function that will prompt the user to connect their magic link
 * @public
 */
export function useMagic() {
  const [connectors, connect] = useConnect();
  if (connectors.loading) {
    return () => Promise.reject("Magic connector not ready to be used, yet");
  }

  const connector = connectors.data.connectors.find((c) => c.id === "magic");

  invariant(
    connector,
    "Magic connector not found, please make sure it is provided to your <ThirdwebProvider />",
  );

  return (email: string) => {
    (connector as MagicConnector).setEmail(email);
    return connect(connector);
  };
}
