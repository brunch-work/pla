"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, use } from "react";
import { useMobile } from "../hooks/useMobile";
import { useNavContext } from "@/utils/navContextProvider";

import { Logo } from "./Logo";
import { RadioButton } from "./RadioButton";
import { PlusButton } from "./PlusButton";
import { SubNav } from "./SubNav";

export const Nav = () => {
  const route = usePathname();
  const [navOpen, setNavOpen] = useState(false);
  const [subNavProps, setSubNavProps] = useState({
    list: [],
    subNavOpen: false,
    setSubNavOpen: () => {},
    activeItem: null,
    setActiveItem: () => {},
    activeItemSlug: null,
    itemType: "",
    pathname: "",
    searchParam: "",
    pageType: "",
  });
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
    setSubNavProps({ ...navProps });
  }, [navProps]);

  useEffect(() => {
    if (isMobile) {
      setNavOpen(false);
    }
  }, [route, isMobile]);

  useEffect(() => {
    if (navOpen) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "auto";
    }
  }, [navOpen]);

  useEffect(() => {
    if (isMobile && subNavProps.activeItem) {
      document.body.classList.add("has-active-subnav");
    } else {
      document.body.classList.remove("has-active-subnav");
    }
  }, [subNavProps.activeItem, isMobile]);

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
          subNavProps.subNavOpen && subNavProps.activeItem ? " subnav-open" : ""
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
                    active={route === item.route}
                    label={item.name}
                    value={item.route}
                    name="nav"
                    ariaCurrent={route === item.route ? "page" : undefined}
                    url={item.route}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
        {subNavProps.activeItem && !navOpen && <SubNav {...subNavProps} />}
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
                active={route === item.route}
                label={item.name}
                value={item.route}
                name="nav"
                ariaCurrent={route === item.route ? "page" : undefined}
                url={item.route}
              />
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
