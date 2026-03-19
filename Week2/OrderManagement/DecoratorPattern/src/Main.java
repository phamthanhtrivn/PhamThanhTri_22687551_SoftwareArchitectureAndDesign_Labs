
interface Order {
    void process();
}

class BaseOrder implements Order {
    public void process() {
        System.out.println("Bắt đầu xử lý đơn hàng...");
    }
}

abstract class OrderDecorator implements Order {
    protected Order order;

    public OrderDecorator(Order order) {
        this.order = order;
    }

    public void process() {
        order.process();
    }
}

class NewOrderDecorator extends OrderDecorator {
    public NewOrderDecorator(Order order) {
        super(order);
    }

    public void process() {
        super.process();
        System.out.println("- Kiểm tra thông tin đơn hàng");
    }
}

class ProcessingDecorator extends OrderDecorator {
    public ProcessingDecorator(Order order) {
        super(order);
    }

    public void process() {
        super.process();
        System.out.println("- Đóng gói và vận chuyển");
    }
}

class DeliveredDecorator extends OrderDecorator {
    public DeliveredDecorator(Order order) {
        super(order);
    }

    public void process() {
        super.process();
        System.out.println("- Cập nhật trạng thái: Đã giao");
    }
}

class CancelledDecorator extends OrderDecorator {
    public CancelledDecorator(Order order) {
        super(order);
    }

    public void process() {
        super.process();
        System.out.println("- Hủy đơn và hoàn tiền");
    }
}

public class Main {

    public static void main(String[] args) {
        Order order1 = new BaseOrder();
        order1 = new NewOrderDecorator(order1);
        order1 = new ProcessingDecorator(order1);
        order1 = new DeliveredDecorator(order1);
        order1.process();

        System.out.println();

        Order order2 = new BaseOrder();
        order2 = new NewOrderDecorator(order2);
        order2 = new CancelledDecorator(order2);
        order2.process();
    }
}