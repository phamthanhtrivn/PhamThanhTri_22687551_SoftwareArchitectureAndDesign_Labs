package singleton;

import factory.Book;

import java.util.ArrayList;
import java.util.List;

public class Library {
    private static Library instance;
    private List<Book> books = new ArrayList<>();

    private Library() {

    }

    public static Library getInstance() {
        if (instance == null) {
            return new Library();
        }
        return instance;
    }

    public void addBook(Book book) {
        books.add(book);
    }

    public List<Book> getBooks() {
        return books;
    }
}
