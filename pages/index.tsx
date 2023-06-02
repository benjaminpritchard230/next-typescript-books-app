import BookCard from "@/components/BookCard";
import { useAddBookMutation, useGetBooksQuery } from "@/features/api/apiSlice";
import { isErrorWithMessage, isFetchBaseQueryError } from "@/services/helpers";
import { RootState } from "@/store/store";
import { IAddBookResponse } from "@/types/addBookResponse";
import { IUserBook } from "@/types/userBooks";
import React, { useState } from "react";
import { useSelector } from "react-redux";

type Props = {};

export interface IAddBookFormData {
  isbn: string;
}

const Homepage = (props: Props) => {
  const auth = useSelector((state: RootState) => state.auth);

  const { data: bookData } = useGetBooksQuery();

  const [errorMessage, setErrorMessage] = useState("");

  const [addBook, { isLoading, error, isSuccess }] = useAddBookMutation();

  if (error) {
    console.log(error);
  }

  const [formData, setFormData] = useState<IAddBookFormData>({
    isbn: "",
  });

  const [bookTitle, setBookTitle] = useState("");

  const { isbn } = formData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    console.log(formData);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      const book: IAddBookResponse = await addBook(formData).unwrap();
      if (!error) {
        setBookTitle(book.data.title);
      }
      console.log(book);
    } catch (err) {
      if (isFetchBaseQueryError(err)) {
        // you can access all properties of `FetchBaseQueryError` here
        const errMsg =
          "error" in err ? err.error : JSON.stringify(err.data.message);
        console.log(errMsg, { variant: "error" });
        setErrorMessage(errMsg);
      } else if (isErrorWithMessage(err)) {
        // you can access a string 'message' property here
        console.log(err.message);
        setErrorMessage(err.message);
      }
    }
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">ShelfSpace</h1>
      <h2 className="text-2xl font-medium mb-8">Your Book Library</h2>

      {/* <!-- Book Library Section --> */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Your Library</h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {bookData?.map((book: IUserBook) => {
            return <BookCard key={book._id} book={book} />;
          })}
        </ul>
      </div>

      {/* <!-- Add Book Section --> */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Add a Book</h3>
        <form className="flex" onSubmit={handleSubmit}>
          <input
            type="text"
            id="isbn"
            name="isbn"
            value={isbn}
            placeholder="Enter ISBN"
            onChange={handleChange}
            className="w-full rounded-l-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-r-lg"
          >
            Add
          </button>
          <p>{bookTitle ? `Added new book: ${bookTitle}` : ""}</p>
          {errorMessage && <p>Error: {errorMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default Homepage;
