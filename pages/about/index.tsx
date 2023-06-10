import expressImage from "@/public/about-images/express.png";
import nextImage from "@/public/about-images/next.png";
import tailwindImage from "@/public/about-images/tailwind.png";
import typescriptImage from "@/public/about-images/typescript.svg";
import React from "react";

type Props = {};

const About = (props: Props) => {
  return (
    <div className="bg-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">About</h1>

        <p className="text-gray-800 mb-4">
          ShelfSpace is a powerful web application built using Next.js,
          TypeScript, Tailwind CSS, and Express.js. With its intuitive interface
          and seamless integration with the Open Library API, ShelfSpace allows
          users to effortlessly build and organize their digital book libraries.
          By simply entering an ISBN-10 or ISBN-13, users can quickly fetch book
          information and add books to their collection. Additionally,
          ShelfSpace provides convenient features such as the ability to mark
          books as read and add personal notes for each book. With its efficient
          filtering capabilities and easy-to-use functionalities, ShelfSpace is
          the go-to platform for book enthusiasts looking to manage their
          digital libraries effectively.
        </p>

        <p>
          ShelfSpace offers a range of impressive features that make book
          management a breeze. Users can easily add books to their libraries by
          entering the book&apos;s ISBN-10 or ISBN-13. Leveraging the power of
          the Open Library API, ShelfSpace fetches comprehensive book
          information, ensuring that users have all the essential details at
          their fingertips. To track their reading progress, users can mark
          books as read and even add personal notes, enabling them to maintain a
          personalized reading journal. The application also includes a
          filtering functionality, allowing users to search for specific books
          within their library based on title. With ShelfSpace, organizing and
          accessing your digital book collection has never been more convenient.
        </p>
        <br />
        {/* <!-- Links --> */}
        <section>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="inline w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
            />
          </svg>
          <a
            href="https://github.com/benjaminpritchard230/next-typescript-books-app"
            className="text-blue-500 hover:underline mb-2"
          >
            Link to front-end repository
          </a>
          <br />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="inline w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
            />
          </svg>
          <a
            href="https://github.com/benjaminpritchard230/next-typescript-books-app"
            className="text-blue-500 hover:underline mb-4"
          >
            Link to back-end repository
          </a>
        </section>
        <br />
        {/* <!-- Images --> */}
        <section className="my-3">
          <h2 className="text-2xl font-bold mb-4">Built using</h2>
          <div className="flex items-center justify-center space-x-4">
            <div className="grid grid-cols-2 gap-2 		">
              <div className="flex ">
                <img
                  className="h-auto max-w-full rounded-lg"
                  src={expressImage.src}
                  alt=""
                />
              </div>
              <div className="flex">
                <img
                  className="h-auto max-w-full rounded-lg"
                  src={nextImage.src}
                  alt=""
                />
              </div>
              <div className="flex ">
                <img
                  className="h-auto max-w-full rounded-lg"
                  src={tailwindImage.src}
                  alt=""
                />
              </div>
              <div className="flex ">
                <img
                  className="h-auto max-w-full rounded-lg"
                  src={typescriptImage.src}
                  alt=""
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
