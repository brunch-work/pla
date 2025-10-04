"use client";

import { forwardRef, useEffect, useRef, useState, useMemo } from "react";
import { fetchGraphQL } from '../utils/client';
import { menuVariants, menuItemVariants } from "@/motion/menus";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "next-view-transitions";
import { Logo } from "./Logo";
import { useMobile } from "../hooks/useMobile";
import { getMenu, renderNavItem } from './Nav';
import { GET_SEARCH } from '../gql/queries';

export const Search = forwardRef(function Search(props, ref) {
    const searchInputRef = useRef(null);
    const [searchVal, setSearchVal] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [searchResults, setSearchResults] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const isMobile = useMobile();
    const menu = getMenu(isMobile);
    const pathname = '/search'; // I'm cheating. sue me.

    const fetchSearchResults = useMemo(() => {
        return async (term) => {
            try {
                const result = await fetchGraphQL(GET_SEARCH, { searchTerm: term });
                return result;
            } catch (error) {
                console.error('GraphQL error:', error);
            }
        };
    }, []);

    useEffect(() => {
        const dialog = ref?.current;
        if (!dialog) return;

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'open') {
                    setIsOpen(dialog.hasAttribute('open'));
                }
            });
        });

        observer.observe(dialog, { attributes: true });

        // Check initial state
        setIsOpen(dialog.hasAttribute('open'));

        return () => observer.disconnect();
    }, [ref]);

    useEffect(() => {
        if (isOpen) {
            document.documentElement.style.overflow = "hidden";
        } else {
            document.documentElement.style.overflow = "auto";
        }
    }, [isOpen]);

    useEffect(() => {
        if (searchVal.length > 2) {
            setIsLoading(true);
            fetchSearchResults(searchVal).then(data => {
                setSearchResults(data.youtubeVideoCollection);
                setIsLoading(false);
            });
        } if (searchVal.length === 0) {
            setSearchResults(null);
        }
    }, [searchVal]);

    const handleSearchChange = (e) => {
        setSearchVal(e.target.value);
    }

    const handleDialogClose = () => {
        document.querySelector('.search-dialog').close();
    }

    return <dialog ref={ref} className="search-dialog" closedby="any">
        <nav className="nav grid" aria-labelledby="main navigation">
            <div className="subgrid">
                <button onClick={handleDialogClose} className="logo-wrapper">
                    <Logo />
                </button>
                {isMobile ?
                    <ul className="menu">
                        {renderNavItem({ name: "Search", route: "/search" }, pathname)}
                    </ul>
                    : <ul className="menu">
                        {menu.map((item, index) => renderNavItem(item, pathname))}
                    </ul>}
            </div>
        </nav>
        <search>
            <form name='search--form' className='search--form' action="">
                <input type="search"
                    name="search--input"
                    className='search--input'
                    placeholder='Search'
                    value={searchVal}
                    onChange={handleSearchChange}
                    ref={searchInputRef}
                    onKeyDown={(e) => { e.key === "Enter" && e.target.blur() && e.preventDefault() }} />
            </form>
        </search>
        <section className="search-results">
            {isLoading ? (
                <p className="search-loading">Searching...</p>
            ) : searchResults && searchResults.items ? (
                searchResults.items.length > 0 ? (
                    <AnimatePresence>
                        <motion.ul variants={menuVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            className="search-results-list">
                            {searchResults.items.map((item) => (
                                <motion.li variants={menuItemVariants} key={item._id} className="search-results-item">
                                    <a href={item.videoUrl} target="_blank" rel="noopener noreferrer">
                                        <img
                                            src={item.thumbnail?.url}
                                            alt={item.thumbnail?.description || item.title}
                                        />
                                        <div>
                                            <span className="search-results-title">{item.title}</span>
                                            <div className="search-results-description">
                                                {item.description}
                                            </div>
                                        </div>
                                    </a>
                                </motion.li>
                            ))}
                        </motion.ul>
                    </AnimatePresence>
                ) : (
                    <motion.p initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={menuItemVariants}
                        className="search-no-results">No results found.</motion.p>
                )
            ) : null}
        </section>
    </dialog>;
});

