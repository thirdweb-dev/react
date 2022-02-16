import { ModuleType, type NFTModule } from "@3rdweb/sdk";
import { useModule } from "./useModule";

export function useNFTModule(moduleAddress: string) {
  return useModule(ModuleType.NFT, moduleAddress) as NFTModule;
}
