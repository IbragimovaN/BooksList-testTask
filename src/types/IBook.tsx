export interface IOpenLibraryResponse {
  docs: IOpenLibraryBook[];
}

export interface IOpenLibraryBook {
  key: string;
  title?: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
  language?: string[];
  edition_count?: number;
  has_fulltext?: boolean;
  ebook_access?: string;
  ia?: string[];
}

export interface IBook {
  id: string;
  title: string;
  author: string;
  coverUrl?: string;
  year?: number;
  language?: string[];
  editionCount?: number;
  hasFullText?: boolean;
  ebookAccess?: string;
  readOnlineUrl?: string;
}
