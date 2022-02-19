import { EditionDrop } from "@thirdweb-dev/sdk";
import { useContract } from "./useContract";

export function useEditionDrop(
  moduleAddress?: string,
): EditionDrop | undefined {
  return useContract("edition-drop", moduleAddress);
}
