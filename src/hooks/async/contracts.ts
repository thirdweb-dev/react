import { useSDK } from "../../providers/thirdweb-sdk";
import { cacheKeys } from "../../query-cache/cache-keys";
import { ContractAddress, RequiredParam } from "../../types/types";
import { CONTRACTS_MAP, SmartContract, ThirdwebSDK } from "@thirdweb-dev/sdk";
import type {
  CustomContractMetadata,
  PublishedMetadata,
} from "@thirdweb-dev/sdk/dist/src/schema/contracts/custom";
import { QueryClient, useQuery, useQueryClient } from "react-query";
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

  return await sdk
    .getPublisher()
    .fetchContractMetadataFromAddress(contractAddress);
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
    cacheKeys.contract.type(contractAddress),
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
    cacheKeys.contract.publishMetadata(contractAddress),

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
    return undefined;
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
      abi: undefined,
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
  return useQuery(
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
  return useQuery(
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
  return useQuery(
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
      contract: undefined,
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

  return useQuery(
    cacheKeys.contract.metadata(contractAddress),
    async () => {
      const typeAndPublishMetadata = await queryClient.fetchQuery(
        cacheKeys.contract.typeAndPublishMetadata(contractAddress),

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

  return useQuery(
    cacheKeys.contract.extractFunctions(contractAddress),
    async () => {
      const typeAndPublishMetadata = await queryClient.fetchQuery(
        cacheKeys.contract.typeAndPublishMetadata(contractAddress),

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
      return undefined;
    },
    {
      enabled: !!contractAddress || !!sdk,
      // functions are based on publish metadata (abi), so this is immutable
      staleTime: Infinity,
    },
  );
}
