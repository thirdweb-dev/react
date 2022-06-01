import { useActiveChainId } from "../../Provider";
import { RequiredParam, WalletAddress } from "../../types";
import {
  cacheKeys,
  invalidateContractAndBalances,
} from "../../utils/cache-keys";
import { useQueryWithNetwork } from "../query-utils/useQueryWithNetwork";
import type { SmartContract, ValidContractInstance } from "@thirdweb-dev/sdk";
import type { CustomContractMetadata } from "@thirdweb-dev/sdk/dist/src/schema/contracts/custom";
import { useMutation, useQueryClient } from "react-query";
import invariant from "tiny-invariant";

// primary sales

/**
 * TODO write docs
 * @param contract -
 * @returns
 * @beta
 */
export function usePrimarySaleRecipient(
  contract: RequiredParam<SmartContract | ValidContractInstance>,
) {
  const contractAddress = contract?.getAddress();
  return useQueryWithNetwork(
    cacheKeys.extensions.sales.getRecipient(contractAddress),
    () => {
      invariant(contract, "No contract provided");
      invariant(
        "sales" in contract && contract.sales,
        "Contract does not support primarySale",
      );
      return contract.sales.getRecipient();
    },
    { enabled: !!contract || !!contractAddress },
  );
}

/**
 * TODO write docs
 * @param contract -
 * @returns
 * @beta
 */
export function useUpdatePrimarySaleRecipient(
  contract: RequiredParam<SmartContract | ValidContractInstance>,
) {
  const queryClient = useQueryClient();
  const contractAddress = contract?.getAddress();
  const activeChainId = useActiveChainId();
  return useMutation(
    (newRecipient: WalletAddress) => {
      invariant(contract, "No contract provided");
      invariant(
        "sales" in contract && contract.sales,
        "Contract does not support primarySale",
      );
      return contract.sales.setRecipient(newRecipient);
    },
    {
      onSuccess: () =>
        invalidateContractAndBalances(
          queryClient,
          contractAddress,
          activeChainId,
        ),
    },
  );
}

// end prinary sales

// royalties

/**
 * TODO write docs
 * @param contract -
 * @returns
 * @beta
 */
export function useRoyaltySettings(
  contract: RequiredParam<SmartContract | ValidContractInstance>,
) {
  const contractAddress = contract?.getAddress();
  return useQueryWithNetwork(
    cacheKeys.extensions.royalties.getDefaultRoyaltyInfo(contractAddress),
    () => {
      invariant(contract, "No contract provided");
      invariant(
        "royalties" in contract && contract.royalties,
        "Contract does not support royalties",
      );
      return contract.royalties.getDefaultRoyaltyInfo();
    },
    { enabled: !!contract || !!contractAddress },
  );
}

/**
 * TODO write docs
 * @param contract -
 * @returns
 * @beta
 */
export function useUpdateRoyaltySettings(
  contract: RequiredParam<SmartContract | ValidContractInstance>,
) {
  const queryClient = useQueryClient();
  const contractAddress = contract?.getAddress();
  const activeChainId = useActiveChainId();
  return useMutation(
    (updatePayload: {
      seller_fee_basis_points?: number;
      fee_recipient?: WalletAddress;
    }) => {
      invariant(contract, "No contract provided");
      invariant(
        "royalties" in contract && contract.royalties,
        "Contract does not support royalties",
      );
      return contract.royalties.setDefaultRoyaltyInfo(updatePayload);
    },
    {
      onSuccess: () =>
        invalidateContractAndBalances(
          queryClient,
          contractAddress,
          activeChainId,
        ),
    },
  );
}

// end royalties

// platformFees

/**
 * TODO write docs
 * @param contract -
 * @returns
 * @beta
 */
export function usePlatformFees(
  contract: RequiredParam<SmartContract | ValidContractInstance>,
) {
  const contractAddress = contract?.getAddress();
  return useQueryWithNetwork(
    cacheKeys.extensions.platformFees.get(contractAddress),
    () => {
      invariant(contract, "No contract provided");
      invariant(
        "platformFees" in contract && contract.platformFees,
        "Contract does not support platformFees",
      );
      return contract.platformFees.get();
    },
    { enabled: !!contract || !!contractAddress },
  );
}

/**
 * TODO write docs
 * @param contract -
 * @returns
 * @beta
 */
export function useUpdatePlatformFees(
  contract: RequiredParam<SmartContract | ValidContractInstance>,
) {
  const queryClient = useQueryClient();
  const contractAddress = contract?.getAddress();
  const activeChainId = useActiveChainId();
  return useMutation(
    (updatePayload: {
      platform_fee_basis_points?: number;
      fee_recipient?: WalletAddress;
    }) => {
      invariant(contract, "No contract provided");
      invariant(
        "platformFees" in contract && contract.platformFees,
        "Contract does not support platformFees",
      );
      return contract.platformFees.set(updatePayload);
    },
    {
      onSuccess: () =>
        invalidateContractAndBalances(
          queryClient,
          contractAddress,
          activeChainId,
        ),
    },
  );
}

// end platformFees

// metadata

/**
 * TODO write docs
 * @param contract -
 * @returns
 * @beta
 */
export function useMetadata(
  contract: RequiredParam<SmartContract | ValidContractInstance>,
) {
  const contractAddress = contract?.getAddress();
  return useQueryWithNetwork(
    cacheKeys.extensions.metadata.get(contractAddress),
    () => {
      invariant(contract, "No contract provided");
      invariant(
        "metadata" in contract && contract.metadata,
        "Contract does not support metadata",
      );
      return contract.metadata.get() as Promise<CustomContractMetadata>;
    },
    { enabled: !!contract || !!contractAddress },
  );
}

/**
 * TODO write docs
 * @param contract -
 * @returns
 * @beta
 */
export function useUpdateMetadata(
  contract: RequiredParam<SmartContract | ValidContractInstance>,
) {
  const queryClient = useQueryClient();
  const contractAddress = contract?.getAddress();
  const activeChainId = useActiveChainId();
  return useMutation(
    (updatePayload: CustomContractMetadata) => {
      invariant(contract, "No contract provided");
      invariant(
        "metadata" in contract && contract.metadata,
        "Contract does not support metadata",
      );
      return contract.metadata.update(updatePayload);
    },
    {
      onSuccess: () =>
        invalidateContractAndBalances(
          queryClient,
          contractAddress,
          activeChainId,
        ),
    },
  );
}

// end metadata
