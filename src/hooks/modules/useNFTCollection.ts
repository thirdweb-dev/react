import { NFTCollection } from "@thirdweb-dev/sdk";
import { useContract } from "./useContract";

export function useNFTCollection(moduleAddress: string) {
  return useContract("nft-collection", moduleAddress) as NFTCollection;
}
