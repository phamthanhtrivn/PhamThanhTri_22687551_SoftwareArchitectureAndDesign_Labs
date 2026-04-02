package factory;

public class BookFactory {

    public static Book createBook(String type, String title, String author, String category) {
        switch (type.toLowerCase()) {
            case "physical":
                return new PhysicalBook(title, author, category);
            case "ebook":
                return new EBook(title, author, category);
            case "audiobook":
                return new AudioBook(title, author, category);
            default:
                throw new IllegalArgumentException("Loại sách không hợp lệ: " + type);
        }
    }
}
