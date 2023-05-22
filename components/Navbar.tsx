import { RootState } from "@/store/store";
import React from "react";
import { useSelector } from "react-redux";

type Props = {};

const Navbar = (props: Props) => {
  const { name, token, email } = useSelector((state: RootState) => state.auth);

  return (
    <nav>
      <ul>
        <li>
          {name
            ? `Logged in as ${name} with email ${email} and token ${token}`
            : "Not logged in"}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
