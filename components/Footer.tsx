import { clearCredentials } from "@/features/auth/authSlice";
import { RootState } from "@/store/store";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

// Footer is here

type Props = {};

const Footer = (props: Props) => {
  const { token } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(clearCredentials());
  };
  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <ul>
      <li>
        <Link href="/">Home</Link>
      </li>

      <li>
        <Link href="/register">Register</Link>
      </li>

      <li>
        <Link href="/add-book">Add book</Link>
      </li>
      <li>
        <Link href="/library">Library</Link>
      </li>
      <br />
      {token ? (
        <button
          onClick={() => {
            handleLogout();
          }}
        >
          Logout
        </button>
      ) : (
        <button
          onClick={() => {
            handleLogin();
          }}
        >
          Login
        </button>
      )}
    </ul>
  );
};

export default Footer;
