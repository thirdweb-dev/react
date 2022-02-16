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
- [useConnect](../wiki/Exports#useconnect)
- [useDisconnect](../wiki/Exports#usedisconnect)
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

[src/Provider.tsx:88](https://github.com/thirdweb-dev/react/blob/c182cd8/src/Provider.tsx#L88)

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

[src/hooks/modules/useBundleDropModule.ts:4](https://github.com/thirdweb-dev/react/blob/c182cd8/src/hooks/modules/useBundleDropModule.ts#L4)

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

[src/hooks/modules/useBundleModule.ts:4](https://github.com/thirdweb-dev/react/blob/c182cd8/src/hooks/modules/useBundleModule.ts#L4)

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

[src/hooks/modules/useBundleSignatureModule.ts:4](https://github.com/thirdweb-dev/react/blob/c182cd8/src/hooks/modules/useBundleSignatureModule.ts#L4)

___

### useConnect

▸ **useConnect**(): readonly [{ `data`: { `connected`: `boolean` ; `connector`: `undefined` \| `Connector`<`any`, `any`\> ; `connectors`: `Connector`<`any`, `any`\>[]  } ; `error`: `undefined` \| `Error` ; `loading`: `undefined` \| `boolean`  }, (`connector`: `Connector`<`any`, `any`\>) => `Promise`<{ `data?`: `ConnectorData`<`any`\> ; `error?`: `Error`  }\>]

for now just re-exported

#### Returns

readonly [{ `data`: { `connected`: `boolean` ; `connector`: `undefined` \| `Connector`<`any`, `any`\> ; `connectors`: `Connector`<`any`, `any`\>[]  } ; `error`: `undefined` \| `Error` ; `loading`: `undefined` \| `boolean`  }, (`connector`: `Connector`<`any`, `any`\>) => `Promise`<{ `data?`: `ConnectorData`<`any`\> ; `error?`: `Error`  }\>]

#### Defined in

src/hooks/useConnect.ts:6

___

### useDisconnect

▸ **useDisconnect**(): () => `void`

#### Returns

`fn`

▸ (): `void`

##### Returns

`void`

#### Defined in

src/hooks/useDisconnect.ts:3

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

[src/hooks/modules/useDropModule.ts:4](https://github.com/thirdweb-dev/react/blob/c182cd8/src/hooks/modules/useDropModule.ts#L4)

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

[src/hooks/modules/useMarketModule.ts:11](https://github.com/thirdweb-dev/react/blob/c182cd8/src/hooks/modules/useMarketModule.ts#L11)

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

[src/hooks/modules/useMarketplaceModule.ts:4](https://github.com/thirdweb-dev/react/blob/c182cd8/src/hooks/modules/useMarketplaceModule.ts#L4)

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

[src/hooks/modules/useNFTModule.ts:4](https://github.com/thirdweb-dev/react/blob/c182cd8/src/hooks/modules/useNFTModule.ts#L4)

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

[src/hooks/modules/usePackModule.ts:4](https://github.com/thirdweb-dev/react/blob/c182cd8/src/hooks/modules/usePackModule.ts#L4)

___

### useSDK

▸ **useSDK**(): `ThirdwebSDK` \| `undefined`

#### Returns

`ThirdwebSDK` \| `undefined`

#### Defined in

[src/Provider.tsx:214](https://github.com/thirdweb-dev/react/blob/c182cd8/src/Provider.tsx#L214)

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

[src/hooks/modules/useTokenModule.ts:4](https://github.com/thirdweb-dev/react/blob/c182cd8/src/hooks/modules/useTokenModule.ts#L4)

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

[src/hooks/modules/useVoteModule.ts:4](https://github.com/thirdweb-dev/react/blob/c182cd8/src/hooks/modules/useVoteModule.ts#L4)
