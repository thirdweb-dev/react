import { ModuleType, type PackModule } from "@3rdweb/sdk";
import { useModule } from "./useModule";

export function usePackModule(moduleAddress: string) {
  return useModule(ModuleType.PACK, moduleAddress) as PackModule;
}
