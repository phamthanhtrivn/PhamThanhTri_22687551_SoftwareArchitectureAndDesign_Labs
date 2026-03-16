public class DatabaseConnection {

    private static DatabaseConnection instance;

    private DatabaseConnection() {
        System.out.println("Database connection established.");
    }

    public static DatabaseConnection getInstance() {
        if (instance == null) {
            synchronized (DatabaseConnection.class) {
                if (instance == null) { // Double-checked locking
                    instance = new DatabaseConnection();
                }
            }
        }
        return instance;
    }

    public void connect() {
        if (instance != null) {
            System.out.println("Already connected to the database.");
        } else {
            System.out.println("Connecting to the database...");
        }
    }

    public void disconnect() {
        if (instance != null) {
            System.out.println("Disconnecting from the database...");
            instance = null;
        } else {
            System.out.println("No database connection to disconnect.");
        }
    }

    public void executeQuery(String query) {
        if (instance != null) {
            System.out.println("Executing query: " + query);
        } else {
            System.out.println("No database connection. Please connect first to execute query.");
        }
    }
}
