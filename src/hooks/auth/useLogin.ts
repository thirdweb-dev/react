import { useSDK } from "../../Provider";
import { useThirdwebConfigContext } from "../../contexts/thirdweb-config";
import { LoginOptions } from "@thirdweb-dev/sdk/dist/src/schema";
import invariant from "tiny-invariant";

export function useLogin() {
  const sdk = useSDK();
  const { authUrl } = useThirdwebConfigContext();

  async function login(domain: string, options: LoginOptions) {
    invariant(authUrl, "Please specify an authUrl in the ThirdwebProvider");
    const payload = await sdk?.auth.login(domain, options);
    const encodedPayload = encodeURIComponent(JSON.stringify(payload));

    // Redirect to the login URL with the encoded payload
    window.location.href = `${authUrl}/login?payload=${encodedPayload}`;
  }

  return login;
}
