"use client";
import { Icons } from "@/components/Icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

import { useForm } from "react-hook-form";

import { z, ZodError } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import router, { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  AuthCredentialsValidator,
  TAuthCredentialsValidator,
} from "@/lib/account-credentials-validator";
import { trpc } from "@/trpc/client";
const page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
  });

  const router = useRouter();
  // form submission

  const { mutate } = trpc.auth.createPayloadUser.useMutation({
    onError: (err) => {
      if (err.data?.code === "CONFLICT") {
        toast.error("This email is already in use. Sign in instead?");

        return;
      }

      if (err instanceof ZodError) {
        toast.error(err.issues[0].message);

        return;
      }

      toast.error("Something went wrong. Please try again.");
    },
    onSuccess: ({ sentToEmail }) => {
      toast.success(`Verification email sent to ${sentToEmail}.`);
      router.push("/verify-email?to=" + sentToEmail);
    },
  });

  const onSubmit = ({ email, password }: TAuthCredentialsValidator) => {
    mutate({ email, password }); //send this data to the server
  };
  return (
    <>
      <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] px-4">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Icons.logo className="w-20 h-20"></Icons.logo>
            <h1 className="font-bold text-2xl">create an account</h1>
            <Link
              href="/sign-in"
              className={buttonVariants({
                variant: "link",
                className: "gap-1.5",
              })}
            >
              already have an account? Sign-in
              <ArrowRight className="w-4 h-4"></ArrowRight>
            </Link>
          </div>

          <div className="grid gap-6 ">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-2  ">
                <div className=" grid gap-1 py-2">
                  <Label className="font-semibold mb-1" htmlFor="email">
                    Email
                  </Label>

                  <Input
                    {...register("email")}
                    className={cn({
                      "focus-visible:ring-red-400": errors.email,
                    })}
                    placeholder="email@gmail.com"
                  ></Input>

                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className=" grid gap-1 py-2">
                  <Label htmlFor="password" className="font-semibold mb-1">
                    Password
                  </Label>

                  <Input
                    {...register("password")}
                    type="password"
                    className={cn({
                      "focus-visible:ring-red-400": errors.password,
                    })}
                    placeholder="password"
                  ></Input>

                  {errors.password && (
                    <p className="text-red-500 text-sm">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <Button
                  className="justify-self-center px-10 cursor-pointer"
                  type="submit"
                >
                  {" "}
                  Sign up
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
