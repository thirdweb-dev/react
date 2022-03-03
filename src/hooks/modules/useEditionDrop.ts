import { EditionDrop } from "@thirdweb-dev/sdk";
import { useContract } from "./useContract";

/**
 * Returns a Edition Drop contract instance
 * @param contractAddress - the address of the Edition Drop contract, found in your thirdweb dashboard
 * @public
 */
export function useEditionDrop(
  contractAddress?: string,
): EditionDrop | undefined {
  return useContract("edition-drop", contractAddress);
}
