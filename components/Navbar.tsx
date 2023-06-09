import { booksApi } from "@/features/api/apiSlice";
import { clearCredentials } from "@/features/auth/authSlice";
import { RootState } from "@/store/store";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

type Props = {};

const Navbar = (props: Props) => {
  const { name, token, email } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(clearCredentials());
    dispatch(booksApi.util.resetApiState());
    router.push("/");
  };

  const capitaliseString = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <nav className="bg-gray-900 py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex text-white text-lg font-semibold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                />
              </svg>
              <span className="ml-1 hidden sm:flex ">ShelfSpace</span>
            </Link>
          </div>

          <div className="flex">
            {!token ? (
              <>
                <Link
                  href="/login"
                  className="ml-4 px-2 py-1 text-gray-300 hover:text-white"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="ml-4 px-2 py-1 text-gray-300 hover:text-white"
                >
                  Register
                </Link>
              </>
            ) : null}
            {token ? (
              <>
                <a
                  onClick={() => {
                    handleLogout();
                    router.push("/");
                  }}
                  className="ml-4 px-2 py-1 text-gray-300 hover:text-white cursor-pointer"
                >
                  Logout
                </a>
                <p className="ml-4 px-2 py-1 text-gray-300">
                  {capitaliseString(name)}
                </p>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
