import { useAddBookMutation } from "@/features/api/apiSlice";
import { setCredentials } from "@/features/auth/authSlice";
import { isErrorWithMessage, isFetchBaseQueryError } from "@/services/helpers";
import { RootState } from "@/store/store";
import { IAddBookResponse } from "@/types/addBookResponse";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
type Props = {};

export interface IAddBookFormData {
  isbn: string;
}

const AddBook = (props: Props) => {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);

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

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    console.log(formData);
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      const book: IAddBookResponse = await addBook(formData).unwrap();
      if (isSuccess) {
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
    <>
      <section className="heading">
        <p>Add a new book to your library</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="isbn"
              name="isbn"
              value={isbn}
              placeholder="Enter ISBN"
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
          <p>{bookTitle ? `Added new book: ${bookTitle}` : ""}</p>
          {errorMessage && <p>{errorMessage}</p>}
        </form>
      </section>
    </>
  );
};

export default AddBook;
