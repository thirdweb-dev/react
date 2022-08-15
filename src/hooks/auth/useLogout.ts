import { useThirdwebConfigContext } from "../../contexts/thirdweb-config";
import { createCachekey } from "../../utils/cache-keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
  const { authUrl } = useThirdwebConfigContext();

  const { mutateAsync: logout, isLoading } = useMutation(
    async () => {
      invariant(authUrl, "Please specify an authUrl in the ThirdwebProvider");
      window.location.href = `${authUrl}/logout`;
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries(createCachekey(["user"]));
      },
    },
  );

  return { logout: () => logout(), isLoading };
}
