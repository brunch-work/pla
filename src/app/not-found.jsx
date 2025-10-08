"use client";

import { NavContextProvider } from "@/utils/navContextProvider";
import { Nav } from "@/components/Nav";
import { useLoader } from "@/utils/loader";

import { useEffect } from "react";

export default function NotFound() {

  useEffect(() => {
    useLoader.setState({ showLoader: false, isDone: true });
  }, []);

  return (
    <NavContextProvider>
      <Nav />
      <div className="not-found page subgrid">
        <h1 className="body-text">404 - Page Not Found</h1>
      </div>
    </NavContextProvider>
  );
}
