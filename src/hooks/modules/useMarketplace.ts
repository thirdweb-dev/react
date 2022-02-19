import { Marketplace } from "@thirdweb-dev/sdk";
import { useContract } from "./useContract";

export function useMarketplace(
  moduleAddress?: string,
): Marketplace | undefined {
  return useContract("marketplace", moduleAddress);
}
