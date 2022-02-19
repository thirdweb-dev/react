import { NFTCollection } from "@thirdweb-dev/sdk";
import { useContract } from "./useContract";

export function useNFTCollection(
  moduleAddress?: string,
): NFTCollection | undefined {
  return useContract("nft-collection", moduleAddress);
}
