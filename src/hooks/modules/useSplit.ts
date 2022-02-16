import { Split } from "@thirdweb-dev/sdk";
import { useContract } from "./useContract";

export function useSplitModule(moduleAddress: string) {
  return useContract("split", moduleAddress) as Split;
}
