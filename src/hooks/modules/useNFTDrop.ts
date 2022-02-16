import { NFTDrop } from "@thirdweb-dev/sdk";
import { useContract } from "./useContract";

export function useNFTDrop(moduleAddress: string) {
  return useContract("nft-drop", moduleAddress) as NFTDrop;
}
