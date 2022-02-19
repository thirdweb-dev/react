import { Vote } from "@thirdweb-dev/sdk";
import { useContract } from "./useContract";

export function useVote(moduleAddress?: string): Vote | undefined {
  return useContract("vote", moduleAddress);
}
