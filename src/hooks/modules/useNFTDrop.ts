import { NFTDrop } from "@thirdweb-dev/sdk";
import { useContract } from "./useContract";

export function useNFTDrop(moduleAddress?: string): NFTDrop | undefined {
  return useContract("nft-drop", moduleAddress);
}
