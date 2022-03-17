import { useContract } from "./useContract";
import { Token } from "@thirdweb-dev/sdk";

/**
 * Returns a Token contract instance
 * @param contractAddress - the address of the Token contract, found in your thirdweb dashboard
 * @public
 */
export function useToken(contractAddress?: string): Token | undefined {
  return useContract("token", contractAddress);
}
