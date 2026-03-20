interface Product {
    double getPrice();
}

class BaseProduct implements Product {
    private double price;

    public BaseProduct(double price) {
        this.price = price;
    }

    public double getPrice() {
        return price;
    }
}

abstract class TaxDecorator implements Product {
    protected Product product;

    public TaxDecorator(Product product) {
        this.product = product;
    }
}

class VATDecorator extends TaxDecorator {
    public VATDecorator(Product product) {
        super(product);
    }

    public double getPrice() {
        return product.getPrice() + product.getPrice() * 0.1;
    }
}

class ConsumptionTaxDecorator extends TaxDecorator {
    public ConsumptionTaxDecorator(Product product) {
        super(product);
    }

    public double getPrice() {
        return product.getPrice() + product.getPrice() * 0.05;
    }
}

class LuxuryTaxDecorator extends TaxDecorator {
    public LuxuryTaxDecorator(Product product) {
        super(product);
    }

    public double getPrice() {
        return product.getPrice() + product.getPrice() * 0.2;
    }
}

public class Main {
    public static void main(String[] args) {
        Product product = new BaseProduct(1000);

        product = new VATDecorator(product);
        product = new LuxuryTaxDecorator(product);
        product = new ConsumptionTaxDecorator(product);

        System.out.println("Final Price: " + product.getPrice());
    }
}