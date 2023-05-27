export type IUserLibrary = IUserBook[];

export interface IUserBook {
  _id: string;
  user: string;
  isbn: string;
  data: Data;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Data {
  other_titles: string[];
  publishers: string[];
  number_of_pages: number;
  table_of_contents: TableOfContent[];
  ia_box_id: string[];
  series: string[];
  pagination: string;
  covers: number[];
  physical_format: string;
  key: string;
  authors: Author[];
  publish_places: string[];
  description: string;
  genres: string[];
  source_records: string[];
  title: string;
  identifiers: Identifiers;
  languages: Language[];
  subjects: string[];
  publish_date: string;
  copyright_date: string;
  by_statement: string;
  works: Work[];
  type: Type2;
  ocaid: string;
  isbn_10: string[];
  isbn_13: string[];
  lccn: string[];
  oclc_numbers: string[];
  lc_classifications: string[];
  latest_revision: number;
  revision: number;
  created: Created;
  last_modified: LastModified;
}

export interface TableOfContent {
  level: number;
  title: string;
  type: Type;
}

export interface Type {
  key: string;
}

export interface Author {
  key: string;
}

export interface Identifiers {
  alibris_id: string[];
  goodreads: string[];
}

export interface Language {
  key: string;
}

export interface Work {
  key: string;
}

export interface Type2 {
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
