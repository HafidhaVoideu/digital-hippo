import { publicProcedure, router } from "./trpc";

import {authRouter}from "./auth-router"
export const appRouter = router({

  auth:authRouter,
  // anyAppRoute: publicProcedure.query(() => {
  //   return 3;
  // }),
});

export type AppRouter = typeof appRouter;
