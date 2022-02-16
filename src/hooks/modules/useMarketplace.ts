import { Marketplace } from "@thirdweb-dev/sdk";
import { useContract } from "./useContract";

export function useMarketplace(moduleAddress: string) {
  return useContract("marketplace", moduleAddress) as Marketplace;
}
