// import dotenv from "dotenv";
// import path from "path";
// import payload from "payload";
// import type { InitOptions } from "payload";
// import config from "./payload.config";

// let cached = (global as any).payload;

// if (!cached) {
//   cached = (global as any).payload = {
//     client: null,
//     promise: null, // Added missing promise property
//   };
// }

// dotenv.config({
//   path: path.resolve(__dirname, "../.env"),
// });

// interface Args {
//   initOptions?: Partial<InitOptions>;
//   expressApp?: any; // Optional express app parameter
// }

// export const getPayloadClient = async ({
//   initOptions,
//   expressApp,
// }: Args = {}) => {
//   if (!process.env.PAYLOAD_SECRET) {
//     throw new Error("PAYLOAD_SECRET not found");
//   }

//   if (cached.client) {
//     return cached.client;
//   }

//   if (!cached.promise) {
//     // Create the initialization configuration object
//     const initConfig: any = {
//       config,
//       ...(initOptions || {}),
//     };

//     // If expressApp is provided, add it to the init config
//     if (expressApp) {
//       initConfig.express = expressApp;
//     }

//     cached.promise = payload.init(initConfig);
//   }

//   try {
//     cached.client = await cached.promise;
//   } catch (error: unknown) {
//     cached.promise = null;
//     throw error;
//   }

//   return cached.client;
// };
