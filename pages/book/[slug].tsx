import { useGetBookQuery, useGetBooksQuery } from "@/features/api/apiSlice";
import { RootState } from "@/store/store";
import { IBookData } from "@/types/books";
import { GetServerSideProps, GetStaticProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";

type Props = {};

const BookDetails = (props: Props) => {
  const router = useRouter();
  const auth = useSelector((state: RootState) => state.auth);

  const { data: booksData, error, isError } = useGetBooksQuery({});

  // const book = booksData.filter((book) => book._id === router.query.slug);
  const id = router.query.slug;
  console.log(booksData!.filter((book) => book._id === id));
  const book = booksData!.filter((book) => book._id === id);

  return (
    <>
      {/* <p>Showing details for &quot;{book.title}&quot;</p> */}
      <p>ISBN: {book[0].data.isbn_13 || book[0].data.isbn_10}</p>
      <p>
        {error
          ? "You have not added this book to your library."
          : "This book is in your library."}
      </p>
    </>
  );
};

export default BookDetails;
