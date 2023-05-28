import {
  useDeleteBookMutation,
  useUpdateBookMutation,
} from "@/features/api/apiSlice";
import { IUserBook } from "@/types/userBooks";
import Link from "next/link";
import React from "react";

type Props = {
  book: IUserBook;
};

const BookCard = ({ book }: Props) => {
  const [deleteBook] = useDeleteBookMutation();
  const [updateBook] = useUpdateBookMutation();

  const handleDelete = () => {
    deleteBook({ id: book._id });
  };

  const handleMarkRead = () => {
    const updatedBook = {
      ...book,
      isRead: !book.isRead,
    };
    updateBook(updatedBook);
  };

  const data = book.data;

  return (
    <>
      <Link key={book._id} href={`/book/${book._id}`}>
        <p>{data.title}</p>
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
          handleMarkRead();
        }}
      >
        {book.isRead ? "Mark book as unread" : "Mark book as read"}
      </button>
    </>
  );
};

export default BookCard;
