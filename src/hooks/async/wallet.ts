import { SupportedChainId } from "../../constants/chain";
import { ContractAddress } from "../../types";
import { cacheKeys } from "../../utils/cache-keys";
import { useChainId } from "../useChainId";
import { useSigner } from "../useSigner";
import { ChainId, ThirdwebSDK } from "@thirdweb-dev/sdk";
import { useMemo } from "react";
import { useQuery } from "react-query";

const defaultChainRpc: Record<SupportedChainId, string> = {
  [ChainId.Mainnet]: "mainnet",
  [ChainId.Rinkeby]: "rinkeby",
  [ChainId.Goerli]: "goerli",
  [ChainId.Polygon]: "polygon",
  [ChainId.Mumbai]: "mumbai",
  [ChainId.Fantom]: "fantom",
  [ChainId.Avalanche]: "avalanche",
};

/**
 *
 * @param tokenAddress - the address of the token contract, if empty will use the chain's native token
 * @beta
 */
export function useBalance(tokenAddress?: ContractAddress) {
  const chainId = useChainId() as SupportedChainId;
  const signer = useSigner();

  const walletSDK = useMemo(() => {
    if (signer) {
      return ThirdwebSDK.fromSigner(signer, defaultChainRpc[chainId]);
    }
    return undefined;
  }, [signer, chainId]);

  return useQuery(
    cacheKeys.wallet.balance(chainId, tokenAddress),
    () => {
      return walletSDK?.wallet.balance(tokenAddress);
    },
    {
      // if user is not logged in no reason to try to fetch
      enabled: !!walletSDK,
    },
  );
}
