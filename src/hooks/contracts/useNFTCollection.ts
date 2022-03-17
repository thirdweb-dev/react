import { useContract } from "./useContract";
import { NFTCollection } from "@thirdweb-dev/sdk";

/**
 * Returns a NFT Collection contract instance
 * @param contractAddress - the address of the NFT Collection contract, found in your thirdweb dashboard
 * @public
 */
export function useNFTCollection(
  contractAddress?: string,
): NFTCollection | undefined {
  return useContract("nft-collection", contractAddress);
}
