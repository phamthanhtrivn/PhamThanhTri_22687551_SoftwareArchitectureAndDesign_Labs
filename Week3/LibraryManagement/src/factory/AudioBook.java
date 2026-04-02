package factory;

public class AudioBook extends Book {

    public AudioBook(String title, String author, String category) {
        super(title, author, category);
    }

    @Override
    public String getInfo() {
        return "[Sách nói] " + title + " - " + author + " (" + category + ")";
    }
}
