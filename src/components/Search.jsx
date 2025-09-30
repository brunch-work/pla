"use client";

import { forwardRef, useEffect, useRef, useState, useMemo } from "react";
import { fetchGraphQL } from '../utils/client';
import { GET_SEARCH } from '../gql/queries';

export const Search = forwardRef(function Search(props, ref) {
    const searchInputRef = useRef(null);
    const [searchVal, setSearchVal] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [searchResults, setSearchResults] = useState(null);

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

    return <dialog ref={ref} className="search-dialog" closedby="any">
        {/*<button onClick={props.closeSearch}>[x]</button>*/}
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
                <p className="search-loading">Searchgin...</p>
            ) : searchResults && searchResults.items ? (
                searchResults.items.length > 0 ? (
                    <ul className="search-results-list">
                        {searchResults.items.map((item) => (
                            <li key={item._id} className="search-results-item">
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
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="search-no-results">No results found.</p>
                )
            ) : null}
        </section>
    </dialog>;
});

