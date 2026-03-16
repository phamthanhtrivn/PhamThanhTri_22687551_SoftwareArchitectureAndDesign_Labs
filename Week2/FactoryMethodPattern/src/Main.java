
interface Snack {
    void prepare();
}

class Popcorn implements Snack {
    @Override
    public void prepare() {
        System.out.println("Preparing popcorn...");
    }
}

class Chips implements Snack {
    @Override
    public void prepare() {
        System.out.println("Preparing chips...");
    }
}

class SnackFactory {
    public static Snack createSnack(String type) {
        if (type.equalsIgnoreCase("popcorn")) {
            return new Popcorn();
        } else if (type.equalsIgnoreCase("chips")) {
            return new Chips();
        }
        throw new IllegalArgumentException("Unknown snack type: " + type);
    }
}

public class Main {
    public static void main(String[] args) {
        Snack popcorn = SnackFactory.createSnack("popcorn");
        popcorn.prepare();

        Snack chips = SnackFactory.createSnack("chips");
        chips.prepare();

        Snack unknown = SnackFactory.createSnack("unknown"); // This will throw an exception
        unknown.prepare();
    }
}