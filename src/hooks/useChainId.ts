import { useNetwork } from "wagmi";

/**
 *
 * @returns the chainId of the connected network
 * @public
 */
export function useChainId(): number | undefined {
  return useNetwork()["0"].data.chain?.id;
}
