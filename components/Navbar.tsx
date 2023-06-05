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
  };
  const handleLogin = () => {
    router.push("/login");
  };

  const capitaliseString = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  return (
    <nav className="bg-gray-900 py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-white text-lg font-semibold">
            ShelfSpace
          </Link>

          <div className="flex">
            {!token ? (
              <>
                {" "}
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
                <p className="ml-4 px-2 py-1 text-gray-300 ">
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
