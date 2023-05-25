import { useGetBookQuery } from "@/features/api/apiSlice";
import { RootState } from "@/store/store";
import { IBookData } from "@/types/books";
import { GetServerSideProps, GetStaticProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";

type Props = {
  data: IBookData;
};

const BookDetails = ({ data }: Props) => {
  const router = useRouter();
  const auth = useSelector((state: RootState) => state.auth);

  const {
    data: bookData,
    error,
    isError,
  } = useGetBookQuery({ isbn: router.query.slug });

  console.log(data);
  if (!error) {
    console.log(bookData);
  }

  return (
    <>
      <p>Showing details for &quot;{data.title}&quot;</p>
      <p>ISBN: {router.query.slug}</p>
      <p>
        {error
          ? "You have not added this book to your library."
          : "This book is in your library."}
      </p>
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

    return {
      props: { data },
    };
  }
};
