import { useThirdwebConfigContext } from "../../contexts/thirdweb-config";
import { createCachekey } from "../../utils/cache-keys";
import { useQuery } from "@tanstack/react-query";
import invariant from "tiny-invariant";

/**
 * Hook to get whether the current user is logged in.
 *
 * @returns - Whether the user is logged in or not.
 *
 * @public
 */
export function useLoggedIn() {
  const { authUrl } = useThirdwebConfigContext();

  const { data: isLoggedIn, isLoading } = useQuery(
    createCachekey(["user"]),
    async () => {
      invariant(authUrl, "Please specify an authUrl in the ThirdwebProvider");
      const response = await fetch(`${authUrl}/authenticate`);
      return response.ok;
    },
  );

  return { isLoggedIn, isLoading };
}
