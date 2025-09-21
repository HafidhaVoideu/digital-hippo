import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import { Icons } from "./Icons";
import NavItems from "./NavItems";
import { buttonVariants } from "./ui/button";
import Cart from "./Cart";
import { getServerSideUser } from "@/lib/payload-users";
import { cookies } from "next/headers";
import UserAccountNav from "@/components/UserAccountNav";

const Navbar = async () => {
  const cookieStore = await cookies();
  const { user } = await getServerSideUser(cookieStore);

  return (
    <div className="bg-white sticky z-50 top-0 inset-x-0 h-16">
      <header className="relative bg-white ">
        <MaxWidthWrapper>
          <div className="border-b border-gray-200"></div>
          <div className="flex items-center h-16">
            {/* TODO: mobile nav */}

            <div className="ml-4 flex lg:ml-2">
              <Link href="/">
                <Icons.logo className="h-10 w-10"></Icons.logo>
              </Link>

              <div className="hidden z-50 lg:block lg:self-stretch lg:ml-8">
                <NavItems></NavItems>
              </div>
            </div>

            <div className="ml-auto flex items-center">
              <div className="hidden lg:flex lg:justify-end lg:items-center lg:space-x-6">
                {!user && (
                  <Link
                    href="/sign-in"
                    className={buttonVariants({
                      variant: "custom",
                    })}
                  >
                    {" "}
                    sign in
                  </Link>
                )}

                {!user && (
                  <span
                    className="h-6 w-px bg-gray-100 "
                    area-hidden="true"
                  ></span>
                )}

                {user ? (
                  <UserAccountNav user={user} />
                ) : (
                  <Link
                    href="/sign-up"
                    className={buttonVariants({
                      variant: "custom",
                    })}
                  >
                    create account
                  </Link>
                )}

                {!user && (
                  <div className="flex lg:ml-6">
                    <span
                      className="h-6 w-px bg-gray-200 "
                      aria-hidden="true"
                    />
                  </div>
                )}

                <Cart></Cart>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
};

export default Navbar;
