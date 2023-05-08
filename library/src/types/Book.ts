console.log('test');
interface Book {
  id: string;
  title: string;
  description: string;
  authors: string[];
  favorite: boolean;
  fileCover: string;
  fileName: string;
}

abstract class BooksRepository {
  createBook(book: Book) {}
  getBook(id: string) {}
  getBooks() {}
  updateBook(id: string) {}
  deleteBook(id: string) {}
}
