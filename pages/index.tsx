import BookCard from "@/components/BookCard";
import { useAddBookMutation, useGetBooksQuery } from "@/features/api/apiSlice";
import bookPhoto from "@/public/bookPhoto.jpg";
import { isErrorWithMessage, isFetchBaseQueryError } from "@/services/helpers";
import { RootState } from "@/store/store";
import { IAddBookResponse } from "@/types/addBookResponse";
import { IUserBook } from "@/types/userBooks";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import Link from "next/link";
import React, { useState } from "react";
import { useSelector } from "react-redux";

type Props = {};

export interface IAddBookFormData {
  isbn: string;
}

export interface IErrorResponse {
  message: string;
}

const Homepage = (props: Props) => {
  const { token } = useSelector((state: RootState) => state.auth);

  const { data: bookData } = useGetBooksQuery();

  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState<IAddBookFormData>({
    isbn: "",
  });

  const [bookTitle, setBookTitle] = useState("");

  const [addBook, { isLoading, error }] = useAddBookMutation();

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
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setBookTitle("");
    try {
      const book: IAddBookResponse = await addBook(formData).unwrap();
      if (!error) {
        setBookTitle(book.data.title);
      }
    } catch (err) {
      if (isFetchBaseQueryError(err)) {
        const fetchError = err as FetchBaseQueryError;
        const errMsg =
          "error" in fetchError
            ? fetchError.error
            : JSON.stringify((fetchError.data as IErrorResponse)?.message);
        setErrorMessage(errMsg);
      } else if (isErrorWithMessage(err)) {
        setErrorMessage(err.message);
      }
    }
  };

  const [filterText, setFilterText] = useState("");

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(e.target.value);
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
      {/* Hero section */}
      <section
        className={`${
          token ? "hidden" : ""
        } px-6 py-12 text-center md:px-12 lg:text-left text-gray-900`}
      >
        <div className="w-100 mx-auto sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl xl:px-32">
          <div className="grid items-center lg:grid-cols-2">
            <div className="mb-12 md:mt-12 lg:mt-0 lg:mb-0">
              <div className="block rounded-lg sm:px-6 py-12 ">
                <div className="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-14 h-16"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                    />
                  </svg>
                  <h1 className="mt-2 mb-5 text-4xl font-bold tracking-tight md:text-5xl xl:text-6xl">
                    ShelfSpace
                  </h1>
                </div>

                <h2 className="mt-2 mb-7 text-2xl font-bold tracking-tight md:text-2xl xl:text-3xl">
                  Keep track of your library
                </h2>
                <div className="flex justify-center lg:justify-start">
                  {" "}
                  <Link
                    href="/about"
                    className="text-white  font-semibold bg-indigo-500 hover:bg-indigo-400  rounded  px-5 py-4 mr-3 justify-center inline-flex items-center w-1/2	 "
                  >
                    About
                  </Link>
                  <Link
                    href="/register"
                    className="text-white font-semibold bg-indigo-500 hover:bg-indigo-400  rounded  px-5 py-4 justify-center inline-flex items-center w-1/2	 "
                  >
                    Get started
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 ml-2 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </Link>
                </div>

                <p className="mt-2">
                  Already a member?
                  <Link href="/login">
                    <span className="underline hover:text-gray-500 ml-1 cursor-pointer">
                      Login
                    </span>
                  </Link>
                </p>
              </div>
            </div>
            <div className="md:mb-12 lg:mb-0">
              <img
                src={bookPhoto.src}
                className="w-full hidden lg:block rounded-lg shadow-lg dark:shadow-black/20"
                alt="A cosy library with a lamp"
              />
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Add Book Section --> */}
      <section className={`${!token ? "hidden" : ""}`}>
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
            className="bg-indigo-500 hover:bg-indigo-400 text-white py-2 px-5 rounded-r-lg disabled:opacity-25"
            style={{ minWidth: "87px", minHeight: "52px" }}
            disabled={!isValidISBN(isbn)}
          >
            {isLoading ? (
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="inline w-5 h-5 animate-spin text-gray-600  fill-white"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              </div>
            ) : (
              "Add"
            )}
          </button>
        </form>
        <br />

        {!isValidISBN(isbn) ? (
          <p>Please enter a valid 10 or 13 digit ISBN.</p>
        ) : (
          <p>Valid ISBN.</p>
        )}
        {bookTitle ? (
          <p className="leading-tight">Added book: {bookTitle}</p>
        ) : (
          <p className="leading-tight">&nbsp;</p>
        )}

        {errorMessage ? (
          <p className="leading-tight">Error: {errorMessage}</p>
        ) : (
          <p className="leading-tight">&nbsp;</p>
        )}
      </section>
      <br />
      {/* <!-- Book Library Section --> */}
      <section className={`mb-8  ${!token ? "hidden" : ""}`}>
        <span className="block sm:flex justify-between mb-8">
          <h3 className="text-xl font-semibold mb-4">Your Library</h3>

          <div className="relative">
            <input
              type="text"
              value={filterText}
              placeholder="Filter books"
              onChange={handleFilterChange}
              className="border border-gray-300 rounded py-2 px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {filterText && (
              <button
                type="button"
                className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
                onClick={() => setFilterText("")}
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
            )}
          </div>
        </span>

        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayBookCards()}
        </ul>
      </section>
    </div>
  );
};

export default Homepage;
