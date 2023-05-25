import { useDeleteBookMutation } from "@/features/api/apiSlice";
import { IUserBook } from "@/types/userBooks";
import Link from "next/link";
import React from "react";

type Props = {
  book: IUserBook;
};

const BookCard = ({ book }: Props) => {
  const [deleteBook] = useDeleteBookMutation();

  const handleDelete = () => {
    deleteBook({ id: book._id });
  };

  return (
    <>
      <Link key={book._id} href={`/book/${book.isbn}`}>
        <p>{book.title}</p>
      </Link>
      <button
        onClick={() => {
          handleDelete();
        }}
      >
        Remove from library
      </button>
      <button
        onClick={() => {
          //   handleMarkRead();
        }}
      >
        Mark book as read
      </button>
    </>
  );
};

export default BookCard;
