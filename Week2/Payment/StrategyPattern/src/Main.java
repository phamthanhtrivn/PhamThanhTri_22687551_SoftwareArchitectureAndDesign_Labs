interface PaymentStrategy {
    void pay(double amount);
}

// Thanh toán bằng thẻ tín dụng
class CreditCardStrategy implements PaymentStrategy {
    public void pay(double amount) {
        System.out.println("Paid " + amount + " using Credit Card");
    }
}

// Thanh toán bằng PayPal
class PayPalStrategy implements PaymentStrategy {
    public void pay(double amount) {
        System.out.println("Paid " + amount + " using PayPal");
    }
}

// Context
class PaymentContext {
    private PaymentStrategy strategy;

    public void setStrategy(PaymentStrategy strategy) {
        this.strategy = strategy;
    }

    public void pay(double amount) {
        strategy.pay(amount);
    }
}

// Main
public class Main {
    public static void main(String[] args) {
        PaymentContext context = new PaymentContext();

        context.setStrategy(new CreditCardStrategy());
        context.pay(1000);

        context.setStrategy(new PayPalStrategy());
        context.pay(2000);
    }
}