import { useThirdwebConfigContext } from "../../contexts/thirdweb-config";
import invariant from "tiny-invariant";

/**
 * Hook to logout the connected wallet from the backend.
 * The backend logout URL must be configured on the ThirdwebProvider.
 *
 * @returns - A function to invoke to logout.
 *
 * @public
 */
export function useLogout() {
  const { authUrl } = useThirdwebConfigContext();

  function logout() {
    invariant(authUrl, "Please specify an authUrl in the ThirdwebProvider");
    window.location.href = `${authUrl}/logout`;
  }

  return logout;
}
