import { ISearchResponse } from "@/types/searchResponse";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

interface Props {
  data: ISearchResponse;
}

const SearchResults = ({ data }: Props) => {
  const router = useRouter();
  const searchText = router.query.searchText as string;
  return (
    <>
      <div>search text {searchText}</div>
      <ul>
        {data.docs.map((doc) => {
          return (
            <Link key={Math.random()} href={`/book/${doc.isbn}`}>
              <li>{doc.title}</li>
            </Link>
          );
        })}
      </ul>
    </>
  );
};

export default SearchResults;

export const getServerSideProps: GetServerSideProps = async (context) => {
  function convertString(input: string): string {
    return input.toLowerCase().replace(/\s/g, "+");
  }
  const searchText = convertString(context.query.searchText as string);
  const pageNumber = context.query.pageNumber ? context.query.pageNumber : 1;
  const res = await fetch(
    `https://openlibrary.org/search.json?q=${searchText}`
  );
  const data: ISearchResponse = await res.json();
  console.log(data);
  return {
    props: {
      data,
    },
  };
};
