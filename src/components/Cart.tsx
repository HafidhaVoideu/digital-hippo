import React from "react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { ShoppingCart } from "lucide-react";
import { Separator } from "./ui/separator";
import { cn, FormatPrice } from "@/lib/utils";
import { buttonVariants } from "./ui/button";

import Link from "next/link";

import Image from "next/image";

const Cart = () => {
  const cartItems = 0;

  const fee = 1;

  const total = 44;
  return (
    <Sheet>
      <SheetTrigger className="group -m-2 flex items-center p-2">
        <ShoppingCart
          area-hidden="true"
          className="h-6 w-6  flex-shrink-0 text-gray-400 group-hover:text-gray-500"
        ></ShoppingCart>

        <span className="ml-2 text-sm  font-medium text-gray-700 group-hover:text-gray-900">
          0
        </span>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg ">
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle>Cart{0}</SheetTitle>
        </SheetHeader>

        {cartItems ? (
          <div className="px-4">
            <div className=" flex flex-col w-full"></div>
            {/* TODO: CARTITEM LOGIC */}
            cart items
            <div className="space-y-4">
              <Separator></Separator>

              <div className="space-y-1.5 text-sm">
                <div className="flex">
                  <span className="flex-1">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex">
                  <span className="flex-1">Transaction fee</span>
                  <span>{FormatPrice(fee)}</span>
                </div>
                <div className="flex">
                  <span className="flex-1">Total</span>
                  <span>{FormatPrice(fee + total)}</span>
                </div>
              </div>
            </div>
            <SheetFooter>
              <SheetTrigger asChild>
                <Link
                  href="/cart"
                  className={cn(
                    buttonVariants({ variant: "default" }),
                    " w-full  max-w-fit mx-auto py-2 px-6"
                  )}
                >
                  continue to checkout
                </Link>
              </SheetTrigger>
            </SheetFooter>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full flex-col space-y-1">
            <div
              area-hidden="true"
              className="relative mb-4 h-60 w-60 text-muted-foreground"
            >
              <Image
                src="/hippo/hippo-empty-cart.png"
                alt="empty shopping"
                fill
              ></Image>
            </div>

            <div className="text-xl font-semibold text-gray-900">
              {" "}
              Your cart is empty
            </div>

            <SheetTrigger asChild>
              <Link
                href="/products"
                className={cn(
                  buttonVariants({
                    variant: "link",

                    size: "sm",
                  }),

                  "text-sm text-muted-foreground"
                )}
              >
                Add items to your cart to checkout
              </Link>
            </SheetTrigger>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
