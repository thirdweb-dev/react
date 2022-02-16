import { Vote } from "@thirdweb-dev/sdk";
import { useContract } from "./useContract";

export function useVote(moduleAddress: string) {
  return useContract("vote", moduleAddress) as Vote;
}
