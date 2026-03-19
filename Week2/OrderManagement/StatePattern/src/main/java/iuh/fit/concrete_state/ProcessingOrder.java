package iuh.fit.concrete_state;

import iuh.fit.context.OrderManagementContext;
import iuh.fit.state.OrderState;

public class ProcessingOrder implements OrderState {
    @Override
    public void process(OrderManagementContext context) {
        System.out.println("Order already processing");
    }

    @Override
    public void delivery(OrderManagementContext context) {
        System.out.println("Order delivery");
        context.setState(new DeliveredOrder());
    }

    @Override
    public void cancel(OrderManagementContext context) {
        System.out.println("Order cancelled");
        context.setState(new CancelledOrder());
    }
}
