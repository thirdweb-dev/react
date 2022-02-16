# @thirdweb-dev/react

## Table of contents

### Interfaces

- [ThirdwebPoviderProps](../wiki/ThirdwebPoviderProps)

### Variables

- [ThirdwebProvider](../wiki/Exports#thirdwebprovider)
- [defaultChains](../wiki/Exports#defaultchains)
- [defaultL2Chains](../wiki/Exports#defaultl2chains)

### Functions

- [useAccount](../wiki/Exports#useaccount)
- [useAddress](../wiki/Exports#useaddress)
- [useBundleDropModule](../wiki/Exports#usebundledropmodule)
- [useBundleModule](../wiki/Exports#usebundlemodule)
- [useBundleSignatureModule](../wiki/Exports#usebundlesignaturemodule)
- [useConnect](../wiki/Exports#useconnect)
- [useDisconnect](../wiki/Exports#usedisconnect)
- [useDropModule](../wiki/Exports#usedropmodule)
- [useMarketModule](../wiki/Exports#usemarketmodule)
- [useMarketplaceModule](../wiki/Exports#usemarketplacemodule)
- [useNFTModule](../wiki/Exports#usenftmodule)
- [useNetwork](../wiki/Exports#usenetwork)
- [usePackModule](../wiki/Exports#usepackmodule)
- [useSDK](../wiki/Exports#usesdk)
- [useSigner](../wiki/Exports#usesigner)
- [useTokenModule](../wiki/Exports#usetokenmodule)
- [useVoteModule](../wiki/Exports#usevotemodule)

## Variables

### ThirdwebProvider

• **ThirdwebProvider**: `React.FC`<[`ThirdwebPoviderProps`](../wiki/ThirdwebPoviderProps)\>

#### Defined in

[src/Provider.tsx:88](https://github.com/thirdweb-dev/react/blob/3f0fbbc/src/Provider.tsx#L88)

___

### defaultChains

• **defaultChains**: `Chain`[]

#### Defined in

node_modules/wagmi-private/dist/declarations/src/constants/chains.d.ts:5

___

### defaultL2Chains

• **defaultL2Chains**: `Chain`[]

#### Defined in

node_modules/wagmi-private/dist/declarations/src/constants/chains.d.ts:6

## Functions

### useAccount

▸ `Const` **useAccount**(`__namedParameters?`): readonly [{ `data`: `undefined` \| { `address`: `string` ; `connector`: `undefined` \| `Connector`<`any`, `any`\> ; `ens`: `undefined` \| { `avatar`: `undefined` \| ``null`` \| `string` ; `name`: `string`  }  } ; `error`: `undefined` \| `Error` ; `loading`: `boolean`  }, () => `void`]

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters?` | `Config` |

#### Returns

readonly [{ `data`: `undefined` \| { `address`: `string` ; `connector`: `undefined` \| `Connector`<`any`, `any`\> ; `ens`: `undefined` \| { `avatar`: `undefined` \| ``null`` \| `string` ; `name`: `string`  }  } ; `error`: `undefined` \| `Error` ; `loading`: `boolean`  }, () => `void`]

#### Defined in

node_modules/wagmi/dist/declarations/src/hooks/accounts/useAccount.d.ts:5

___

### useAddress

▸ **useAddress**(): `string` \| `undefined`

#### Returns

`string` \| `undefined`

#### Defined in

[src/hooks/useAddress.ts:3](https://github.com/thirdweb-dev/react/blob/3f0fbbc/src/hooks/useAddress.ts#L3)

___

### useBundleDropModule

▸ **useBundleDropModule**(`moduleAddress`): `BundleDropModule`

#### Parameters

| Name | Type |
| :------ | :------ |
| `moduleAddress` | `string` |

#### Returns

`BundleDropModule`

#### Defined in

[src/hooks/modules/useBundleDropModule.ts:4](https://github.com/thirdweb-dev/react/blob/3f0fbbc/src/hooks/modules/useBundleDropModule.ts#L4)

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

[src/hooks/modules/useBundleModule.ts:4](https://github.com/thirdweb-dev/react/blob/3f0fbbc/src/hooks/modules/useBundleModule.ts#L4)

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

[src/hooks/modules/useBundleSignatureModule.ts:4](https://github.com/thirdweb-dev/react/blob/3f0fbbc/src/hooks/modules/useBundleSignatureModule.ts#L4)

___

### useConnect

▸ **useConnect**(): readonly [{ `data`: { `connected`: `boolean` ; `connector`: `undefined` \| `Connector`<`any`, `any`\> ; `connectors`: `Connector`<`any`, `any`\>[]  } ; `error`: `undefined` \| `Error` ; `loading`: `undefined` \| `boolean`  }, (`connector`: `Connector`<`any`, `any`\>) => `Promise`<{ `data?`: `ConnectorData`<`any`\> ; `error?`: `Error`  }\>]

for now just re-exported

#### Returns

readonly [{ `data`: { `connected`: `boolean` ; `connector`: `undefined` \| `Connector`<`any`, `any`\> ; `connectors`: `Connector`<`any`, `any`\>[]  } ; `error`: `undefined` \| `Error` ; `loading`: `undefined` \| `boolean`  }, (`connector`: `Connector`<`any`, `any`\>) => `Promise`<{ `data?`: `ConnectorData`<`any`\> ; `error?`: `Error`  }\>]

#### Defined in

[src/hooks/useConnect.ts:6](https://github.com/thirdweb-dev/react/blob/3f0fbbc/src/hooks/useConnect.ts#L6)

___

### useDisconnect

▸ **useDisconnect**(): () => `void`

#### Returns

`fn`

▸ (): `void`

##### Returns

`void`

#### Defined in

[src/hooks/useDisconnect.ts:3](https://github.com/thirdweb-dev/react/blob/3f0fbbc/src/hooks/useDisconnect.ts#L3)

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

[src/hooks/modules/useDropModule.ts:4](https://github.com/thirdweb-dev/react/blob/3f0fbbc/src/hooks/modules/useDropModule.ts#L4)

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

[src/hooks/modules/useMarketModule.ts:11](https://github.com/thirdweb-dev/react/blob/3f0fbbc/src/hooks/modules/useMarketModule.ts#L11)

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

[src/hooks/modules/useMarketplaceModule.ts:4](https://github.com/thirdweb-dev/react/blob/3f0fbbc/src/hooks/modules/useMarketplaceModule.ts#L4)

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

[src/hooks/modules/useNFTModule.ts:4](https://github.com/thirdweb-dev/react/blob/3f0fbbc/src/hooks/modules/useNFTModule.ts#L4)

___

### useNetwork

▸ `Const` **useNetwork**(): readonly [{ `data`: { `chain`: `undefined` \| { `blockExplorers?`: { `name`: `string` ; `url`: `string`  }[] ; `id`: `number` ; `name?`: `string` ; `nativeCurrency?`: { `decimals`: ``18`` ; `name`: `string` ; `symbol`: `string`  } ; `rpcUrls?`: `string`[] ; `testnet?`: `boolean` ; `unsupported`: `undefined` \| `boolean`  } ; `chains`: `Chain`[]  } ; `error`: `undefined` \| `Error` ; `loading`: `undefined` \| `boolean`  }, `undefined` \| (`chainId`: `number`) => `Promise`<{ `data`: `undefined` ; `error`: `SwitchChainError`  } \| { `data`: `undefined` \| `Chain` ; `error`: `undefined`  }\>]

#### Returns

readonly [{ `data`: { `chain`: `undefined` \| { `blockExplorers?`: { `name`: `string` ; `url`: `string`  }[] ; `id`: `number` ; `name?`: `string` ; `nativeCurrency?`: { `decimals`: ``18`` ; `name`: `string` ; `symbol`: `string`  } ; `rpcUrls?`: `string`[] ; `testnet?`: `boolean` ; `unsupported`: `undefined` \| `boolean`  } ; `chains`: `Chain`[]  } ; `error`: `undefined` \| `Error` ; `loading`: `undefined` \| `boolean`  }, `undefined` \| (`chainId`: `number`) => `Promise`<{ `data`: `undefined` ; `error`: `SwitchChainError`  } \| { `data`: `undefined` \| `Chain` ; `error`: `undefined`  }\>]

#### Defined in

node_modules/wagmi/dist/declarations/src/hooks/accounts/useNetwork.d.ts:2

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

[src/hooks/modules/usePackModule.ts:4](https://github.com/thirdweb-dev/react/blob/3f0fbbc/src/hooks/modules/usePackModule.ts#L4)

___

### useSDK

▸ **useSDK**(): `ThirdwebSDK` \| `undefined`

#### Returns

`ThirdwebSDK` \| `undefined`

#### Defined in

[src/Provider.tsx:214](https://github.com/thirdweb-dev/react/blob/3f0fbbc/src/Provider.tsx#L214)

___

### useSigner

▸ **useSigner**(): `UseQueryResult`<`undefined` \| `Signer`, `unknown`\>

#### Returns

`UseQueryResult`<`undefined` \| `Signer`, `unknown`\>

#### Defined in

[src/hooks/useSigner.ts:5](https://github.com/thirdweb-dev/react/blob/3f0fbbc/src/hooks/useSigner.ts#L5)

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

[src/hooks/modules/useTokenModule.ts:4](https://github.com/thirdweb-dev/react/blob/3f0fbbc/src/hooks/modules/useTokenModule.ts#L4)

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

[src/hooks/modules/useVoteModule.ts:4](https://github.com/thirdweb-dev/react/blob/3f0fbbc/src/hooks/modules/useVoteModule.ts#L4)
