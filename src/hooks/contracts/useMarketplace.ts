import { useContract } from "./useContract";
import { Marketplace } from "@thirdweb-dev/sdk";

/**
 * Returns a Marketplace contract instance
 * @param contractAddress - the address of the Marketplace contract, found in your thirdweb dashboard
 * @public
 */
export function useMarketplace(
  contractAddress?: string,
): Marketplace | undefined {
  return useContract("marketplace", contractAddress);
}
