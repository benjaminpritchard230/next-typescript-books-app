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
      <li className="bg-white rounded-lg p-4 shadow-md">
        <Link key={book._id} href={`/book/${book._id}`}>
          <h4 className="text-lg font-semibold mb-2">{data.title}</h4>
          {/* <p className="text-gray-600 mb-2">Author Name</p> */}
          <p className="text-gray-600">{data.isbn_13}</p>
        </Link>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            handleDelete();
          }}
        >
          Remove from library
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            handleMarkRead();
          }}
        >
          {book.isRead ? "Mark book as unread" : "Mark book as read"}
        </button>
      </li>{" "}
    </>
  );
};

export default BookCard;
