"use client";

import { NavContextProvider } from "@/utils/navContextProvider";
import { Suspense } from "react";
import { Nav } from "@/components/Nav";
import { useLoader } from "@/utils/loader";
import { Logo } from "@/components/Logo";

import { useEffect } from "react";

const navFallback = (
  <nav className="nav grid" aria-labelledby="main navigation">
    <div className="subgrid">
      <div className="logo-wrapper">
        <Logo />
      </div>
    </div>
  </nav>
);

export default function NotFound() {
  useEffect(() => {
    useLoader.setState({ showLoader: false, isDone: true });
  }, []);

  return (
    <NavContextProvider>
      <Suspense fallback={navFallback}>
        <Nav />
      </Suspense>
      <div className="not-found page subgrid">
        <h1 className="body-text">404 - Page Not Found</h1>
      </div>
    </NavContextProvider>
  );
}
