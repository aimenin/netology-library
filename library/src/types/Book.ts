console.log('test');
import { injectable } from 'inversify';

export interface IBook {
  id: string;
  title: string;
  description: string;
  authors: string[];
  favorite: boolean;
  fileCover: string;
  fileName: string;
}

@injectable()
export abstract class BooksRepository {
  createBook(book: IBook) {}
  getBook(id: string) {}
  getBooks() {}
  updateBook(id: string) {}
  deleteBook(id: string) {}
}
