import React from "react";
import "./SearchUserPage.css";
import { useSelector, useDispatch } from "react-redux";
import { asyncGetUsers } from "../../store/Actions/searchActions";
import { clearSearch } from "../../store/Reducers/searchReducer";
import { useState } from "react";
import { useEffect } from "react";

const SearchUserPage = () => {
  const { results, query } = useSelector((state) => state.searchReducer);
  const [squery, setQuery] = useState(query || "");
  const dispatch = useDispatch();

  // 🔹 Debounce setup
  useEffect(() => {
    const handler = setTimeout(() => {
      if (squery.trim()) {
        dispatch(asyncGetUsers(squery));
      } else {
        dispatch(clearSearch()); // Agar input empty hai toh results clear ho jayein
      }
    }, 500); // 👈 500ms delay

    return () => {
      clearTimeout(handler);
    };
  }, [squery, dispatch]);

  useEffect(() => {
    if (results) {
      console.log("Search Results:", results);
    }
  }, [results]);

  const clearSearchHandler = () => {
    dispatch(clearSearch());
    setQuery("");
  };

  return (
    <div className="search-user-page">
      {/* Search bar */}
      <div className="search-bar">
        <div className="search-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
            <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
          </svg>
        </div>
        {/* 🔹 Input */}
        <input
          type="text"
          placeholder="Search"
          value={squery}
          onChange={(e) => setQuery(e.target.value)}
        />

        {/* 🔹 Clear Button */}
        {squery && (
          <button
            className="clear-btn"
            onClick={clearSearchHandler}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
              <path d="M165.66,101.66,139.31,128l26.35,26.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35a8,8,0,0,1,11.32,11.32ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path>
            </svg>
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="tabs">
        <a href="#"  className="active">Top</a>
        <a href="#">Users</a>
      </div>

      {/* User grid */}
      <div className="user-grid">
        {results?.map((user, i) => (
          <div key={i} className="user-card" style={{ backgroundImage: `url(${user.avatarUrl})` }}></div>
        ))}
      </div>
    </div>
  );
};

export default SearchUserPage;
