export interface IOpenLibraryResponse {
  docs: IOpenLibraryBook[];
}

export interface IOpenLibraryBook {
  key: string;
  title?: string;
  author_name?: string[];
  first_publish_year?: number;
  subject?: string[];
  isbn?: string[];
  cover_i?: number;
}

export interface IBook {
  id: string;
  title: string;
  author: string;
  year?: number;
  coverUrl?: string;
  isbn?: string;
  subjects?: string[];
  isFavourite: false;
}
