import { useLoginMutation } from "@/features/api/apiSlice";
import { setCredentials } from "@/features/auth/authSlice";
import { RootState } from "@/store/store";
import { useRouter } from "next/router";
import React, { useState } from "react";
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

  const [formData, setFormData] = useState<ILoginFormData>({
    email: "ben@ben.com",
    password: "benben11",
  });

  const { email, password } = formData;

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
      const user: ILoginResponse = await login(formData).unwrap();
      dispatch(setCredentials(user));
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <section className="heading">
        <p>Login and start setting goals</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Enter password"
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Login;
