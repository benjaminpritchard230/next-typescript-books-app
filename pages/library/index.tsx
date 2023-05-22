import { useGetBooksQuery } from "@/features/api/apiSlice";
import { RootState } from "@/store/store";
import React from "react";
import { useSelector } from "react-redux";

type Props = {};

interface IBook {
  isRead: boolean;
  _id: string;
  user: string;
  isbn: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  title?: string;
}

const Library = (props: Props) => {
  const auth = useSelector((state: RootState) => state.auth);

  const { data: bookData, error, isError } = useGetBooksQuery({});

  if (bookData) {
    console.log(bookData);
  }

  return (
    <>
      <h3>My library</h3>

      <ul>
        {bookData?.map((book: IBook) => {
          return <li key={book._id}>{book.title}</li>;
        })}
      </ul>
    </>
  );
};

export default Library;
