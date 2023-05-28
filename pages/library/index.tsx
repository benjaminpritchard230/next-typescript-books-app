import BookCard from "@/components/BookCard";
import { useGetBooksQuery } from "@/features/api/apiSlice";
import { RootState } from "@/store/store";
import { IUserBook } from "@/types/userBooks";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

type Props = {};

const Library = (props: Props) => {
  const auth = useSelector((state: RootState) => state.auth);

  const { data: bookData, error, isError } = useGetBooksQuery();

  if (bookData) {
    console.log(bookData);
  }

  return (
    <>
      <h3>My library</h3>

      <ul>
        {bookData?.map((book: IUserBook) => {
          return <BookCard key={book._id} book={book} />;
        })}
      </ul>
    </>
  );
};

export default Library;
