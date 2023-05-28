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

  const { data: booksData, error, isError } = useGetBooksQuery();

  // const book = booksData.filter((book) => book._id === router.query.slug);
  const id = router.query.slug;
  console.log(booksData!.filter((book) => book._id === id));
  const book = booksData!.filter((book) => book._id === id)[0];

  return (
    <>
      {book.data.title && (
        <p>Showing details for &quot;{book.data.title}&quot;</p>
      )}
      {book.data.isbn_10[0] && <p>ISBN: {book.data.isbn_10[0]}</p>}
      {book.data.isbn_13 && <p>ISBN: {book.data.isbn_13}</p>}

      {book.data.physical_format && <p>Format: {book.data.physical_format}</p>}
      {book.data.copyright_date && (
        <p>Copyright date: {book.data.copyright_date}</p>
      )}
      {book.data.publish_date && <p>Published: {book.data.publish_date}</p>}
      {book.data.publishers && <p>Publisher: {book.data.publishers}</p>}
      {book.data.description && <p>Description: {book.data.description}</p>}
      {book.data.covers}
    </>
  );
};

export default BookDetails;
