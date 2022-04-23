import { MagicConnector } from "../../connectors/magic";
import { useConnect } from "../useConnect";
import { LoginWithMagicLinkConfiguration } from "magic-sdk";
import invariant from "tiny-invariant";

/**
 * Convienience hook for connecting to magic link (email wallet).
 *
 * @example
 * In order to use the hook to connect users with magic link, you just need to provide the users email to the connect function.
 *
 * You can setup the hook with the following configuration:
 * ```javascript
 * import { useMagic } from "@thirdweb-dev/react"
 * import { useState } from "react"
 *
 * const LoginWithMagicLink = () => {
 *   const connectWithMagic = useMagic()
 *   const [email, setEmail] = useState()
 *
 *   return (
 *     <div>
 *       <input value={email} onChange={(e) => setEmail(e.target.value)} />
 *       <button onClick={() => connectWithMagic({ email })}>Login</button>
 *     </div>
 *   )
 * }
 * ```
 *
 * @returns a function that will prompt the user to connect their magic link, given an email.
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

  return (configuration: LoginWithMagicLinkConfiguration) => {
    (connector as MagicConnector).setConfiguration(configuration);
    return connect(connector);
  };
}
