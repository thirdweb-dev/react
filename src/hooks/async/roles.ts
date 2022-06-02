import { useActiveChainId } from "../../Provider";
import { RequiredParam, WalletAddress } from "../../types";
import {
  cacheKeys,
  invalidateContractAndBalances,
} from "../../utils/cache-keys";
import { useQueryWithNetwork } from "../query-utils/useQueryWithNetwork";
import type {
  Multiwrap,
  Role,
  SmartContract,
  Split,
  ValidContractInstance,
  Vote,
} from "@thirdweb-dev/sdk";
import { constants } from "ethers";
import { useMutation, useQueryClient } from "react-query";
import invariant from "tiny-invariant";

/** **********************/
/**         UTILS       **/
/** **********************/

type ContractWithRoles =
  | Exclude<ValidContractInstance, Vote | Split | Multiwrap>
  | SmartContract;

type RolesForContract<TContract extends ContractWithRoles> =
  TContract extends SmartContract
    ? Role | (string & {})
    : NonNullable<TContract["roles"]>["roles"][number];

type GetAllReturnType<TContract extends ContractWithRoles> = Promise<
  Record<RolesForContract<TContract>, string[]>
>;

/** **********************/
/**     READ  HOOKS     **/
/** **********************/

/**
 * TODO write docs
 *
 * @param contract -
 * @returns
 * @beta
 */
export function useAllRoleMembers<TContract extends ContractWithRoles>(
  contract: RequiredParam<TContract>,
) {
  const contractAddress = contract?.getAddress();
  return useQueryWithNetwork<Awaited<GetAllReturnType<TContract>>>(
    cacheKeys.extensions.roles.getAll(contractAddress),
    () => {
      invariant(contract, "No contract provided");
      invariant(contract.roles, "Contract does not support roles");
      // have to cast to any because of role bs, type is defined in the useQueryWithNetwork definition above
      return contract.roles.getAll() as any;
    },
    {
      enabled: !!contract && !!contractAddress,
    },
  );
}

/**
 * TODO write docs
 *
 * @param contract -
 * @param role -
 * @returns
 * @beta
 */
export function useRoleMembers<TContract extends ContractWithRoles>(
  contract: RequiredParam<TContract>,
  role: RolesForContract<TContract>,
) {
  const contractAddress = contract?.getAddress();
  return useQueryWithNetwork(
    cacheKeys.extensions.roles.get(contractAddress, role),
    () => {
      invariant(contract, "No contract provided");
      invariant(contract.roles, "Contract does not support roles");
      return contract.roles.get(role);
    },
    {
      enabled: !!contract && !!contractAddress && !!role,
    },
  );
}

/**
 * TODO write docs
 *
 * @param contract -
 * @param role -
 * @param walletAddress -
 * @returns
 * @beta
 */
export function useIsAddressRole<TContract extends ContractWithRoles>(
  contract: RequiredParam<TContract>,
  role: RolesForContract<TContract>,
  walletAddress: RequiredParam<WalletAddress>,
): boolean {
  // TODO this might be possible to do with `verify` fn instead?
  const contractHasRoles = !!(contract && contract.roles);
  const { data } = useRoleMembers(
    contractHasRoles ? contract : undefined,
    role,
  );

  // if the contract does not have roles then everything is allowed === true
  if (contractHasRoles === false) {
    return true;
  }

  // switch logic (if address 0 is in the role list then anyone has permissions to it)
  if (data?.includes(constants.AddressZero)) {
    return true;
  }

  // actual role check logic
  return !!(walletAddress && data?.includes(walletAddress));
}

/** **********************/
/**     WRITE HOOKS     **/
/** **********************/

/**
 * TODO write docs
 *
 * @param contract -
 * @returns
 * @beta
 */
export function useSetAllRoleMembers<TContract extends ContractWithRoles>(
  contract: RequiredParam<TContract>,
) {
  const activeChainId = useActiveChainId();
  const contractAddress = contract?.getAddress();
  const queryClient = useQueryClient();

  return useMutation(
    async (rolesWithAddresses: {
      [role in RolesForContract<TContract>]: string[];
    }) => {
      invariant(contract, "No contract provided");
      invariant(contract.roles, "Contract does not support roles");
      await contract.roles.setAll(rolesWithAddresses);
    },
    {
      onSettled: () =>
        invalidateContractAndBalances(
          queryClient,
          contractAddress,
          activeChainId,
        ),
    },
  );
}

/**
 * TODO write docs
 *
 * @param contract -
 * @returns
 * @beta
 */
export function useGrantRole<TContract extends ContractWithRoles>(
  contract: RequiredParam<TContract>,
) {
  const activeChainId = useActiveChainId();
  const contractAddress = contract?.getAddress();
  const queryClient = useQueryClient();

  return useMutation(
    async (params: {
      role: RolesForContract<TContract>;
      address: WalletAddress;
    }) => {
      invariant(contract, "No contract provided");
      invariant(contract.roles, "Contract does not support roles");
      await contract.roles.grant(params.role as any, params.address);
    },
    {
      onSettled: () =>
        invalidateContractAndBalances(
          queryClient,
          contractAddress,
          activeChainId,
        ),
    },
  );
}

/**
 * TODO write docs
 *
 * @param contract -
 * @returns
 * @beta
 */
export function useRevokeRole<TContract extends ContractWithRoles>(
  contract: RequiredParam<TContract>,
) {
  const activeChainId = useActiveChainId();
  const contractAddress = contract?.getAddress();
  const queryClient = useQueryClient();
  return useMutation(
    async (params: {
      role: RolesForContract<TContract>;
      address: WalletAddress;
    }) => {
      invariant(contract, "No contract provided");
      invariant(contract.roles, "Contract does not support roles");
      await contract.roles.revoke(params.role as any, params.address);
    },
    {
      onSettled: () =>
        invalidateContractAndBalances(
          queryClient,
          contractAddress,
          activeChainId,
        ),
    },
  );
}
