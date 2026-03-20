interface PaymentState {
    void pay(double amount);
}

// Thanh toán bằng thẻ tín dụng
class CreditCardState implements PaymentState {
    public void pay(double amount) {
        System.out.println("Paid " + amount + " using Credit Card");
    }
}

// Thanh toán bằng PayPal
class PayPalState implements PaymentState {
    public void pay(double amount) {
        System.out.println("Paid " + amount + " using PayPal");
    }
}

// Context
class PaymentContext {
    private PaymentState state;

    public void setState(PaymentState state) {
        this.state = state;
    }

    public void pay(double amount) {
        state.pay(amount);
    }
}

// Main
public class Main {
    public static void main(String[] args) {
        PaymentContext context = new PaymentContext();

        context.setState(new CreditCardState());
        context.pay(1000);

        context.setState(new PayPalState());
        context.pay(2000);
    }
}