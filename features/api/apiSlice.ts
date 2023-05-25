import type { RootState } from "@/store/store";

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
    login: builder.mutation({
      query: (credentials) => ({
        url: "users/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "users/",
        method: "POST",
        body: credentials,
      }),
    }),
    getBooks: builder.query({
      query: () => ({
        url: "books/",
        method: "GET",
      }),
    }),
    getBook: builder.query({
      query: (data) => ({
        url: `books/isbn/${data.isbn}`,
        method: "GET",
      }),
    }),
    addBook: builder.mutation({
      query: (bookData) => ({
        url: "books/",
        method: "POST",
        body: bookData,
      }),
      invalidatesTags: ["Books"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useAddBookMutation,
  useGetBooksQuery,
  useGetBookQuery,
} = booksApi;
