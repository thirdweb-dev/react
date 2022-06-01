import { SupportedChainId } from "../../constants/chain";
import { useThirdwebConfigContext } from "../../contexts/thirdweb-config";
import { ContractAddress } from "../../types";
import { cacheKeys } from "../../utils/cache-keys";
import { useChainId } from "../useChainId";
import { useSigner } from "../useSigner";
import { UserWallet } from "@thirdweb-dev/sdk";
import { useEffect, useMemo } from "react";
import { useQuery, useQueryClient } from "react-query";

/**
 *
 * @param tokenAddress - the address of the token contract, if empty will use the chain's native token
 * @beta
 */
export function useBalance(tokenAddress?: ContractAddress) {
  const { rpcUrlMap } = useThirdwebConfigContext();
  const chainId = useChainId() as SupportedChainId;
  const signer = useSigner();

  const queryClient = useQueryClient();

  const cacheKey = useMemo(() => {
    return cacheKeys.wallet.balance(chainId, tokenAddress);
  }, [chainId, tokenAddress]);

  useEffect(() => {
    queryClient.cancelQueries(cacheKey);
    queryClient.invalidateQueries(cacheKey);
  }, [cacheKey]);

  const walletSDK = useMemo(() => {
    if (signer) {
      return new UserWallet(signer, {
        readonlySettings: {
          rpcUrl: rpcUrlMap[chainId],
          chainId,
        },
      });
    }
    return undefined;
  }, [signer, chainId]);

  return useQuery(
    cacheKey,
    () => {
      return walletSDK?.balance(tokenAddress);
    },
    {
      // if user is not logged in no reason to try to fetch
      enabled: !!walletSDK,
      retry: true,
    },
  );
}
