package strategy;

import factory.Book;

import java.util.List;

public class SearchContext {
    private SearchStrategy strategy;

    public void setStrategy(SearchStrategy strategy) {
        this.strategy = strategy;
    }

    public List<Book> search(List<Book> books, String keword) {
        return strategy.search(books, keword);
    }
}
