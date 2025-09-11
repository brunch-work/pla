"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useMobile } from "../hooks/useMobile";
import { useNavContext } from "@/utils/navContextProvider";

import { Logo } from "./Logo";
import { RadioButton } from "./RadioButton";
import { PlusButton } from "./PlusButton";
import { SubNav } from "./SubNav";

export const Nav = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [activeItem, setActiveItem] = useState("");
  const [navOpen, setNavOpen] = useState(false);
  const [subNavOpen, setSubNavOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { navProps } = useNavContext();

  const isMobile = useMobile();

  const menu = isMobile
    ? [
        { name: "Home", route: "/" },
        { name: "Poets", route: "/poets" },
        { name: "Interviews", route: "/interviews" },
        { name: "Series", route: "/series" },
        { name: "Documentaries", route: "/documentaries" },
        { name: "Resources", route: "/resources" },
        { name: "About", route: "/about" },
        { name: "Donate", route: "/donate" },
        { name: "Search", route: "/search" },
      ]
    : [
        { name: "Poets", route: "/poets" },
        { name: "Interviews", route: "/interviews" },
        { name: "Series", route: "/series" },
        { name: "Documentaries", route: "/documentaries" },
        { name: "Resources", route: "/resources" },
        { name: "About", route: "/about" },
        { name: "Donate", route: "/donate" },
        { name: "Search", route: "/search" },
      ];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setNavOpen(false);
    }

    // reset active item when search param changes
    if (isMobile && navProps.searchParam) {
      setActiveItem(searchParams.get(navProps.searchParam));
      setSubNavOpen(false);
    }
  }, [pathname, isMobile, searchParams]);

  useEffect(() => {
    if (navOpen) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "auto";
    }
  }, [navOpen]);

  useEffect(() => {
    if (isMobile && activeItem) {
      document.body.classList.add("has-active-subnav");
    } else {
      document.body.classList.remove("has-active-subnav");
    }
  }, [activeItem, isMobile]);

  if (!mounted) {
    return (
      <nav className="nav loading grid">
        <div className="subgrid"></div>
      </nav>
    );
  }

  if (isMobile) {
    return (
      <nav
        className={`nav grid${navOpen ? " open" : ""}${
          subNavOpen && activeItem ? " subnav-open" : ""
        }`}
        aria-labelledby="main navigation"
      >
        <div className="subgrid">
          <div className="logo-wrapper" onClick={() => setNavOpen(!navOpen)}>
            <PlusButton isActive={navOpen} />
            <Logo />
          </div>
          {navOpen && (
            <ul className="menu">
              {menu.map((item, index) => (
                <li key={index} className="menu-item">
                  <RadioButton
                    active={pathname === item.route}
                    label={item.name}
                    value={item.route}
                    name="nav"
                    ariaCurrent={pathname === item.route ? "page" : undefined}
                    url={item.route}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
        {activeItem && !navOpen && (
          <SubNav
            {...navProps}
            pathname={pathname}
            activeItemSlug={activeItem}
            subNavOpen={subNavOpen}
            setSubNavOpen={setSubNavOpen}
          />
        )}
      </nav>
    );
  }

  return (
    <nav className="nav grid" aria-labelledby="main navigation">
      <div className="subgrid">
        <Link href="/">
          <Logo />
        </Link>

        <ul className="menu">
          {menu.map((item, index) => (
            <li key={index} className="menu-item">
              <RadioButton
                active={pathname === item.route}
                label={item.name}
                value={item.route}
                name="nav"
                ariaCurrent={pathname === item.route ? "page" : undefined}
                url={item.route}
              />
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
