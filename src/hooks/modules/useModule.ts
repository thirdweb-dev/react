import { ModuleType } from "@3rdweb/sdk";
import { useSDK } from "../../Provider";

/**
 * @internal
 * @param moduleType - the module type
 * @param moduleAddress - the module address
 * @returns the instance of the module for the given type and address
 */
export function useModule(moduleType: ModuleType, moduleAddress: string) {
  const sdk = useSDK();
  if (!sdk) {
    return undefined;
  }
  switch (moduleType) {
    case ModuleType.TOKEN:
      return sdk.getTokenModule(moduleAddress);
    case ModuleType.BUNDLE:
      return sdk.getBundleModule(moduleAddress);
    case ModuleType.NFT:
      return sdk.getNFTModule(moduleAddress);
    case ModuleType.PACK:
      return sdk.getPackModule(moduleAddress);
    case ModuleType.MARKET:
      return sdk.getMarketModule(moduleAddress);
    case ModuleType.DROP:
      return sdk.getDropModule(moduleAddress);
    case ModuleType.SPLITS:
      return sdk.getSplitsModule(moduleAddress);
    case ModuleType.VOTE:
      return sdk.getVoteModule(moduleAddress);
    case ModuleType.BUNDLE_DROP:
      return sdk.getBundleDropModule(moduleAddress);
    case ModuleType.MARKETPLACE:
      return sdk.getMarketplaceModule(moduleAddress);
    case ModuleType.BUNDLE_SIGNATURE:
      return sdk.getBundleSignatureModule(moduleAddress);
    default:
      throw new Error("not implemented");
  }
}
