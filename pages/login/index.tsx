import { useLoginMutation } from "@/features/api/apiSlice";
import { setCredentials } from "@/features/auth/authSlice";
import { IErrorResponse } from "@/pages/index";
import { isErrorWithMessage, isFetchBaseQueryError } from "@/services/helpers";
import { RootState } from "@/store/store";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

type Props = {};

export interface ILoginFormData {
  email: string;
  password: string;
}
export interface ILoginResponse {
  _id: string;
  name: string;
  email: string;
  token: string;
}

const Login = (props: Props) => {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  const [login, { isLoading, error }] = useLoginMutation();
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState<ILoginFormData>({
    email: "ben@ben.com",
    password: "benben11",
  });

  const { email, password } = formData;

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
      const user: ILoginResponse = await login(formData).unwrap();
      dispatch(setCredentials(user));
      router.push("/");
    } catch (err) {
      if (isFetchBaseQueryError(err)) {
        const fetchError = err as FetchBaseQueryError;
        const errMsg =
          "error" in fetchError
            ? fetchError.error
            : JSON.stringify((fetchError.data as IErrorResponse)?.message);
        setErrorMessage(errMsg);
      } else if (isErrorWithMessage(err)) {
        console.log(err.message);
        setErrorMessage(err.message);
      }
    }
  };

  return (
    <>
      <section className="bg-gray-200 p-4">
        <h1 className="flex items-center text-2xl">
          <FaUser className="mr-2" /> Login
        </h1>
        <p>Login to manage your library</p>
      </section>

      <section className="mt-4">
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="mb-4">
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded"
              id="password"
              name="password"
              value={password}
              placeholder="Enter password"
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <button
              type="submit"
              className="w-full p-2 bg-indigo-500 hover:bg-indigo-400 text-white rounded"
            >
              Submit
            </button>
            {errorMessage && <p>Error: {errorMessage}</p>}
          </div>
        </form>
      </section>
    </>
  );
};

export default Login;
