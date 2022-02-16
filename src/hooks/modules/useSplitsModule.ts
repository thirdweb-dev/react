import { ModuleType, type SplitsModule } from "@3rdweb/sdk";
import { useModule } from "./useModule";

export function useSplitsModule(moduleAddress: string) {
  return useModule(ModuleType.SPLITS, moduleAddress) as SplitsModule;
}
