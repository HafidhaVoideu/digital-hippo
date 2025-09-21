import { buttonVariants } from "@/components/ui/button";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

import Link from "next/link";
import { Button } from "@/components/ui/button";

import { ArrowDownToLine, CheckCircle, Icon, Leaf } from "lucide-react";

const perks = [
  {
    name: "Instant delivery",
    Icon: ArrowDownToLine,
    description:
      "Receive your assets instantly via email and download them immediately.",
  },
  {
    name: "Guaranteed quality",
    Icon: CheckCircle,
    description:
      "All assets are carefully verified to meet our highest quality standards.",
  },
  {
    name: "For the planet",
    Icon: Leaf,
    description:
      "We commit 1% of every sale to protecting and restoring the environment.",
  },
];

export default function Home() {
  return (
    <>
      <MaxWidthWrapper>
        <div className="py-20 mx-auto text-center flex flex-col  items-center max-w-3xl ">
          <h1 className="text-gray-900  font-bold text-4xl  tracking-tight leading-10 lg:leading-16  md:text-6xl">
            {" "}
            Your marketplace for high-quality{" "}
            <span className="text-blue-600"> digital assets</span>.
          </h1>

          <p className="mt-6 text-lg max-w-prose text-muted-foreground">
            {" "}
            welcome to DigitalHippo.our Every asset o our platform is verified
            by our team to ensure our highest quality standards{" "}
          </p>

          <div className="flex flex-col sm:flex-row mt-6 gap-x-2">
            <Link href="/products" className={buttonVariants()}>
              Browse Trending
            </Link>

            <Button variant="ghost">Our quality promise</Button>
          </div>
        </div>

        {/* TODO: LIST PRODUCTS */}

        <section className="border-t border-gray-200 bg-gray-50">
          <MaxWidthWrapper className="py-20">
            <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:grid-x-8 lg:gap-y-0">
              {perks.map(({ name, Icon, description }) => (
                <div
                  key={name}
                  className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
                >
                  <div className="md:flex-shrink-0 flex justify-center">
                    <div className="h-16 w-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-900">
                      <Icon className="w-1/3 h-1/3"></Icon>
                    </div>
                  </div>

                  <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                    <h3 className="text-base font-medium text-gray-900">
                      {name}
                    </h3>

                    <p className="mt-3 text-muted-foreground text-sm">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </MaxWidthWrapper>
        </section>
      </MaxWidthWrapper>
    </>
  );
}
