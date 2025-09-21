"use client";
import { PRODUCT_CATEGORIES } from "@/config";
import React, { useEffect, useRef, useState } from "react";
import NavItem from "./NavItem";
import { useOnClickOutside } from "@/hooks/use-onclick-outside";
import { Ghost, Link } from "lucide-react";
import { buttonVariants } from "./ui/button";

const NavItems = () => {
  const [activeIndex, setActiveIndex] = useState<null | number>();
  const isAnyOpen = activeIndex !== null;
  const navRef = useRef<HTMLDivElement | null>(null);

  const user = null;
  //!TOFIX

  // useOnClickOutside(navRef, () => setActiveIndex(null));

  //escape event handler to close the menu

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key == "Escape") {
        setActiveIndex(null);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <div ref={navRef} className="flex gap-4 h-full">
      {PRODUCT_CATEGORIES.map((x, i) => (
        <NavItem
          key={x.value}
          handleOpen={() => setActiveIndex(activeIndex == i ? null : i)}
          close={() => setActiveIndex(null)}
          isOpen={activeIndex == i}
          category={x}
          isAnyOpen={isAnyOpen}
        ></NavItem>
      ))}
    </div>
  );
};

export default NavItems;
