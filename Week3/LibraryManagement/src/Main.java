import decorator.BasicBorrow;
import decorator.Borrow;
import decorator.ExtendBorrow;
import decorator.SpecialEdition;
import factory.Book;
import factory.BookFactory;
import observer.NotificationService;
import observer.User;
import singleton.Library;
import strategy.SearchByTitle;
import strategy.SearchContext;

import java.util.List;

//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
public class Main {
    public static void main(String[] args) {
        Library lib = Library.getInstance();

        Book b1 = BookFactory.createBook("physical", "Java Core", "Nam", "IT");
        Book b2 = BookFactory.createBook("ebook", "Spring Boot", "An", "IT");
        Book b3 = BookFactory.createBook("audiobook", "Clean Code", "Robert", "Programming");

        lib.addBook(b1);
        lib.addBook(b2);
        lib.addBook(b3);

        // Strategy
        SearchContext context = new SearchContext();
        context.setStrategy(new SearchByTitle());

        List<Book> result = context.search(lib.getBooks(), "Java");
        System.out.println("\n--- SEARCH ---");
        result.forEach(b -> System.out.println(b.getInfo()));

        // Observer
        NotificationService notify = new NotificationService();
        notify.subscribe(new User("Trí"));
        notify.subscribe(new User("Admin"));

        System.out.println("\n--- OBSERVER ---");
        notify.notifyAllUsers("Có sách mới!");

        // Decorator
        Borrow borrow = new BasicBorrow();
        borrow = new ExtendBorrow(borrow);
        borrow = new SpecialEdition(borrow);

        System.out.println("\n--- DECORATOR ---");
        System.out.println(borrow.getDescription());
    }
}