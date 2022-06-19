export const magic = () => "Magic!";

// import { OAuthExtension, OAuthProvider } from "@magic-ext/oauth";
// import {
//   InstanceWithExtensions,
//   MagicSDKAdditionalConfiguration,
//   SDKBase,
// } from "@magic-sdk/provider";
// import {
//   Chain,
//   Connector,
//   UserRejectedRequestError,
//   normalizeChainId,
// } from "@wagmi/core";
// import { Signer, ethers } from "ethers";
// import { getAddress } from "ethers/lib/utils";
// import { Magic } from "magic-sdk";

// const IS_SERVER = typeof window === "undefined";

// const createModal = async () => undefined as any;

// interface Options {
//   apiKey: string;
//   accentColor?: string;
//   isDarkMode?: boolean;
//   customLogo?: string;
//   customHeaderText?: string;
//   enableEmailLogin?: boolean;
//   enableSMSlogin?: boolean;
//   oauthOptions?: {
//     providers: OAuthProvider[];
//     callbackUrl?: string;
//   };
//   additionalMagicOptions?: MagicSDKAdditionalConfiguration<
//     string,
//     OAuthExtension[]
//   >;
// }

// interface UserDetails {
//   email: string;
//   phoneNumber: string;
//   oauthProvider: OAuthProvider;
// }

// export class MagicConnector extends Connector {
//   ready = !IS_SERVER;

//   readonly id = "magic";

//   readonly name = "Magic";

//   provider: any;

//   magicSDK: InstanceWithExtensions<SDKBase, OAuthExtension[]> | undefined;

//   isModalOpen = false;

//   magicOptions: Options;

//   oauthProviders: OAuthProvider[];

//   oauthCallbackUrl: string | undefined;

//   constructor(config: { chains?: Chain[] | undefined; options: Options }) {
//     super(config);
//     this.magicOptions = config.options;
//     this.oauthProviders = config.options.oauthOptions?.providers || [];
//     this.oauthCallbackUrl = config.options.oauthOptions?.callbackUrl;
//   }

//   async connect() {
//     try {
//       const provider = await this.getProvider();

//       if (provider.on) {
//         provider.on("accountsChanged", this.onAccountsChanged);
//         provider.on("chainChanged", this.onChainChanged);
//         provider.on("disconnect", this.onDisconnect);
//       }

//       // Check if there is a user logged in
//       const isAuthenticated = await this.isAuthorized();

//       // if there is a user logged in, return the user
//       if (isAuthenticated) {
//         return {
//           provider,
//           chain: {
//             id: 0,
//             unsupported: false,
//           },
//           account: await this.getAccount(),
//         };
//       }

//       // open the modal and process the magic login steps
//       if (!this.isModalOpen) {
//         const output = await this.getUserDetailsByForm();
//         const magic = this.getMagicSDK();

//         // LOGIN WITH MAGIC LINK WITH OAUTH PROVIDER
//         if (output.oauthProvider) {
//           await magic.oauth.loginWithRedirect({
//             provider: output.oauthProvider,
//             redirectURI: this.oauthCallbackUrl || window.location.href,
//           });
//         }

//         // LOGIN WITH MAGIC LINK WITH EMAIL
//         if (output.email) {
//           await magic.auth.loginWithMagicLink({
//             email: output.email,
//           });
//         }

//         // LOGIN WITH MAGIC LINK WITH PHONE NUMBER
//         if (output.phoneNumber) {
//           await magic.auth.loginWithSMS({
//             phoneNumber: output.phoneNumber,
//           });
//         }

//         const signer = await this.getSigner();
//         const account = await signer.getAddress();

//         return {
//           account,
//           chain: {
//             id: 0,
//             unsupported: false,
//           },
//           provider,
//         };
//       }
//       throw new UserRejectedRequestError("User rejected request");
//     } catch (error) {
//       throw new UserRejectedRequestError("Something went wrong");
//     }
//   }

//   async getAccount(): Promise<string> {
//     const provider = new ethers.providers.Web3Provider(
//       await this.getProvider(),
//     );
//     const signer = provider.getSigner();
//     const account = await signer.getAddress();
//     return account;
//   }

//   async getUserDetailsByForm(): Promise<UserDetails> {
//     const output: UserDetails = (await createModal()) as UserDetails;

//     this.isModalOpen = false;
//     return output;
//   }

//   async getProvider() {
//     if (this.provider) {
//       return this.provider;
//     }
//     const magic = this.getMagicSDK();
//     this.provider = magic.rpcProvider;
//     return this.provider;
//   }

//   async getSigner(): Promise<Signer> {
//     const provider = new ethers.providers.Web3Provider(
//       await this.getProvider(),
//     );
//     const signer = await provider.getSigner();
//     return signer;
//   }

//   async isAuthorized() {
//     try {
//       const account = await this.getAccount();
//       return !!account;
//     } catch {
//       return false;
//     }
//   }

//   getMagicSDK(): InstanceWithExtensions<SDKBase, OAuthExtension[]> {
//     if (!this.magicSDK) {
//       this.magicSDK = new Magic(this.magicOptions.apiKey, {
//         ...this.magicOptions.additionalMagicOptions,
//         extensions: [new OAuthExtension()],
//       });
//       return this.magicSDK;
//     }
//     return this.magicSDK;
//   }

//   async getChainId(): Promise<number> {
//     throw new Error("Method not implemented.");
//   }

//   protected onAccountsChanged(accounts: string[]): void {
//     if (accounts.length === 0) {
//       this.emit("disconnect");
//     } else {
//       this.emit("change", { account: getAddress(accounts[0]) });
//     }
//   }

//   protected onChainChanged(chainId: string | number): void {
//     const id = normalizeChainId(chainId);
//     const unsupported = this.isChainUnsupported(id);
//     this.emit("change", { chain: { id, unsupported } });
//   }

//   protected onDisconnect(): void {
//     this.emit("disconnect");
//   }

//   async disconnect(): Promise<void> {
//     const magic = this.getMagicSDK();
//     await magic.user.logout();
//   }
// }
