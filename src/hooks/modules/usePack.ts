import { Pack } from "@thirdweb-dev/sdk";
import { useContract } from "./useContract";

/**
 * Returns a Pack contract instance
 * @param contractAddress - the address of the Pack contract, found in your thirdweb dashboard
 * @public
 */
export function usePack(contractAddress?: string): Pack | undefined {
  return useContract("pack", contractAddress);
}
