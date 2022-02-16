import { ModuleType, type VoteModule } from "@3rdweb/sdk";
import { useModule } from "./useModule";

export function useVoteModule(moduleAddress: string) {
  return useModule(ModuleType.VOTE, moduleAddress) as VoteModule;
}
