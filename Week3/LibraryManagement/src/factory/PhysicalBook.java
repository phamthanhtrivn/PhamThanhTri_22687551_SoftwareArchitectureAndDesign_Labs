package factory;

public class PhysicalBook extends Book {

    public PhysicalBook(String title, String author, String category) {
        super(title, author, category);
    }

    @Override
    public String getInfo() {
        return "[Sách giấy] " + title + " - " + author + " (" + category + ")";
    }
}
