<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@thirdweb-dev/react](./react.md) &gt; [useContractEvents](./react.usecontractevents.md)

## useContractEvents() function

> This API is provided as a preview for developers and may change based on feedback that we receive. Do not use this API in a production environment.
> 

Use this to query (and subscribe) to a specific event on a contract.

<b>Signature:</b>

```typescript
export declare function useContractEvents(contract: RequiredParam<ReturnType<typeof useContract>["contract"]>, eventName: string, options?: {
    queryFilter?: EventQueryFilter;
    subscribe?: boolean;
}): import("react-query").UseQueryResult<ContractEvent[], unknown>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  contract | RequiredParam&lt;ReturnType&lt;typeof useContract&gt;\["contract"\]&gt; | the contract instance of the contract to call a function on |
|  eventName | string |  |
|  options | { queryFilter?: EventQueryFilter; subscribe?: boolean; } | <i>(Optional)</i> options incldues the filters (<!-- -->) for the query as well as if you want to subscribe to real-time updates (default: true) |

<b>Returns:</b>

import("react-query").UseQueryResult&lt;ContractEvent\[\], unknown&gt;

a response object that includes the contract events
