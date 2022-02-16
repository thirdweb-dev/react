import { ModuleType, type BundleDropModule } from "@3rdweb/sdk";
import { useModule } from "./useModule";

export function useBundleDropModule(moduleAddress: string) {
  return useModule(ModuleType.BUNDLE_DROP, moduleAddress) as BundleDropModule;
}
