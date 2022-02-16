import { ModuleType, type TokenModule } from "@3rdweb/sdk";
import { useModule } from "./useModule";

export function useTokenModule(moduleAddress: string) {
  return useModule(ModuleType.TOKEN, moduleAddress) as TokenModule;
}
