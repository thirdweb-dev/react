import { ModuleType, type ThirdwebSDK } from "@3rdweb/sdk";
import { useModule } from "./useModule";

export function useBundleSignatureModule(moduleAddress: string) {
  return useModule(ModuleType.BUNDLE_SIGNATURE, moduleAddress) as ReturnType<
    ThirdwebSDK["getBundleSignatureModule"]
  >;
}
