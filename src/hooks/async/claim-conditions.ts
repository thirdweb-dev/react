import { RequiredParam, WalletAddress } from "../../types";
import { cacheKeys } from "../../utils/cache-keys";
import { useQueryWithNetwork } from "../query-utils/useQueryWithNetwork";
import {
  EditionDrop,
  Erc1155,
  NFTDrop,
  TokenDrop,
} from "@thirdweb-dev/sdk/dist/browser";
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
 * @param contract - an instace of a contract that extends the ERC721 or ERC1155 spec and implements the `claimConditions` extension.
 * @param tokenId - the id of the token to fetch the claim conditions for (if the contract is an ERC1155 contract)
 * @returns a response object with the currently active claim condition
 *
 * @beta
 */
export function useActiveClaimCondition<
  TContract extends NFTDrop | EditionDrop | TokenDrop,
>(...[contract, tokenId]: ActiveClaimConditionParams<TContract>) {
  const contractAddress = contract?.getAddress();

  return useQueryWithNetwork(
    cacheKeys.extensions.claimConditions.getActive(contractAddress, tokenId),
    () => {
      invariant(contract, "No Contract instance provided");
      invariant(
        contract.claimConditions.getActive,
        "Contract instance does not support claimConditions.getActive",
      );
      if (contract instanceof Erc1155) {
        invariant(tokenId, "tokenId is required for ERC1155 claim conditions");
        return contract.claimConditions.getActive(tokenId);
      }
      return contract.claimConditions.getActive();
    },
    {
      // Checks that happen here:
      // 1. if the contract is based on  ERC1155 contract => tokenId cannot be `undefined`
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
 * @param contract - an instace of a contract that extends the ERC721 or ERC1155 spec and implements the `claimConditions` extension.
 * @param tokenId - the id of the token to fetch the claim conditions for (if the contract is an ERC1155 contract)
 * @returns a response object with the list of claim conditions
 *
 * @beta
 */
export function useClaimConditions<
  TContract extends NFTDrop | EditionDrop | TokenDrop,
>(...[contract, tokenId]: ActiveClaimConditionParams<TContract>) {
  const contractAddress = contract?.getAddress();

  return useQueryWithNetwork(
    cacheKeys.extensions.claimConditions.getAll(contractAddress, tokenId),
    () => {
      invariant(contract, "No Contract instance provided");
      invariant(
        contract.claimConditions.getAll,
        "Contract instance does not support claimConditions.getAll",
      );
      if (contract instanceof Erc1155) {
        invariant(tokenId, "tokenId is required for ERC1155 claim conditions");
        return contract.claimConditions.getAll(tokenId);
      }
      return contract.claimConditions.getAll();
    },
    {
      // Checks that happen here:
      // 1. if the contract is based on  ERC1155 contract => tokenId cannot be `undefined`
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
  // the wallet address to check claim elgibility for
  walletAddress?: WalletAddress;
  // the amount of tokens to check claim elibility for
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

/**
 * Use this to check for reasons that prevent claiming for either  ERC20, ERC721 or ERC1155 based contracts. They need to extend the `claimCondition` extension for this hook to work.
 * @example
 * ```javascript
 * const { data: activeClaimCondition, isLoading, error } = useClaimIneligibilityReasons(<YourERC20ContractInstance>);
 * ```
 * @example
 * ```javascript
 * const { data: claimIneligibilityReasons, isLoading, error } = useClaimIneligibilityReasons(<YourERC721ContractInstance>, {quantity: <quantity>});
 * ```
 * @example
 * ```javascript
 * const { data: claimIneligibilityReasons, isLoading, error } = useClaimIneligibilityReasons(<YourERC1155ContractInstance>, {quantity: <quantity>}, <tokenId>);
 * ```
 *
 * @param contract - an instace of a contract that extends the  ERC20, ERC721 or ERC1155 spec and implements the `claimConditions` extension.
 * @param eligibilityParams - the parameters for the eligibility check, see: {@link ClaimIneligibilityParameters}
 * @param tokenId - the id of the token to fetch the claim conditions for (if the contract is an ERC1155 contract)
 * @returns a response object with the resons for the claim ineligibility
 *
 * @beta
 */
export function useClaimIneligibilityReasons<
  TContract extends NFTDrop | EditionDrop | TokenDrop,
>(...[contract, params, tokenId]: ClaimIneligibilityInputParams<TContract>) {
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
        contract.claimConditions.getClaimIneligibilityReasons,
        "Contract instance does not support claimConditions.getClaimIneligibilityReasons",
      );
      if (contract instanceof Erc1155) {
        invariant(
          tokenId,
          "tokenId is required for ERC1155 claim ineligibility reasons",
        );
        return contract.claimConditions.getClaimIneligibilityReasons(
          tokenId,
          params.quantity,
          params.walletAddress,
        );
      }
      return contract.claimConditions.getClaimIneligibilityReasons(
        params.quantity,
        params.walletAddress,
      );
    },
    {
      // Checks that happen here:
      // 1. if the contract is based on  ERC1155 contract => tokenId cannot be `undefined`
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
