package iuh.fit;

interface OrderStrategy {
    void processOrder();
}

class NewOrderStrategy implements OrderStrategy {
    @Override
    public void processOrder() {
        System.out.println("Kiểm tra thông tin đơn hàng...");
    }
}

class ProcessingOrderStrategy implements OrderStrategy {
    @Override
    public void processOrder() {
        System.out.println("Đóng gói và vận chuyển...");
    }
}

class DeliveredOrderStrategy implements OrderStrategy {
    @Override
    public void processOrder() {
        System.out.println("Cập nhật trạng thái: Đã giao");
    }
}

class CancelledOrderStrategy implements OrderStrategy {
    @Override
    public void processOrder() {
        System.out.println("Hủy đơn và hoàn tiền...");
    }
}

class OrderContext {
    private OrderStrategy strategy;

    public void setStrategy(OrderStrategy strategy) {
        this.strategy = strategy;
    }

    public void execute() {
        strategy.processOrder();
    }
}

public class Main {
    public static void main(String[] args) {
        OrderContext orderContext = new OrderContext();

        orderContext.setStrategy(new NewOrderStrategy());
        orderContext.execute();

        orderContext.setStrategy(new ProcessingOrderStrategy());
        orderContext.execute();

        orderContext.setStrategy(new DeliveredOrderStrategy());
        orderContext.execute();

        orderContext.setStrategy(new CancelledOrderStrategy());
        orderContext.execute();
    }
}