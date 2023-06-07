import BookCard from "@/components/BookCard";
import { useAddBookMutation, useGetBooksQuery } from "@/features/api/apiSlice";
import { isErrorWithMessage, isFetchBaseQueryError } from "@/services/helpers";
import { RootState } from "@/store/store";
import { IAddBookResponse } from "@/types/addBookResponse";
import { IUserBook } from "@/types/userBooks";
import React, { useEffect, useState } from "react";
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

  const isValidISBN = (isbn: string): boolean => {
    // Remove any dashes or spaces from the input string
    const cleanedISBN = isbn.replace(/[-\s]/g, "").replace(/x/g, "X");

    // Check if the cleaned string has a length of 10 or 13
    if (cleanedISBN.length !== 10 && cleanedISBN.length !== 13) {
      return false;
    }

    // Calculate the checksum based on the ISBN length
    let checksum = 0;
    if (cleanedISBN.length === 10) {
      for (let i = 0; i < 9; i++) {
        const digit = parseInt(cleanedISBN.charAt(i));
        if (isNaN(digit)) {
          return false;
        }
        checksum += digit * (10 - i);
      }

      const lastChar = cleanedISBN.charAt(9);
      if (lastChar !== "X" && isNaN(parseInt(lastChar))) {
        return false;
      }

      checksum += lastChar === "X" ? 10 : parseInt(lastChar);
      return checksum % 11 === 0;
    } else if (cleanedISBN.length === 13) {
      for (let i = 0; i < 12; i++) {
        const digit = parseInt(cleanedISBN.charAt(i));
        if (isNaN(digit)) {
          return false;
        }
        checksum += i % 2 === 0 ? digit : digit * 3;
      }

      const lastDigit = parseInt(cleanedISBN.charAt(12));
      if (isNaN(lastDigit)) {
        return false;
      }

      checksum += lastDigit;
      return checksum % 10 === 0;
    }

    return false;
  };

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

  const [filterText, setFilterText] = useState("");

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(e.target.value);
    console.log(filterText);
  };

  const displayBookCards = () => {
    if (!filterText) {
      return bookData?.map((book: IUserBook) => {
        return <BookCard key={book._id} book={book} />;
      });
    } else {
      const filterTextLowerCase = filterText.toLowerCase(); // Convert filterText to lowercase
      return bookData
        ?.filter((book) =>
          book.data.title.toLowerCase().includes(filterTextLowerCase)
        ) // Convert book title to lowercase
        .map((book: IUserBook) => {
          return <BookCard key={book._id} book={book} />;
        });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4 hidden sm:block">ShelfSpace</h1>
      <h2 className="text-2xl font-medium mb-8 hidden sm:block">
        Your Book Library
      </h2>

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
            className="w-full border border-gray-300 rounded py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-r-lg disabled:opacity-25"
            disabled={!isValidISBN(isbn)}
          >
            Add
          </button>
        </form>
        <br />
        <p>
          {bookTitle && errorMessage
            ? `Added new book: ${bookTitle}`
            : bookTitle}
        </p>
        {errorMessage && <p>Error: {errorMessage}</p>}
        {!isValidISBN(isbn) ? (
          <p>Please enter a valid 10 or 13 digit ISBN.</p>
        ) : (
          <p>Valid ISBN.</p>
        )}
      </div>
      <br />
      {/* <!-- Book Library Section --> */}
      <div className="mb-8">
        <span className="block sm:flex justify-between mb-8">
          <h3 className="text-xl font-semibold mb-4">Your Library</h3>
          <input
            type="text"
            value={filterText}
            placeholder="Filter books"
            onChange={handleFilterChange}
            className="border border-gray-300 rounded py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </span>

        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayBookCards()}
        </ul>
      </div>
    </div>
  );
};

export default Homepage;
