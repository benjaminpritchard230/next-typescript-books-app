import {
  useDeleteBookMutation,
  useUpdateBookMutation,
} from "@/features/api/apiSlice";
import { IUserBook } from "@/types/userBooks";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineCheckSquare, AiOutlineCloseSquare } from "react-icons/ai";

type Props = {
  book: IUserBook;
};

const BookCard = ({ book }: Props) => {
  const [deleteBook] = useDeleteBookMutation();
  const [updateBook] = useUpdateBookMutation();
  const [imageError, setImageError] = useState(false);

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

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <>
      <li className="bg-white rounded-lg p-4 shadow-md">
        <div className="flex justify-end mb-3">
          {" "}
          <button
            onClick={() => {
              handleDelete();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 text-gray-900 hover:text-red-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
          <button
            className="ml-1"
            onClick={() => {
              handleMarkRead();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 text-gray-900 hover:text-green-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>

        <Link key={book._id} href={`/book/${book._id}`}>
          <div className="flex flex-col items-center">
            <img
              className={`bg-gray-200 h-56 w-40 rounded-lg mb-4 ${
                imageError ? "hidden" : ""
              }`}
              src={`https://covers.openlibrary.org/b/isbn/${book.isbn}.jpg`}
              alt=""
              onError={handleImageError}
            />
            {imageError && (
              <div className="bg-gray-200 h-56 w-40 rounded-lg mb-4 flex justify-center items-center">
                Placeholder
              </div>
            )}
            <h4 className={`text-lg font-semibold mb-2`}>
              {data.title} {book.isRead ? "✓" : ""}
            </h4>
          </div>
        </Link>
      </li>
    </>
  );
};

export default BookCard;
