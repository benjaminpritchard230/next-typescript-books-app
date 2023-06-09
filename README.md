# ShelfSpace

ShelfSpace is a web application built with Next.js, TypeScript, Tailwind CSS, and Express.js. It allows users to add books to their library by providing either an ISBN-10 or ISBN-13. The application utilizes the Open Library API to retrieve book information. Users can mark books as read and add notes for each book.

## Features

- Add books to your library by entering an ISBN-10 or ISBN-13.
- Fetch book information from the Open Library API.
- Mark books as read and keep track of your reading progress.
- Add personal notes for each book.
- Filter books in your library by title.

## Prerequisites

Make sure you have the following installed before running the application:

- Node.js (version 14 or later)
- npm (version 7 or later)

## Getting Started

Follow the steps below to set up and run the ShelfSpace application:

1. Clone the repository:
```
git clone https://github.com/your-username/shelfspace.git
```



2. Navigate to the project directory:
```
cd shelfspace
```

3. Install the dependencies:
```
npm install
```

4. Start the development server:
```
npm run dev
```

5. Open your browser and visit [http://localhost:3000](http://localhost:3000) to access the ShelfSpace application.

## Usage

### Adding a Book

- Enter an ISBN-10 or ISBN-13 in the input field on the homepage.
- Click the "Add" button to add the book to your library.
- If the ISBN is valid and the book is successfully added, the book title will be displayed below the input field.
- If there is an error during the book addition process, an error message will be displayed.

### Filtering Books

- Enter a search term in the filter input field at the top of the library section.
- The book library will be filtered based on the entered search term, displaying only the books whose titles contain the search term.

## Folder Structure

The main files and directories in the project are organized as follows:

- `pages`: Contains the Next.js pages for the application, including the homepage.
- `components`: Contains reusable React components used in the application, such as `BookCard`.
- `features/api`: Contains the API slice generated by the `@reduxjs/toolkit` package, including the `apiSlice` and `thunks` for making API requests.
- `services`: Contains helper functions and utility files for making API requests and handling errors.
- `store`: Contains the Redux store configuration and slice reducers.

## Technologies Used

- [Next.js](https://nextjs.org): A React framework for server-side rendering (SSR) and static site generation (SSG).
- [TypeScript](https://www.typescriptlang.org): A typed superset of JavaScript that compiles to plain JavaScript.
- [Tailwind CSS](https://tailwindcss.com): A utility-first CSS framework for quickly building custom designs.
- [Express.js](https://expressjs.com): A web application framework for Node.js used as the backend server.
- [Open Library API](https://openlibrary.org/developers/api): An open API for accessing book information.

## Contributing

Contributions to ShelfSpace are welcome! If you find a bug or want to add a new feature, please open an issue or submit a pull request on the project's GitHub repository.

## License

This project is licensed under the [MIT License](LICENSE).
