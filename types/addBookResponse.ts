export interface IAddBookResponse {
  user: string;
  isbn: string;
  data: Data;
  isRead: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Data {
  type: Type;
  title: string;
  authors: Author[];
  publish_date: string;
  source_records: string[];
  number_of_pages: number;
  publishers: string[];
  isbn_10: string[];
  isbn_13: string[];
  physical_format: string;
  notes: Notes;
  covers: number[];
  works: Work[];
  key: string;
  latest_revision: number;
  revision: number;
  created: Created;
  last_modified: LastModified;
}

export interface Type {
  key: string;
}

export interface Author {
  key: string;
}

export interface Notes {
  type: string;
  value: string;
}

export interface Work {
  key: string;
}

export interface Created {
  type: string;
  value: string;
}

export interface LastModified {
  type: string;
  value: string;
}
