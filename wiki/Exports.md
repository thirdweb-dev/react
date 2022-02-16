# @thirdweb-dev/react

## Table of contents

### Interfaces

- [ThirdwebPoviderProps](../wiki/ThirdwebPoviderProps)

### Variables

- [ThirdwebProvider](../wiki/Exports#thirdwebprovider)

### Functions

- [useBundleDropModule](../wiki/Exports#usebundledropmodule)
- [useBundleModule](../wiki/Exports#usebundlemodule)
- [useBundleSignatureModule](../wiki/Exports#usebundlesignaturemodule)
- [useDropModule](../wiki/Exports#usedropmodule)
- [useMarketModule](../wiki/Exports#usemarketmodule)
- [useMarketplaceModule](../wiki/Exports#usemarketplacemodule)
- [useNFTModule](../wiki/Exports#usenftmodule)
- [usePackModule](../wiki/Exports#usepackmodule)
- [useSDK](../wiki/Exports#usesdk)
- [useTokenModule](../wiki/Exports#usetokenmodule)
- [useVoteModule](../wiki/Exports#usevotemodule)

## Variables

### ThirdwebProvider

• **ThirdwebProvider**: `React.FC`<[`ThirdwebPoviderProps`](../wiki/ThirdwebPoviderProps)\>

#### Defined in

Provider.tsx:88

## Functions

### useBundleDropModule

▸ **useBundleDropModule**(`moduleAddress`): `BundleDropModule`

#### Parameters

| Name | Type |
| :------ | :------ |
| `moduleAddress` | `string` |

#### Returns

`BundleDropModule`

#### Defined in

hooks/modules/useBundleDropModule.ts:4

___

### useBundleModule

▸ **useBundleModule**(`moduleAddress`): `BundleModule`

#### Parameters

| Name | Type |
| :------ | :------ |
| `moduleAddress` | `string` |

#### Returns

`BundleModule`

#### Defined in

hooks/modules/useBundleModule.ts:4

___

### useBundleSignatureModule

▸ **useBundleSignatureModule**(`moduleAddress`): `SignatureMint1155Module`

#### Parameters

| Name | Type |
| :------ | :------ |
| `moduleAddress` | `string` |

#### Returns

`SignatureMint1155Module`

#### Defined in

hooks/modules/useBundleSignatureModule.ts:4

___

### useDropModule

▸ **useDropModule**(`moduleAddress`): `DropModule`

#### Parameters

| Name | Type |
| :------ | :------ |
| `moduleAddress` | `string` |

#### Returns

`DropModule`

#### Defined in

hooks/modules/useDropModule.ts:4

___

### useMarketModule

▸ **useMarketModule**(`moduleAddress`): `MarketModule`

**`deprecated`** - The {@link MarketModule} is deprecated in favor of {@link MarketplaceModule}

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `moduleAddress` | `string` | the address of the market module |

#### Returns

`MarketModule`

the {@link MarketModule} instance

#### Defined in

hooks/modules/useMarketModule.ts:11

___

### useMarketplaceModule

▸ **useMarketplaceModule**(`moduleAddress`): `MarketplaceModule`

#### Parameters

| Name | Type |
| :------ | :------ |
| `moduleAddress` | `string` |

#### Returns

`MarketplaceModule`

#### Defined in

hooks/modules/useMarketplaceModule.ts:4

___

### useNFTModule

▸ **useNFTModule**(`moduleAddress`): `NFTModule`

#### Parameters

| Name | Type |
| :------ | :------ |
| `moduleAddress` | `string` |

#### Returns

`NFTModule`

#### Defined in

hooks/modules/useNFTModule.ts:4

___

### usePackModule

▸ **usePackModule**(`moduleAddress`): `PackModule`

#### Parameters

| Name | Type |
| :------ | :------ |
| `moduleAddress` | `string` |

#### Returns

`PackModule`

#### Defined in

hooks/modules/usePackModule.ts:4

___

### useSDK

▸ **useSDK**(): `ThirdwebSDK` \| `undefined`

#### Returns

`ThirdwebSDK` \| `undefined`

#### Defined in

Provider.tsx:214

___

### useTokenModule

▸ **useTokenModule**(`moduleAddress`): `TokenModule`

#### Parameters

| Name | Type |
| :------ | :------ |
| `moduleAddress` | `string` |

#### Returns

`TokenModule`

#### Defined in

hooks/modules/useTokenModule.ts:4

___

### useVoteModule

▸ **useVoteModule**(`moduleAddress`): `VoteModule`

#### Parameters

| Name | Type |
| :------ | :------ |
| `moduleAddress` | `string` |

#### Returns

`VoteModule`

#### Defined in

hooks/modules/useVoteModule.ts:4
