package strategy;

import factory.Book;

import java.util.List;

public class SearchByCategory implements SearchStrategy {
    @Override
    public List<Book> search(List<Book> books, String keyword) {
        return books
                .stream()
                .filter(book -> book.getAuthor().toLowerCase().contains(keyword.toLowerCase()))
                .toList();
    }
}
