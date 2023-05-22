import { useAddBookMutation } from "@/features/api/apiSlice";
import { setCredentials } from "@/features/auth/authSlice";
import { RootState } from "@/store/store";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

type Props = {};

const AddBook = (props: Props) => {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);

  const [addBook] = useAddBookMutation();

  const [formData, setFormData] = useState({
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
      const book = await addBook(formData).unwrap();
      setBookTitle(book.title);
      console.log(book);
    } catch (err) {
      console.log(err);
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
        </form>
      </section>
    </>
  );
};

export default AddBook;
