import {
  useDeleteBookMutation,
  useGetBooksQuery,
  useUpdateBookMutation,
} from "@/features/api/apiSlice";
import { RootState } from "@/store/store";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useSelector } from "react-redux";

type Props = {};

const BookDetails = (props: Props) => {
  const router = useRouter();
  const auth = useSelector((state: RootState) => state.auth);

  const { data: booksData, error, isError } = useGetBooksQuery();

  const [deleteBook] = useDeleteBookMutation();
  const [updateBook] = useUpdateBookMutation();

  const id = router.query.slug;
  const book = booksData!.filter((book) => book._id === id)[0];

  const [note, setNote] = useState("");

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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNote(event.target.value);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const updatedBook = {
      ...book,
      notes: note,
    };
    updateBook(updatedBook);
    setNote("");
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      {book.data.title && (
        <p className="text-xl font-bold mb-4">
          Showing details for &quot;{book.data.title}&quot;
        </p>
      )}
      {book.data.isbn_10[0] && <p>ISBN-10: {book.data.isbn_10[0]}</p>}
      {book.data.isbn_13 && <p>ISBN-13: {book.data.isbn_13}</p>}

      {book.data.physical_format && <p>Format: {book.data.physical_format}</p>}
      {book.data.copyright_date && (
        <p>Copyright date: {book.data.copyright_date}</p>
      )}
      {book.data.publish_date && <p>Published: {book.data.publish_date}</p>}
      {book.data.publishers && <p>Publisher: {book.data.publishers}</p>}
      {book.data.description && <p>Description: {book.data.description}</p>}
      <p className="mb-2">
        {book.isRead ? "You have read this book" : "You haven't read this book"}
      </p>
      {book.notes && <p>Your notes: {book.notes}</p>}
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={note}
          onChange={handleChange}
          placeholder="Add a note..."
          className="border border-gray-300 rounded p-2 mr-2 focus:outline-none focus:ring focus:border-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500"
        >
          Add
        </button>
      </form>
      <button
        onClick={handleDelete}
        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:ring focus:border-red-500"
      >
        Remove from library
      </button>
      <button
        onClick={handleMarkRead}
        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:ring focus:border-green-500 ml-2"
      >
        {book.isRead ? "Mark book as unread" : "Mark book as read"}
      </button>
    </div>
  );
};

export default BookDetails;
