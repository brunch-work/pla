"use client";

import { forwardRef, useRef, useState } from "react";
import { fetchGraphQL } from '../utils/client';
import { GET_SEARCH } from '../gql/queries';

export const Search = forwardRef(function Search(props, ref) {
    const searchInputRef = useRef(null);
    const [searchVal, setSearchVal] = useState('night');

    fetchGraphQL(GET_SEARCH, { searchTerm: searchVal })
        .then(result => console.log('GraphQL result:', result))
        .catch(error => console.error('GraphQL error:', error));

    const handleSearchChange = (e) => {
        setSearchVal(e.target.value);
    }

    return <dialog ref={ref} className="search-dialog">
        <button onClick={props.closeSearch}>[x]</button>
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
    </dialog>;
});
