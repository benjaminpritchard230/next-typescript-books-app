import Link from "next/link";
import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <ul>
      <li>
        <Link href="/login">Login</Link>
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
    </ul>
  );
};

export default Footer;
