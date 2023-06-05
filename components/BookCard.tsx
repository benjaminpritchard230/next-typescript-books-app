import {
  useDeleteBookMutation,
  useUpdateBookMutation,
} from "@/features/api/apiSlice";
import { IUserBook } from "@/types/userBooks";
import Link from "next/link";
import React, { useState } from "react";

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
