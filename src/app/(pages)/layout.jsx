"use client";

import { Nav } from "@/components/Nav";
import { Logo } from "@/components/Logo";
import { NavContextProvider } from "@/utils/navContextProvider";
import { useLoader } from "@/utils/loader";
import { useLogo } from "@/utils/logoState";

import { Suspense, useEffect } from "react";
import { usePathname } from "next/navigation";
import { calcGeneratorDuration } from "motion";

const navFallback = (
  <nav className="nav grid" aria-labelledby="main navigation">
    <div className="subgrid">
      <div className="logo-wrapper">
        <Logo />
      </div>
    </div>
  </nav>
);

export default function RootLayout({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/" && !useLoader.getState().isDone) {
      useLoader.setState({ showLoader: false, isDone: true });
    }

    if (useLogo.getState().animate) {
      setTimeout(() => {
        useLogo.setState({ isDone: true, animate: false });
      }, 5500);
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
}
