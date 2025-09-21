// import express from "express";
// import { parse } from "url";
// import next from "next";

// const port = parseInt(process.env.PORT || "3001", 10);
// const dev = process.env.NODE_ENV !== "production";
// const app = next({ dev });
// const handle = app.getRequestHandler();

// app.prepare().then(() => {
//   const server = express();

//   server.use((req, res) => {
//     const parsedUrl = parse(req.url!, true);
//     handle(req, res, parsedUrl);
//   });

//   server.listen(port, () => {
//     console.log(
//       `> Server listening at http://localhost:${port} as ${
//         dev ? "development" : process.env.NODE_ENV
//       }`
//     );
//   });
// });

import express from "express";
import { parse } from "url";
// import { createPayloadExpressApp } from "payload/express";
import next from "next";
import payload from "payload";
import payloadConfig from "./payload.config";

import * as trpcExpress from "@trpc/server/adapters/express";

import { appRouter } from "./trpc";

const port = parseInt(process.env.PORT || "3002", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({
  req,
  res,
});

export type ExpressContext = Awaited<ReturnType<typeof createContext>>;

const start = async () => {
  try {
    // ✅ Prepare Next.js FIRST
    console.log("⏳ Preparing Next.js...");
    await app.prepare();
    console.log("✅ Next.js prepared");

    const handle = app.getRequestHandler();
    const server = express(); // ✅ Only ONE server declaration
    // const app = await createPayloadExpressApp({
    //   secret: process.env.PAYLOAD_SECRET!,
    //   mongoURL: process.env.DATABASE_URI!,
    // });

    // ✅ Add basic middleware
    server.use(express.json({ limit: "10mb" }));
    server.use(express.urlencoded({ extended: true }));

    // ✅ Initialize Payload
    console.log("⏳ Initializing Payload CMS...");
    await payload.init({
      config: payloadConfig,
      onInit: (cms) => {
        console.log("✅ Payload CMS initialized!");
        console.log("🚀 DATABASE_URI in server:", process.env.MONGODB_URL);
        console.log("Admin URL:", cms.getAdminURL());
      },
    });

    // ✅ Logging middleware

    server.use((req, res, next) => {
      if (req.body && Object.keys(req.body).length > 0) {
        // console.log("Body:", JSON.stringify(req.body, null, 2));
      }
      next();
    });

    server.use(
      "/api/trpc",
      trpcExpress.createExpressMiddleware({
        router: appRouter,
        createContext,
      })
    );

    // ✅ Handle all routes - Payload will catch its own routes first
    server.use((req, res) => {
      const parsedUrl = parse(req.url!, true);
      handle(req, res, parsedUrl);
    });

    server.listen(port, () => {
      console.log(`🚀 Server running on http://localhost:${port}`);
      console.log(`📊 Admin panel: http://localhost:${port}/admin`);
    });
  } catch (error) {
    console.error("💥 Failed to start server:", error);
    process.exit(1);
  }
};

// Start the server
start();
