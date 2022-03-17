import { useContract } from "./useContract";
import { Split } from "@thirdweb-dev/sdk";

/**
 * Returns a Split contract instance
 * @param contractAddress - the address of the Split contract, found in your thirdweb dashboard
 * @public
 */
export function useSplit(contractAddress?: string): Split | undefined {
  return useContract("split", contractAddress);
}
