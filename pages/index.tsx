import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

type Props = {};

const Homepage = (props: Props) => {
  const [searchText, setSearchText] = useState("");

  const router = useRouter();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (searchText) {
      router.push(`/search?searchText=${searchText}`);
    }
  };
  return (
    <>
      <div>
        <h2>Search for books by title</h2>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className={"input-container"}>
            <input
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
            />
            <button className="button" type="submit">
              Search
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Homepage;
