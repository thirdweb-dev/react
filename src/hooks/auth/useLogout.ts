import { useThirdwebConfigContext } from "../../contexts/thirdweb-config";
import { createCachekey } from "../../utils/cache-keys";
import { useQueryClient } from "@tanstack/react-query";
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
  const queryClient = useQueryClient();
  const { authConfig } = useThirdwebConfigContext();

  function logout() {
    invariant(
      authConfig,
      "Please specify an authConfig in the ThirdwebProvider",
    );
    queryClient.invalidateQueries(createCachekey(["user"]));
    window.location.href = `${authConfig.authUrl}/logout`;
  }

  return logout;
}
