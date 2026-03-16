//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
public class Main {
    public static void main(String[] args) {

        DatabaseConnection db1 = DatabaseConnection.getInstance();
        DatabaseConnection db2 = DatabaseConnection.getInstance();

        db1.connect(); // This will print "Already connected to the database." because db1 is already getInstance()
        db2.connect(); // This will also print "Already connected to the database." because db2 is the same instance as db1
        db2.executeQuery("SELECT * FROM users");

        System.out.println("Are both instances the same: " + (db1 == db2));

        db1.disconnect();
        db2.executeQuery("SELECT * FROM products");
        db2.disconnect();
    }
}