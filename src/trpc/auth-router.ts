import { AuthCredentialsValidator } from "@/lib/account-credentials-validator";
import { TRPCError } from "@trpc/server";
import payload, { PayloadRequest } from "payload";
import { publicProcedure, router } from "./trpc";
import z from "zod";

export const authRouter = router({
  createPayloadUser: publicProcedure
    .input(AuthCredentialsValidator)
    .mutation(async ({ input }) => {
      const { email, password } = input;

      // check if user already exists
      const { docs: users } = await payload.find({
        collection: "users",
        where: {
          email: {
            equals: email,
          },
        },
      });

      // console.log("userss:", users);
      if (users.length) throw new TRPCError({ code: "CONFLICT" });

      await payload.create({
        collection: "users",
        data: {
          email,
          password,
          role: "user",
        },
      });

      return { success: true, sentToEmail: email };
    }),

  verifyEmail: publicProcedure
    .input(z.object({ token: z.string() }))
    .query(async ({ input }) => {
      const { token } = input;

      const isVerified = await payload.verifyEmail({
        collection: "users",
        token,
      });

      if (!isVerified) throw new TRPCError({ code: "UNAUTHORIZED" });

      return { success: true };
    }),

  signIn: publicProcedure
    .input(AuthCredentialsValidator)
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input;
      const { res } = ctx;

      try {
        const result = await payload.login({
          collection: "users",
          data: {
            email,
            password,
          },
        });

        res.cookie("payload-token", result.token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 1000 * 60 * 60 * 24, // 1 day
        });

        return { success: true };
      } catch (err) {
        console.log("error sign in", err);
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
    }),
});
