package factory;

public class EBook extends Book {

    public EBook(String title, String author, String category) {
        super(title, author, category);
    }

    @Override
    public String getInfo() {
        return "[Sách điện tử] " + title + " - " + author + " (" + category + ")";
    }
}
