import { useNetwork } from "wagmi";

export function useChainId(): number | undefined {
  return useNetwork()["0"].data.chain?.id;
}
