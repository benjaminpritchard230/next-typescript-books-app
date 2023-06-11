import { useRegisterMutation } from "@/features/api/apiSlice";
import { setCredentials } from "@/features/auth/authSlice";
import { isErrorWithMessage, isFetchBaseQueryError } from "@/services/helpers";
import { AppDispatch, RootState } from "@/store/store";
import { Router, useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

type Props = {};

export interface IRegisterFormData {
  name?: string;
  email: string;
  password: string;
  password2?: string;
}

export interface IRegisterResponse {
  _id: string;
  name: string;
  email: string;
  token: string;
}

const Register = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [formData, setFormData] = useState<IRegisterFormData>({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;
  const [errorMessage, setErrorMessage] = useState("");

  const [register] = useRegisterMutation();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(formData);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      setErrorMessage("Passwords don't match.");
    } else
      try {
        const user: IRegisterResponse = await register(formData).unwrap();
        dispatch(setCredentials(user));
        router.push("/");
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
      <section className="bg-gray-200 p-4">
        <h1 className="flex items-center text-2xl">
          <FaUser className="mr-2" /> Register
        </h1>
        <p>Create an account to begin your library</p>
      </section>
      <section className="mt-4">
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="mb-4">
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              id="name"
              name="name"
              value={name}
              onChange={onChange}
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Enter your password"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded"
              id="password2"
              name="password2"
              value={password2}
              onChange={onChange}
              placeholder="Confirm password"
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

export default Register;
