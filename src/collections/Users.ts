import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
  },
  auth: {
    verify: {
      generateEmailHTML: ({ token }) => {
        return `<a href=${process.env.SERVER_URL}/verify-email?token=${token}>verify account</a>`;
      },
    },
  },
  access: {
    read: () => true,
    create: () => true,
  },
  fields: [
    {
      name: "role",
      required: true,
      defaultValue: "user",
      // admin:{
      //   condition: ()=> false
      // },
      type: "select",

      options: [
        { label: "admin", value: "admin" },
        { label: "user", value: "user" },
      ],
    },
  ],
};
