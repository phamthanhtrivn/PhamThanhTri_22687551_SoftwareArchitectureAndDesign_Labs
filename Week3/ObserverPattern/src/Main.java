import java.util.ArrayList;
import java.util.List;

interface Observer {
    void update(double price);
}

class Stock {
    private double price;
    private List<Observer> observers = new ArrayList<>();

    public void attach(Observer observer) {
        observers.add(observer);
    }

    public void detach(Observer observer) {
        observers.remove(observer);
    }

    public void setPrice(double price) {
        this.price = price;
        notifyObservers();
    }

    private void notifyObservers() {
        for (Observer o : observers) {
            o.update(price);
        }
    }
}

class Investor implements Observer {
    private String name;

    public Investor(String name) {
        this.name = name;
    }

    @Override
    public void update(double price) {
        System.out.println(name + " nhận thông báo: giá mới " + price);
    }
}
//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
public class Main {
    public static void main(String[] args) {
        Stock stock = new Stock();

        Investor investor1 = new Investor("Alice");
        Investor investor2 = new Investor("Bob");

        stock.attach(investor1);
        stock.attach(investor2);

        stock.setPrice(1200.0);
    }
}