import { ModuleType, type MarketModule } from "@3rdweb/sdk";
import { useModule } from "./useModule";

/**
 *
 * @deprecated - The {@link MarketModule} is deprecated in favor of {@link MarketplaceModule}
 * @param moduleAddress - the address of the market module
 * @returns the {@link MarketModule} instance
 * @public
 */
export function useMarketModule(moduleAddress: string) {
  return useModule(ModuleType.MARKET, moduleAddress) as MarketModule;
}
