import { cacheKeys } from "../../utils/cache-keys";
import { useQueryWithNetwork } from "../query-utils/useQueryWithNetwork";
import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import { Erc1155, QueryAllParams } from "@thirdweb-dev/sdk";

/** **********************/
/**     READ  HOOKS     **/
/** **********************/

/**
 * Use this to get a list of NFT tokens of your ERC721 contract.
 *
 * @example
 * ```javascript
 * const { data: nfts, isLoading, error } = useNFTList(<YourERC721ContractInstance>, { start: 0, count: 100 });
 * ```
 *
 * @param contract - an instace of a contract that extends the Erc721 spec (nft collection, nft drop, custom contract that follows the Erc721 spec)
 * @param queryParams - query params to pass to the query for the sake of pagination
 * @returns a response object that includes an array of NFTs
 * @beta
 */
export function useEditionList(
  contract: Erc1155<any> | undefined,
  queryParams?: QueryAllParams,
) {
  const contractAddress = contract?.getAddress();
  return useQueryWithNetwork(
    cacheKeys.contract.queryAllEdition(contractAddress, queryParams),
    async () => {
      if (contract) {
        return await contract.query?.all(queryParams);
      }
      return [];
    },
    {
      enabled: !!contract || !contractAddress,
      keepPreviousData: true,
    },
  );
}

/**
 * Use this to get a the total (minted) supply of your ERC721 contract.
 *
 * @example
 * ```javascript
 * const { data: totalSupply, isLoading, error } = useNFTSupply(<YourERC721ContractInstance>);
 * ```
 *
 * @param contract - an instace of a contract that extends the Erc721 spec (nft collection, nft drop, custom contract that follows the Erc721 spec)
 * @returns a response object that incudes the total minted supply
 * @beta
 */
export function useEditionSupply(
  contract: Erc1155<any> | undefined,
  tokenId: BigNumberish,
) {
  const contractAddress = contract?.getAddress();
  return useQueryWithNetwork(
    cacheKeys.contract.totalSupplyEdition(contractAddress, tokenId),
    async () => {
      if (contract) {
        return await contract.totalSupply(tokenId);
      }
      return BigNumber.from(0);
    },
    {
      enabled: !!contract || !tokenId,
    },
  );
}

/** **********************/
/**     WRITE HOOKS     **/
/** **********************/
