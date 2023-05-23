import { IBookData } from "@/types/books";
import { GetServerSideProps, GetStaticProps } from "next";
import { useRouter } from "next/router";
import React from "react";

type Props = {
  data: IBookData;
};

const BookDetails = ({ data }: Props) => {
  const router = useRouter();
  console.log(data);
  return (
    <>
      <p>Showing details for &quot;{data.title}&quot;</p>
      <p>ISBN: {router.query.slug}</p>
    </>
  );
};

export default BookDetails;

export const getServerSideProps: GetServerSideProps = async (context) => {
  {
    const response = await fetch(
      `https://openlibrary.org/isbn/${context.params!.slug}.json`
    );
    const data: IBookData = await response.json();
    console.log(
      "fetching from",
      `https://openlibrary.org/isbn/${context.params!.slug}.json`
    );
    return {
      props: { data },
    };
  }
};
