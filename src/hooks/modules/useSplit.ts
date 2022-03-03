import { Split } from "@thirdweb-dev/sdk";
import { useContract } from "./useContract";

export function useSplit(moduleAddress?: string): Split | undefined {
  return useContract("split", moduleAddress);
}
