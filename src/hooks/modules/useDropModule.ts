import { ModuleType, type DropModule } from "@3rdweb/sdk";
import { useModule } from "./useModule";

export function useDropModule(moduleAddress: string) {
  return useModule(ModuleType.DROP, moduleAddress) as DropModule;
}
