import { useSDK } from "../../Provider";
import { ContractAddress } from "../../types";
import { cacheKeys } from "../../utils/cache-keys";
import { useQueryWithNetwork } from "../query-utils/useQueryWithNetwork";
import { useAddress } from "../useAddress";
import invariant from "tiny-invariant";

export function useBalance(tokenAddress?: ContractAddress) {
  const sdk = useSDK();
  const address = useAddress();
  return useQueryWithNetwork(
    cacheKeys.wallet.balance(tokenAddress),
    () => {
      invariant(sdk, "No SDK instance provided");
      return sdk.wallet.balance(tokenAddress);
    },
    {
      // if user is not logged in no reason to try to fetch
      enabled: !!address,
    },
  );
}
