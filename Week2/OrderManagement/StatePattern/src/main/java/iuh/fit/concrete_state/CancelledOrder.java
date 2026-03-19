package iuh.fit.concrete_state;

import iuh.fit.context.OrderManagementContext;
import iuh.fit.state.OrderState;

public class CancelledOrder implements OrderState {

    @Override
    public void process(OrderManagementContext context) {
        System.out.println("Order already cancelled");
    }

    @Override
    public void delivery(OrderManagementContext context) {
        System.out.println("Order already cancelled");
    }

    @Override
    public void cancel(OrderManagementContext context) {
        System.out.println("Order already cancelled");
    }
}
