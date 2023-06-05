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
    <footer
      className="bg-gray-900
    text-3xl text-white text-center
    fixed
    inset-x-0
    bottom-0
    p-1
    hidden
    md:flex
    "
    >
      <div className="container mx-auto px-4">
        <ul className="flex flex-wrap items-center justify-between">
          <li className="text-gray-300 text-sm px-2 py-1">
            Ben Pritchard 2023
          </li>
          <li className="text-gray-300 text-sm px-2 py-1">
            <a
              href="https://openlibrary.org/"
              className="hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              Powered by Open Library
            </a>
          </li>
          <li className="text-gray-300 text-sm px-2 py-1">
            <a
              href="https://github.com/benjaminpritchard230/next-typescript-books-app"
              className="hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
