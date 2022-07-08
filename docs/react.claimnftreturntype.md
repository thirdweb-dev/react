<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@thirdweb-dev/react](./react.md) &gt; [ClaimNFTReturnType](./react.claimnftreturntype.md)

## ClaimNFTReturnType type

> This API is provided as a preview for developers and may change based on feedback that we receive. Do not use this API in a production environment.
> 

The return type of the [useClaimNFT()](./react.useclaimnft.md) hook.

<b>Signature:</b>

```typescript
export declare type ClaimNFTReturnType<TContract extends DropContract> = TContract extends Erc721 ? Awaited<ReturnType<TContract["claimTo"]>> : TContract extends Erc1155 ? Awaited<ReturnType<TContract["claimTo"]>> : never;
```
<b>References:</b> [DropContract](./react.dropcontract.md)
