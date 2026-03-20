interface TaxState {
    double calculateTax(double price);
}

// VAT
class VATState implements TaxState {
    public double calculateTax(double price) {
        return price * 0.1;
    }
}

// Thuế tiêu thụ
class ConsumptionTaxState implements TaxState {
    public double calculateTax(double price) {
        return price * 0.05;
    }
}

// Thuế xa xỉ
class LuxuryTaxState implements TaxState {
    public double calculateTax(double price) {
        return price * 0.2;
    }
}

// Context
class Product {
    private double price;
    private TaxState state;

    public Product(double price) {
        this.price = price;
    }

    public void setState(TaxState state) {
        this.state = state;
    }

    public double getTax() {
        return state.calculateTax(price);
    }
}

public class Main {
    public static void main(String[] args) {
        Product product = new Product(1000);

        product.setState(new VATState());
        System.out.println("VAT: " + product.getTax());

        product.setState(new ConsumptionTaxState());
        System.out.println("Consumption Tax: " + product.getTax());

        product.setState(new LuxuryTaxState());
        System.out.println("Luxury Tax: " + product.getTax());
    }
}