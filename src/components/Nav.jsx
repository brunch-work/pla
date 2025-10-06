"use client";

import { Link } from "next-view-transitions";
import { usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useHamburgerMenu } from "../hooks/useMobile";
import { AnimatePresence, motion } from "motion/react";

import { Logo } from "./Logo";
import { RadioButton } from "./RadioButton";
import { PlusButton } from "./PlusButton";
import { SubNav } from "./SubNav";
import { Search } from "./Search";
import { useNavContext } from "@/utils/navContextProvider";
import { menuItemVariants } from "@/motion/menus";
import { navVariants } from "@/motion/nav";

export const getMenu = (isMobile) => {
  return isMobile
    ? [
      { name: "Home", route: "/" },
      { name: "Poets", route: "/poets" },
      { name: "Interviews", route: "/interviews" },
      { name: "Series", route: "/series" },
      { name: "Documentaries", route: "/documentaries" },
      { name: "Resources", route: "/resources" },
      { name: "About", route: "/about" },
      { name: "Donate", route: "https://www.patreon.com/PoetryLA" },
      { name: "Search", route: "/search" },
    ]
    : [
      { name: "Poets", route: "/poets" },
      { name: "Interviews", route: "/interviews" },
      { name: "Series", route: "/series" },
      { name: "Documentaries", route: "/documentaries" },
      { name: "Resources", route: "/resources" },
      { name: "About", route: "/about" },
      { name: "Donate", route: "https://www.patreon.com/PoetryLA" },
      { name: "Search", route: "/search" },
    ];
};

export const renderNavItem = (item, pathname, openSearch) => {

  if (item.name === "Search") {
    return (
      <motion.li
        key={item.name}
        className="menu-item"
        variants={menuItemVariants}
      >
        <button className="radio-button" onClick={openSearch ? openSearch : null} aria-current={pathname === item.route ? "page" : undefined}>
          {item.name}
        </button>
      </motion.li>
    );
  }

  if (item.name === "Donate") {
    return (
      <motion.li
        key={item.name}
        className="menu-item"
        variants={menuItemVariants}
      >
        <a
          href={item.route}
          className="radio-button"
          target="_blank"
          rel="noreferrer"
        >
          {item.name}
        </a>
      </motion.li>
    );
  }
  return (
    <motion.li
      key={item.name}
      className="menu-item"
      variants={menuItemVariants}
    >
      <RadioButton
        label={item.name}
        ariaCurrent={pathname === item.route ? "page" : undefined}
        url={item.route}
      />
    </motion.li>
  );
};

export const Nav = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [activeItem, setActiveItem] = useState("");
  const [navOpen, setNavOpen] = useState(false);
  const [subNavOpen, setSubNavOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { navProps } = useNavContext();

  const searchDialogRef = useRef(null);
  const isMobile = useHamburgerMenu();

  const menu = getMenu(isMobile);

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
    if (isMobile && activeItem) {
      document.body.classList.add("has-active-subnav");
    } else {
      document.body.classList.remove("has-active-subnav");
    }
  }, [activeItem, isMobile]);

  const openSearch = () => {
    if (searchDialogRef.current) {
      searchDialogRef.current.showModal();
      searchDialogRef.current.querySelector('input[type="search"]').focus();
    }
  };

  const closeSearch = () => {
    if (searchDialogRef.current) {
      searchDialogRef.current.close();
    }
  };

  if (!mounted) {
    return (
      <nav className="nav loading grid">
        <div className="subgrid"></div>
      </nav>
    );
  }

  if (isMobile) {
    return (
      <>
        <Search ref={searchDialogRef} closeSearch={closeSearch} />
        <nav
          className={`nav grid${navOpen ? " open" : ""}${subNavOpen && activeItem ? " subnav-open" : ""
            }`}
          aria-labelledby="main navigation"
        >
          <div className="subgrid">
            <button className="logo-wrapper" onClick={() => setNavOpen(!navOpen)}>
              <PlusButton isActive={navOpen} />
              <Logo />
            </button>
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
        <AnimatePresence>
          {navOpen && (
            <motion.div
              className="nav nav__overlay grid"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={navVariants}
            >
              <div className="subgrid">
                <button
                  className="logo-wrapper"
                  onClick={() => setNavOpen(!navOpen)}
                >
                  <PlusButton isActive={navOpen} />
                  <Logo />
                </button>
                <ul className="menu">
                  {menu.map((item, index) => renderNavItem(item, pathname, openSearch))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  return (
    <>
      <Search ref={searchDialogRef} closeSearch={closeSearch} />
      <nav className="nav grid" aria-labelledby="main navigation">
        <div className="subgrid">
          <Link href="/">
            <Logo />
          </Link>

          <ul className="menu">
            {menu.map((item, index) => renderNavItem(item, pathname, openSearch))}
          </ul>
        </div>
      </nav>
    </>
  );
};
