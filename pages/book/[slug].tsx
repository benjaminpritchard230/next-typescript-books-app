import {
  useDeleteBookMutation,
  useGetBookQuery,
  useGetBooksQuery,
  useUpdateBookMutation,
} from "@/features/api/apiSlice";
import { RootState } from "@/store/store";
import { IBookData } from "@/types/books";
import { GetServerSideProps, GetStaticProps } from "next";
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

  // const book = booksData.filter((book) => book._id === router.query.slug);
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
    // Here, you can perform any action with the note, such as sending it to a server or updating a state in your parent component.
    console.log("Note:", note);
    const updatedBook = {
      ...book,
      notes: note,
    };
    updateBook(updatedBook);
    setNote(""); // Clear the input field after submitting the note
  };

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
      {book.isRead ? "You have read this book" : "You haven't read this book"}
      {book.notes && <p>Your notes: {book.notes}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={note}
          onChange={handleChange}
          placeholder="Add a note..."
        />
        <button type="submit">Add</button>
      </form>
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

export default BookDetails;
