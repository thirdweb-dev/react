import { Token } from "@thirdweb-dev/sdk";
import { useContract } from "./useContract";

/**
 * Returns a Token contract instance
 * @param contractAddress - the address of the Token contract, found in your thirdweb dashboard
 * @public
 */
export function useToken(contractAddress?: string): Token | undefined {
  return useContract("token", contractAddress);
}
