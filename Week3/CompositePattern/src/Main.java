import java.util.ArrayList;
import java.util.List;

interface FileSystemItem {
    void display(String indent);
}

class File implements FileSystemItem {
    private String name;

    public File(String name) {
        this.name = name;
    }

    @Override
    public void display(String indent) {
        System.out.println(indent + "- File: " + name);
    }
}

class Folder implements FileSystemItem {
    private String name;
    private List<FileSystemItem> items = new ArrayList<>();

    public Folder(String name) {
        this.name = name;
    }

    @Override
    public void display(String indent) {
        System.out.println(indent + "+ Folder: " + name);
        for (FileSystemItem item : items) {
            item.display(indent + "    ");
        }
    }

    public void add(FileSystemItem item) {
        this.items.add(item);
    }

    public void remove(FileSystemItem item) {
        this.items.remove(item);
    }
}

public class Main {
    public static void main(String[] args) {
        Folder root = new Folder("Root");

        File file1 = new File("File1.txt");

        Folder folder1 = new Folder("Folder1");
        File subFile1 = new File("SubFile1.txt");
        File subFile2 = new File("SubFile2.txt");
        folder1.add(subFile1);
        folder1.add(subFile2);
        folder1.remove(subFile1);

        File file2 = new File("File2.txt");

        root.add(file1);
        root.add(folder1);
        root.add(file2);

        root.display("");
    }
}