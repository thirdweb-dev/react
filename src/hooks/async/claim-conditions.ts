import { NFTContract, RequiredParam, WalletAddress } from "../../types";
import { cacheKeys } from "../../utils/cache-keys";
import { useQueryWithNetwork } from "../query-utils/useQueryWithNetwork";
import { useMutation } from "@tanstack/react-query";
import { ClaimConditionInput, Erc1155 } from "@thirdweb-dev/sdk/dist/browser";
import { BigNumberish } from "ethers";
import invariant from "tiny-invariant";

type ActiveClaimConditionParams<TContract> = TContract extends Erc1155
  ? [contract: RequiredParam<TContract>, tokenId: RequiredParam<BigNumberish>]
  : [contract: RequiredParam<TContract>];

/** **********************/
/**     READ  HOOKS     **/
/** **********************/

/**
 * Use this to get the active claim conditon for ERC20, ERC721 or ERC1155 based contracts. They need to extend the `claimCondition` extension for this hook to work.
 *
 * @example
 * ```javascript
 * const { data: activeClaimCondition, isLoading, error } = useActiveClaimCondition(<YourERC20ContractInstance>);
 * ```
 * @example
 * ```javascript
 * const { data: activeClaimCondition, isLoading, error } = useActiveClaimCondition(<YourERC721ContractInstance>);
 * ```
 * @example
 * ```javascript
 * const { data: activeClaimCondition, isLoading, error } = useActiveClaimCondition(<YourERC1155ContractInstance>, <tokenId>);
 * ```
 *
 * @param contract - an instance of a contract that extends the ERC721 or ERC1155 spec and implements the `claimConditions` extension.
 * @param tokenId - the id of the token to fetch the claim conditions for (if the contract is an ERC1155 contract)
 * @returns a response object with the currently active claim condition
 *
 * @beta
 */
export function useActiveClaimCondition<TContract extends NFTContract>(
  ...[contract, tokenId]: ActiveClaimConditionParams<TContract>
) {
  const contractAddress = contract?.getAddress();

  return useQueryWithNetwork(
    cacheKeys.extensions.claimConditions.getActive(contractAddress, tokenId),
    () => {
      invariant(contract, "No Contract instance provided");
      invariant(
        contract?.drop?.claim?.conditions?.getActive,
        "Contract instance does not support contract?.drop?.claim?.conditions.getActive",
      );
      if (contract instanceof Erc1155) {
        invariant(tokenId, "tokenId is required for ERC1155 claim conditions");
        return contract?.drop?.claim?.conditions?.getActive(tokenId);
      }
      return contract?.drop?.claim?.conditions?.getActive();
    },
    {
      // Checks that happen here:
      // 1. if the contract is based on ERC1155 contract => tokenId cannot be `undefined`
      // 2. if the contract is NOT based on ERC1155 => contract has to still be provided
      enabled: contract instanceof Erc1155 ? tokenId !== undefined : !!contract,
    },
  );
}

/**
 * Use this to get all claim conditons for ERC20, ERC721 or ERC1155 based contracts. They need to extend the `claimCondition` extension for this hook to work.
 *
 * @example
 * ```javascript
 * const { data: claimConditions, isLoading, error } = useClaimConditions(<YourERC20ContractInstance>);
 * ```
 * @example
 * ```javascript
 * const { data: claimConditions, isLoading, error } = useClaimConditions(<YourERC721ContractInstance>);
 * ```
 * @example
 * ```javascript
 * const { data: claimConditions, isLoading, error } = useClaimConditions(<YourERC1155ContractInstance>, <tokenId>);
 * ```
 *
 * @param contract - an instance of a contract that extends the ERC721 or ERC1155 spec and implements the `claimConditions` extension.
 * @param tokenId - the id of the token to fetch the claim conditions for (if the contract is an ERC1155 contract)
 * @returns a response object with the list of claim conditions
 *
 * @beta
 */
export function useClaimConditions<TContract extends NFTContract>(
  ...[contract, tokenId]: ActiveClaimConditionParams<TContract>
) {
  const contractAddress = contract?.getAddress();

  return useQueryWithNetwork(
    cacheKeys.extensions.claimConditions.getAll(contractAddress, tokenId),
    () => {
      invariant(contract, "No Contract instance provided");
      invariant(
        contract?.drop?.claim?.conditions?.getAll,
        "Contract instance does not support drop.claim.conditions.getAll",
      );
      if (contract instanceof Erc1155) {
        invariant(tokenId, "tokenId is required for ERC1155 claim conditions");
        return contract?.drop?.claim?.conditions?.getAll(tokenId);
      }
      return contract?.drop?.claim?.conditions?.getAll();
    },
    {
      // Checks that happen here:
      // 1. if the contract is based on ERC1155 contract => tokenId cannot be `undefined`
      // 2. if the contract is NOT based on ERC1155 => contract has to still be provided
      enabled: contract instanceof Erc1155 ? tokenId !== undefined : !!contract,
    },
  );
}

/**
 * The options to be passed as the second parameter to the `useClaimIneligibilityReasons` hook.
 *
 * @beta
 */
export type ClaimIneligibilityParameters = {
  // the wallet address to check claim eligibility for
  walletAddress: WalletAddress;
  // the amount of tokens to check claim eligibility for
  quantity: string | number;
};

type ClaimIneligibilityInputParams<TContract> = TContract extends Erc1155
  ? [
      contract: RequiredParam<TContract>,
      eligibilityParams: ClaimIneligibilityParameters,
      tokenId: RequiredParam<BigNumberish>,
    ]
  : [
      contract: RequiredParam<TContract>,
      eligibilityParams: ClaimIneligibilityParameters,
    ];

type SetClaimConditionsInputParams<TContract> = TContract extends Erc1155
  ? [contract: RequiredParam<TContract>, tokenId: RequiredParam<BigNumberish>]
  : [contract: RequiredParam<TContract>];

/**
 * The params for the {@link useSetClaimConditions} hook mutation.
 *
 * @beta
 */
export type SetClaimConditionsParams = {
  phases: ClaimConditionInput[];
  reset?: boolean;
};

/**
 * Use this to check for reasons that prevent claiming for either  ERC20, ERC721 or ERC1155 based contracts. They need to extend the `claimCondition` extension for this hook to work.
 * @example
 * ```javascript
 * const { data: activeClaimCondition, isLoading, error } = useClaimIneligibilityReasons(<YourERC20ContractInstance>, { walletAddress: <walletAddress> });
 * ```
 * @example
 * ```javascript
 * const { data: claimIneligibilityReasons, isLoading, error } = useClaimIneligibilityReasons(<YourERC721ContractInstance>, { quantity: <quantity>, walletAddress: <walletAddress> });
 * ```
 * @example
 * ```javascript
 * const { data: claimIneligibilityReasons, isLoading, error } = useClaimIneligibilityReasons(<YourERC1155ContractInstance>, { quantity: <quantity>, walletAddress: <walletAddress> }, <tokenId>);
 * ```
 *
 * @param contract - an instance of a contract that extends the  ERC20, ERC721 or ERC1155 spec and implements the `claimConditions` extension.
 * @param eligibilityParams - the parameters for the eligibility check, see: {@link ClaimIneligibilityParameters}
 * @param tokenId - the id of the token to fetch the claim conditions for (if the contract is an ERC1155 contract)
 * @returns a response object with the resons for the claim ineligibility
 *
 * @beta
 */
export function useClaimIneligibilityReasons<TContract extends NFTContract>(
  ...[contract, params, tokenId]: ClaimIneligibilityInputParams<TContract>
) {
  const contractAddress = contract?.getAddress();

  return useQueryWithNetwork(
    cacheKeys.extensions.claimConditions.getClaimIneligibilityReasons(
      contractAddress,
      params,
      tokenId,
    ),
    () => {
      invariant(contract, "No Contract instance provided");
      invariant(
        contract?.drop?.claim?.conditions.getClaimIneligibilityReasons,
        "Contract instance does not support claimConditions.getClaimIneligibilityReasons",
      );
      if (contract instanceof Erc1155) {
        invariant(
          tokenId,
          "tokenId is required for ERC1155 claim ineligibility reasons",
        );
        return contract?.drop?.claim?.conditions.getClaimIneligibilityReasons(
          tokenId,
          params.quantity,
          params.walletAddress,
        );
      }
      return contract?.drop?.claim?.conditions.getClaimIneligibilityReasons(
        params.quantity,
        params.walletAddress,
      );
    },
    {
      // Checks that happen here:
      // 1. if the contract is based on ERC1155 contract => tokenId cannot be `undefined`
      // 2. if the contract is NOT based on ERC1155 => contract has to still be provided
      // 3. has a params object been passed?
      // 4. does params have an address in it?
      enabled:
        (contract instanceof Erc1155 ? tokenId !== undefined : !!contract) &&
        !!params &&
        !!params.walletAddress,
    },
  );
}

/** **********************/
/**     WRITE HOOKS     **/
/** **********************/

/**
 * Use this to mint a new NFT on your {@link NFTContract}
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const nftDrop = useNFTDrop(<ContractAddress>);
 *   const {
 *     mutate: mintNft,
 *     isLoading,
 *     error,
 *   } = useMintNFT(nftDrop);
 *
 *   if (error) {
 *     console.error("failed to mint nft", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => mintNft({ name: "My awesome NFT!", to: "0x..." })}
 *     >
 *       Mint!
 *     </button>
 *   );
 * };
 * ```
 * @example
 * ```jsx
 * const Component = () => {
 *   const { contract } = useContract(<ContractAddress>);
 *   const {
 *     mutate: mintNft,
 *     isLoading,
 *     error,
 *   } = useMintNFT(contract?.nft);
 *
 *   if (error) {
 *     console.error("failed to mint nft", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => mintNft({ name: "My awesome NFT!", to: "0x..." })}
 *     >
 *       Mint!
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instance of a {@link NFTContract}
 * @returns a mutation object that can be used to set claim conditions
 * @beta
 */
export function useSetClaimConditions<TContract extends NFTContract>(
  ...[contract, tokenId]: SetClaimConditionsInputParams<TContract>
) {
  return useMutation(
    async (data: SetClaimConditionsParams) => {
      const { phases, reset = false } = data;
      invariant(phases, 'No "phases" provided');
      if (contract instanceof Erc1155) {
        invariant(tokenId, "tokenId is required for ERC1155 claim conditions");
        return contract?.drop?.claim?.conditions.set(tokenId, phases, reset);
      }
      return contract?.drop?.claim?.conditions.set(phases, reset);
    },
    {
      onSettled: () => {
        // TODO: fix cache
      },
    },
  );
}
