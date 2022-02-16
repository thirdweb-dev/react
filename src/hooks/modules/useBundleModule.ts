import { ModuleType, type BundleModule } from "@3rdweb/sdk";
import { useModule } from "./useModule";

export function useBundleModule(moduleAddress: string) {
  return useModule(ModuleType.BUNDLE, moduleAddress) as BundleModule;
}
