interface Payment {
    double pay(double amount);
}

// Thanh toán gốc
class CreditCardPayment implements Payment {
    public double pay(double amount) {
        System.out.println("Paying with Credit Card: " + amount);
        return amount;
    }
}

class PayPalPayment implements Payment {
    public double pay(double amount) {
        System.out.println("Paying with PayPal: " + amount);
        return amount;
    }
}

// Decorator
abstract class PaymentDecorator implements Payment {
    protected Payment payment;

    public PaymentDecorator(Payment payment) {
        this.payment = payment;
    }
}

// Phí xử lý
class FeeDecorator extends PaymentDecorator {
    public FeeDecorator(Payment payment) {
        super(payment);
    }

    public double pay(double amount) {
        double result = payment.pay(amount);
        double fee = result * 0.05;
        double total = result + fee;
        System.out.println("Add fee: " + fee);
        return total;
    }
}

// Giảm giá
class DiscountDecorator extends PaymentDecorator {
    public DiscountDecorator(Payment payment) {
        super(payment);
    }

    public double pay(double amount) {
        double result = payment.pay(amount);
        double discount = result * 0.1;
        double total = result - discount;
        System.out.println("Apply discount: " + discount);
        return total;
    }
}

// Main
public class Main {
    public static void main(String[] args) {
        Payment payment = new CreditCardPayment();

        payment = new FeeDecorator(payment);
        payment = new DiscountDecorator(payment);

        double finalAmount = payment.pay(1000);
        System.out.println("Final amount: " + finalAmount);
    }
}