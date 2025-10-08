"use client";

import { Nav } from "@/components/Nav";
import { Logo } from "@/components/Logo";
import { NavContextProvider } from "@/utils/navContextProvider";
import { useLoader } from "@/utils/loader";

import { Suspense, use, useEffect } from "react";
import { usePathname } from "next/navigation";

const navFallback = (
  <nav className="nav grid" aria-labelledby="main navigation">
    <div className="subgrid">
      <div className="logo-wrapper">
        <Logo />
      </div>
    </div>
  </nav>
);

export const LayoutInner = ({ children }) => {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/" && !useLoader.getState().isDone) {
      useLoader.setState({ showLoader: false, isDone: true });
    }
  }, [pathname]);

  return (
    <NavContextProvider>
      <Suspense fallback={navFallback}>
        <Nav />
      </Suspense>
      {children}
    </NavContextProvider>
  );
};
