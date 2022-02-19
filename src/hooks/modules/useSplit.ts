import { Split } from "@thirdweb-dev/sdk";
import { useContract } from "./useContract";

export function useSplitModule(moduleAddress?: string): Split | undefined {
  return useContract("split", moduleAddress);
}
