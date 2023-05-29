import { IAddBookFormData } from "@/pages/add-book";
import { ILoginFormData, ILoginResponse } from "@/pages/login";
import { IRegisterFormData, IRegisterResponse } from "@/pages/register";
import type { RootState } from "@/store/store";
import { IAddBookResponse } from "@/types/addBookResponse";
import { IDeleteBookResponse } from "@/types/deleteBookResponse";
import { IUserBook, IUserLibrary } from "@/types/userBooks";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const booksApi = createApi({
  reducerPath: "booksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User", "Books"],
  endpoints: (builder) => ({
    getBooks: builder.query<IUserLibrary, void>({
      query: () => ({
        url: "books/",
        method: "GET",
      }),
      providesTags: ["Books"],
    }),
    getBook: builder.query<IUserBook[], any>({
      query: (data) => ({
        url: `books/isbn/${data.isbn}`,
        method: "GET",
      }),
    }),
    login: builder.mutation<ILoginResponse, ILoginFormData>({
      query: (credentials) => ({
        url: "users/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    register: builder.mutation<IRegisterResponse, IRegisterFormData>({
      query: (credentials) => ({
        url: "users/",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Books"],
    }),
    addBook: builder.mutation<IAddBookResponse, IAddBookFormData>({
      query: (bookData) => ({
        url: "books/",
        method: "POST",
        body: bookData,
      }),
      invalidatesTags: ["Books"],
    }),
    updateBook: builder.mutation<IUserBook, IUserBook>({
      query: (bookData) => ({
        url: `books/${bookData._id}`,
        method: "PUT",
        body: bookData,
      }),
      invalidatesTags: ["Books"],
    }),
    deleteBook: builder.mutation<IDeleteBookResponse, { id: string }>({
      query: (bookData) => ({
        url: `books/${bookData.id}`,
        method: "DELETE",
        body: bookData,
      }),
      invalidatesTags: ["Books"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookQuery,
  useLoginMutation,
  useRegisterMutation,
  useAddBookMutation,
  useDeleteBookMutation,
  useUpdateBookMutation,
} = booksApi;
