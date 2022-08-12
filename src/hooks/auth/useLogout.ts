import { useThirdwebConfigContext } from "../../contexts/thirdweb-config";
import invariant from "tiny-invariant";

export function useLogout() {
  const { authUrl } = useThirdwebConfigContext();

  function logout() {
    invariant(authUrl, "Please specify an authUrl in the ThirdwebProvider");
    window.location.href = `${authUrl}/logout`;
  }

  return logout;
}
