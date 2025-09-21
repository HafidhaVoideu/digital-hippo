import { buildConfig, CollectionConfig, Access, CollectionSlug } from "payload";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { slateEditor } from "@payloadcms/richtext-slate";
import { nodemailerAdapter } from "@payloadcms/email-nodemailer";

import dotenv from "dotenv";
import nodemailer from "nodemailer";
import path from "path";
import { fileURLToPath } from "url";

import { Users } from "./collections/Users";
import { Products } from "./collections/products/Products";
import { Media } from "./collections/Media";
import { ProductFiles } from "./collections/ProductFiles";

// ✅ Build dirname manually for ESM
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

dotenv.config({
  path: path.resolve(dirname, "../.env"),
});

// create your Nodemailer transport for Resend
const transporter = nodemailer.createTransport({
  host: "smtp.resend.com",
  port: 465,
  secure: true,
  auth: {
    user: "resend",
    pass: process.env.RESEND_API_KEY,
  },
});

export default buildConfig({
  // Admin config
  admin: {
    user: "users",
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },

  // Database
  db: mongooseAdapter({
    url: process.env.MONGODB_URL || "",
  }),

  // Collections
  collections: [Users, Products, Media, ProductFiles],

  // Rich text editor
  editor: slateEditor({}),

  // Email adapter
  email: nodemailerAdapter({
    transport: transporter,
    defaultFromAddress: "delivered@resend.dev",
    defaultFromName: "DigitalHippo",
  }),

  // Secret for JWT / sessions
  secret: process.env.PAYLOAD_SECRET || "",

  // TypeScript types
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },

  plugins: [],
});
