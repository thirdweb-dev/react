import { Token } from "@thirdweb-dev/sdk";
import { useContract } from "./useContract";

export function useToken(moduleAddress: string) {
  return useContract("token", moduleAddress) as Token;
}
