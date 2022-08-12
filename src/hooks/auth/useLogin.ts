import { useSDK } from "../../Provider";
import { useThirdwebConfigContext } from "../../contexts/thirdweb-config";
import { LoginOptions } from "@thirdweb-dev/sdk/dist/src/schema";
import React from "react";
import invariant from "tiny-invariant";

export interface LoginConfig {
  domain: string;
  redirectTo: string;
  onError: (error: string) => void;
}

/**
 * Hook to securely login to a backend with the connected wallet. The backend
 * authentication URL must be configured on the ThirdwebProvider.
 *
 * @param config Configuration for the login.
 * @param config.domain - The domain of the website the user is logging into, used to prevent phishing attacks
 * Must match the domain specified in the backend endpoints.
 * @param config.redirectTo - The URL to redirect to after login.
 * @param config.onError - A callback to invoke when an error occurs.
 * @returns - A function to invoke to login with the connected wallet.
 *
 * @public
 */
export function useLogin({ domain, redirectTo, onError }: LoginConfig) {
  const sdk = useSDK();
  const { authUrl } = useThirdwebConfigContext();

  React.useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const error = queryParams.get("error");

    if (error) {
      // If there is an error, parse it and trigger the onError callback
      onError(decodeURI(error));
    }
  }, []);

  async function login(options?: LoginOptions) {
    invariant(authUrl, "Please specify an authUrl in the ThirdwebProvider");
    const payload = await sdk?.auth.login(domain, options);
    const encodedPayload = encodeURIComponent(JSON.stringify(payload));

    // Redirect to the login URL with the encoded payload
    window.location.href = `${authUrl}/login?payload=${encodedPayload}&redirectTo=${redirectTo}`;
  }

  return login;
}
