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
      {book.data.isbn_10[0] && (
        <p className="mb-2">
          <span className="font-semibold">ISBN-10:</span> {book.data.isbn_10[0]}
        </p>
      )}
      {book.data.isbn_13 && (
        <p className="mb-2">
          <span className="font-semibold">ISBN-13:</span> {book.data.isbn_13}
        </p>
      )}

      {book.data.physical_format && (
        <p className="mb-2">
          <span className="font-semibold">Format:</span>{" "}
          {book.data.physical_format}
        </p>
      )}
      {book.data.copyright_date && (
        <p className="mb-2">
          <span className="font-semibold">Copyright date:</span>{" "}
          {book.data.copyright_date}
        </p>
      )}
      {book.data.publish_date && (
        <p className="mb-2">
          <span className="font-semibold">Published:</span>{" "}
          {book.data.publish_date}
        </p>
      )}
      {book.data.publishers && (
        <p className="mb-2">
          <span className="font-semibold">Publisher:</span>{" "}
          {book.data.publishers}
        </p>
      )}
      {book.data.description && (
        <p className="mb-2">
          <span className="font-semibold">Description:</span>{" "}
          {book.data.description}
        </p>
      )}
      <br />
      <div
        className={`${
          book.notes ? "bg-gray-100 p-4 rounded-lg shadow-md" : ""
        }`}
      >
        {book.notes && (
          <p className="text-gray-800">
            <span className="font-semibold">Your notes:</span> {book.notes}
          </p>
        )}
      </div>
      <br />
      <form onSubmit={handleSubmit} className="mb-4 flex">
        <input
          type="text"
          value={note}
          onChange={handleChange}
          placeholder="Add a note..."
          className="w-full border border-gray-300 rounded py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="bg-indigo-500 hover:bg-indigo-400 text-white py-2 px-4 rounded-r-lg"
        >
          Add
        </button>
      </form>
      <button
        onClick={handleDelete}
        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:ring focus:border-red-500"
      >
        Remove book
      </button>
      <button
        onClick={handleMarkRead}
        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:ring focus:border-green-500 ml-2"
      >
        {book.isRead ? "Mark unread" : "Mark read"}
      </button>
    </div>
  );
};

export default BookDetails;
