interface TaxStrategy {
    double calculateTax(double price);
}

// VAT
class VATStrategy implements TaxStrategy {
    public double calculateTax(double price) {
        return price * 0.1;
    }
}

// Thuế tiêu thụ
class ConsumptionTaxStrategy implements TaxStrategy {
    public double calculateTax(double price) {
        return price * 0.05;
    }
}

// Thuế xa xỉ
class LuxuryTaxStrategy implements TaxStrategy {
    public double calculateTax(double price) {
        return price * 0.2;
    }
}

// Context
class Product {
    private double price;
    private TaxStrategy strategy;

    public Product(double price) {
        this.price = price;
    }

    public void setStrategy(TaxStrategy strategy) {
        this.strategy = strategy;
    }

    public double getTax() {
        return strategy.calculateTax(price);
    }
}

// Main
public class Main {
    public static void main(String[] args) {
        Product product = new Product(1000);

        product.setStrategy(new VATStrategy());
        System.out.println("VAT: " + product.getTax());

        product.setStrategy(new ConsumptionTaxStrategy());
        System.out.println("Consumption Tax: " + product.getTax());

        product.setStrategy(new LuxuryTaxStrategy());
        System.out.println("Luxury Tax: " + product.getTax());
    }
}