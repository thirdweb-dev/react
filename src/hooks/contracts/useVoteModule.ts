import { Vote } from "@thirdweb-dev/sdk";
import { useContract } from "./useContract";

/**
 * Returns a Vote contract instance
 * @param contractAddress - the address of the Vote contract, found in your thirdweb dashboard
 * @public
 */
export function useVote(contractAddress?: string): Vote | undefined {
  return useContract("vote", contractAddress);
}
