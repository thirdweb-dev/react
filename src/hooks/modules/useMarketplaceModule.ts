import { ModuleType, type MarketplaceModule } from "@3rdweb/sdk";
import { useModule } from "./useModule";

export function useMarketplaceModule(moduleAddress: string) {
  return useModule(ModuleType.MARKETPLACE, moduleAddress) as MarketplaceModule;
}
