export interface IBookData {
  identifiers: Identifiers;
  title: string;
  authors: Author[];
  publish_date: string;
  publishers: string[];
  isbn_10: string[];
  covers: number[];
  ocaid: string;
  contributions: string[];
  languages: Language[];
  source_records: string[];
  isbn_13: string[];
  local_id: string[];
  type: Type;
  first_sentence: FirstSentence;
  key: string;
  number_of_pages: number;
  works: Work[];
  latest_revision: number;
  revision: number;
  created: Created;
  last_modified: LastModified;
}

export interface Identifiers {
  goodreads: string[];
  librarything: string[];
  amazon: string[];
}

export interface Author {
  key: string;
}

export interface Language {
  key: string;
}

export interface Type {
  key: string;
}

export interface FirstSentence {
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
