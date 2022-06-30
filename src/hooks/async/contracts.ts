import { useActiveChainId, useSDK } from "../../Provider";
import { ContractAddress, RequiredParam } from "../../types";
import {
  cacheKeys,
  createCacheKeyWithNetwork,
  createContractCacheKey,
} from "../../utils/cache-keys";
import { useQueryWithNetwork } from "../query-utils/useQueryWithNetwork";
import type { ThirdwebSDK } from "@thirdweb-dev/sdk/dist/browser";
// eslint-disable-next-line no-duplicate-imports
import { CONTRACTS_MAP, SmartContract } from "@thirdweb-dev/sdk/dist/browser";
import type {
  CustomContractMetadata,
  PublishedMetadata,
} from "@thirdweb-dev/sdk/dist/src/schema/contracts/custom";
import { CallOverrides } from "ethers";
import { QueryClient, useMutation, useQueryClient } from "react-query";
import invariant from "tiny-invariant";

async function fetchContractType(
  contractAddress: RequiredParam<string>,
  sdk: RequiredParam<ThirdwebSDK>,
) {
  if (!contractAddress || !sdk) {
    return;
  }
  try {
    return await sdk.resolveContractType(contractAddress);
  } catch (err) {
    // expected error, return custom type instead
    return "custom" as const;
  }
}

async function fetchContractPublishMetadata(
  contractAddress: RequiredParam<string>,
  sdk: RequiredParam<ThirdwebSDK>,
) {
  if (!contractAddress || !sdk) {
    return;
  }

  return await (
    await sdk.getPublisher()
  ).fetchContractMetadataFromAddress(contractAddress);
}
async function fetchContractTypeAndPublishMetadata(
  queryClient: QueryClient,
  contractAddress?: string,
  sdk?: ThirdwebSDK,
) {
  if (!contractAddress || !sdk) {
    return;
  }
  const contractType = await queryClient.fetchQuery(
    createCacheKeyWithNetwork(
      cacheKeys.contract.type(contractAddress),
      (sdk as any)._chainId,
    ),
    () => fetchContractType(contractAddress, sdk),
    // is immutable, so infinite stale time
    { staleTime: Infinity },
  );
  if (contractType !== "custom") {
    return {
      contractType,
      publishMetadata: null,
    };
  }
  const publishMetadata = await queryClient.fetchQuery(
    createCacheKeyWithNetwork(
      cacheKeys.contract.publishMetadata(contractAddress),
      (sdk as any)._chainId,
    ),
    () => fetchContractPublishMetadata(contractAddress, sdk),
    // is immutable, so infinite stale time
    { staleTime: Infinity },
  );
  return {
    contractType,
    publishMetadata,
  };
}

function getContractAbi(
  input: RequiredParam<
    Awaited<ReturnType<typeof fetchContractTypeAndPublishMetadata>>
  >,
) {
  if (!input || !input.contractType) {
    return null;
  }
  let contractAbi: PublishedMetadata["abi"] | null = null;
  if (input.contractType !== "custom") {
    contractAbi = CONTRACTS_MAP[input.contractType].contractAbi;
  }
  if (input.contractType === "custom" && input.publishMetadata) {
    contractAbi = input.publishMetadata?.abi;
  }

  return contractAbi;
}

function getContractFromCombinedTypeAndPublishMetadata(
  contractAddress: RequiredParam<ContractAddress>,
  input: RequiredParam<
    Awaited<ReturnType<typeof fetchContractTypeAndPublishMetadata>>
  >,
  sdk: RequiredParam<ThirdwebSDK>,
) {
  if (!input || !sdk || !contractAddress || !input.contractType) {
    return null;
  }

  const contractAbi = getContractAbi(input);

  invariant(
    contractAbi,
    `could not resolve any ABI for contract${contractAddress}`,
  );
  return sdk.getContractFromAbi(contractAddress, contractAbi);
}

/**
 *
 * @internal
 *
 * @param contractAddress - contract address
 * @returns the contract abi
 */
export function useContractAbi(
  contractAddress: RequiredParam<ContractAddress>,
) {
  const sdk = useSDK();

  const contractTypeAndPublishMetadata =
    useContractTypeAndPublishMetadata(contractAddress);

  if (
    !contractAddress ||
    !sdk ||
    !contractTypeAndPublishMetadata.data?.contractType
  ) {
    return {
      ...contractTypeAndPublishMetadata,
      abi: null,
    };
  }

  const abi = getContractAbi(contractTypeAndPublishMetadata.data);
  return { ...contractTypeAndPublishMetadata, abi };
}

/**
 * Use this to get the contract type for a (built-in or custom) contract.
 *
 * @example
 * ```javascript
 * const { data: contractType, isLoading, error } = useContractType("{{contract_address}}");
 * ```
 *
 * @param contractAddress - the address of the deployed contract
 * @returns a response object that includes the contract type of the contract
 * @beta
 */
export function useContractType(
  contractAddress: RequiredParam<ContractAddress>,
) {
  const sdk = useSDK();
  return useQueryWithNetwork(
    cacheKeys.contract.type(contractAddress),
    () => fetchContractType(contractAddress, sdk),
    {
      enabled: !!sdk && !!contractAddress,
      // never stale, a contract's publish metadata is immutable
      staleTime: Infinity,
    },
  );
}

/**
 * Use this to get the publish metadata for a deployed contract.
 *
 * @example
 * ```javascript
 * const { data: publishMetadata, isLoading, error } = useContractPublishMetadata("{{contract_address}}");
 * ```
 *
 * @param contractAddress - the address of the deployed contract
 * @returns a response object that includes the published metadata (name, abi, bytecode) of the contract
 * @beta
 */
export function useContractPublishMetadata(
  contractAddress: RequiredParam<ContractAddress>,
) {
  const sdk = useSDK();
  return useQueryWithNetwork(
    cacheKeys.contract.publishMetadata(contractAddress),
    () => fetchContractPublishMetadata(contractAddress, sdk),
    {
      enabled: !!sdk && !!contractAddress,
      // never stale, a contract's publish metadata is immutable
      staleTime: Infinity,
    },
  );
}

/**
 * @internal
 */
function useContractTypeAndPublishMetadata(
  contractAddress: RequiredParam<ContractAddress>,
) {
  const sdk = useSDK();
  const queryClient = useQueryClient();
  return useQueryWithNetwork(
    cacheKeys.contract.typeAndPublishMetadata(contractAddress),
    () =>
      fetchContractTypeAndPublishMetadata(queryClient, contractAddress, sdk),
    {
      enabled: !!sdk && !!contractAddress,
      // combination of type and publish metadata is immutable
      staleTime: Infinity,
    },
  );
}

/**
 * Use this resolve a contract address to a thirdweb (built-in / custom) contract instance.
 *
 * @example
 * ```javascript
 * const { contract, isLoading, error } = useContract("{{contract_address}}");
 * ```
 *
 * @param contractAddress - the address of the deployed contract
 * @returns a response object that includes the contract once it is resolved
 * @beta
 */
export function useContract(contractAddress: RequiredParam<ContractAddress>) {
  const sdk = useSDK();

  const contractTypeAndPublishMetadata =
    useContractTypeAndPublishMetadata(contractAddress);

  if (
    !contractAddress ||
    !sdk ||
    !contractTypeAndPublishMetadata.data?.contractType
  ) {
    return {
      ...contractTypeAndPublishMetadata,
      contract: null,
    };
  }

  const contract = getContractFromCombinedTypeAndPublishMetadata(
    contractAddress,
    contractTypeAndPublishMetadata.data,
    sdk,
  );
  return { ...contractTypeAndPublishMetadata, contract };
}

/**
 * Use this to get the contract metadata for a (built-in or custom) contract.
 *
 * @example
 * ```javascript
 * const { data: contractMetadata, isLoading, error } = useContractMetadata("{{contract_address}}");
 * ```
 *
 * @param contractAddress - the address of the deployed contract
 * @returns a response object that includes the contract metadata of the deployed contract
 * @beta
 */
export function useContractMetadata(
  contractAddress: RequiredParam<ContractAddress>,
) {
  const sdk = useSDK();
  const queryClient = useQueryClient();
  const activeChainId = useActiveChainId();
  return useQueryWithNetwork(
    cacheKeys.contract.metadata(contractAddress),
    async () => {
      const typeAndPublishMetadata = await queryClient.fetchQuery(
        createCacheKeyWithNetwork(
          cacheKeys.contract.typeAndPublishMetadata(contractAddress),
          activeChainId,
        ),
        () =>
          fetchContractTypeAndPublishMetadata(
            queryClient,
            contractAddress,
            sdk,
          ),
        // is immutable, so infinite stale time
        { staleTime: Infinity },
      );
      const contract = getContractFromCombinedTypeAndPublishMetadata(
        contractAddress,
        typeAndPublishMetadata,
        sdk,
      );
      invariant(contract?.metadata?.get, "contract metadata is not available");
      return (await contract.metadata.get()) as CustomContractMetadata;
    },
    {
      enabled: !!contractAddress || !!sdk,
    },
  );
}

/**
 @internal
 */
export function useContractFunctions(
  contractAddress: RequiredParam<ContractAddress>,
) {
  const sdk = useSDK();
  const queryClient = useQueryClient();
  const activeChainId = useActiveChainId();
  return useQueryWithNetwork(
    cacheKeys.contract.extractFunctions(contractAddress),
    async () => {
      const typeAndPublishMetadata = await queryClient.fetchQuery(
        createCacheKeyWithNetwork(
          cacheKeys.contract.typeAndPublishMetadata(contractAddress),
          activeChainId,
        ),
        () =>
          fetchContractTypeAndPublishMetadata(
            queryClient,
            contractAddress,
            sdk,
          ),
        // is immutable, so infinite stale time
        { staleTime: Infinity },
      );
      const contract = getContractFromCombinedTypeAndPublishMetadata(
        contractAddress,
        typeAndPublishMetadata,
        sdk,
      );
      if (contract instanceof SmartContract) {
        return contract.publishedMetadata.extractFunctions();
      }
      return null;
    },
    {
      enabled: !!contractAddress || !!sdk,
      // functions are based on publish metadata (abi), so this is immutable
      staleTime: Infinity,
    },
  );
}

/**
 * Use this to get data from a contract read-function call.
 *
 * @example
 * ```javascript
 * const { contract } = useContract("{{contract_address}}");
 * const { data, isLoading, error } = useContractData(contract, "functionName", ...args);
 *```
 *
 * @param contract - the contract instance of the contract to call a function on
 * @param functionName - the name of the function to call
 * @param args - The arguments to pass to the function (if any), with optional call arguments as the last parameter
 * @returns a response object that includes the data returned by the function call
 *
 * @beta
 */
export function useContractData(
  contract: RequiredParam<ReturnType<typeof useContract>["contract"]>,
  functionName: RequiredParam<string>,
  ...args: unknown[] | [...unknown[], CallOverrides]
) {
  const contractAddress = contract?.getAddress();
  return useQueryWithNetwork(
    cacheKeys.contract.call(contractAddress, functionName, args),
    () => {
      invariant(contract, "contract must be defined");
      invariant(functionName, "function name must be provided");
      return contract.call(functionName, ...args);
    },
    {
      enabled: !!contract && !!functionName,
    },
  );
}

/**
 * Use this to get a function to make a write call to your contract
 *
 * @example
 * ```javascript
 * const { contract } = useContract("{{contract_address}}");
 * const { mutate: myFunction, isLoading, error } = useContractCall(contract, "myFunction");
 *
 * // the function can be called as follows:
 * // myFunction(...args)
 *```
 *
 * @param contract - the contract instance of the contract to call a function on
 * @param functionName - the name of the function to call
 * @returns a response object that includes the write function to call
 *
 * @beta
 */
export function useContractCall(
  contract: RequiredParam<ReturnType<typeof useContract>["contract"]>,
  functionName: RequiredParam<string>,
) {
  const activeChainId = useActiveChainId();
  const contractAddress = contract?.getAddress();
  const queryClient = useQueryClient();

  return useMutation(
    async (...args: unknown[] | [...unknown[], CallOverrides]) => {
      invariant(contract, "contract must be defined");
      invariant(functionName, "function name must be provided");
      if (!args.length) {
        return contract.call(functionName);
      }
      return contract.call(functionName, ...args);
    },
    {
      onSettled: () =>
        queryClient.invalidateQueries(
          createCacheKeyWithNetwork(
            createContractCacheKey(contractAddress),
            activeChainId,
          ),
        ),
    },
  );
}
