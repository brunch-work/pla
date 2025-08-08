'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useMobile } from "../hooks/useMobile";

import { Logo } from "./Logo";
import { RadioButton } from "./RadioButton";
import { PlusButton } from "./PlusButton";

const menu = [
  {name: "Home", route: "/"},
  {name: "Poets", route: "/poets"},
  {name: "Interviews", route: "/interviews"},
  {name: "Series", route: "/series"},
  {name: "Documentaries", route: "/documentaries"},
  {name: "Resources", route: "/resources"},
  {name: "About", route: "/about"},
  {name: "Donate", route: "/donate"},
  {name: "Search", route: "/search"},
]

export const Nav = () => {
  const route = usePathname();
  const [navOpen, setNavOpen] = useState(false);

  const isMobile = useMobile();

  if (isMobile) {
    return (
      <nav className={`nav grid${navOpen ? " open" : ""}`}>
        <div className="subgrid">
        <div className="logo-wrapper" onClick={() => setNavOpen(!navOpen)}>
          <PlusButton isActive={navOpen} />
          <Logo />
        </div>
        {navOpen && (
          <ul className="menu">
            {menu.map((item, index) => (
              <li key={index} className="menu-item">
                <Link href={item.route}>
                  <RadioButton active={route === item.route} label={item.name} />
                </Link>
              </li>
            ))}
          </ul>
        )}
        </div>
      </nav>
    );
  }


  return (
    <nav className="nav grid">
      <div className="subgrid">
        <Link href="/">
          <Logo />
        </Link>

        <ul className="menu">
          {menu.map((item, index) => (
            <li key={index} className="menu-item">
              <Link href={item.route}>
                <RadioButton active={route === item.route} label={item.name} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}