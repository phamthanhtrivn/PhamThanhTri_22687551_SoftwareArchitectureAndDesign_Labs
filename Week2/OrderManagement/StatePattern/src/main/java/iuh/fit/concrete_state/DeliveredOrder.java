package iuh.fit.concrete_state;

import iuh.fit.context.OrderManagementContext;
import iuh.fit.state.OrderState;

public class DeliveredOrder implements OrderState {

    @Override
    public void process(OrderManagementContext context) {
        System.out.println("Order already process");
    }

    @Override
    public void delivery(OrderManagementContext context) {
        System.out.println("Order already delivery");
    }

    @Override
    public void cancel(OrderManagementContext context) {
        System.out.println("Order cancelled");
        context.setState(new CancelledOrder());
    }
}
