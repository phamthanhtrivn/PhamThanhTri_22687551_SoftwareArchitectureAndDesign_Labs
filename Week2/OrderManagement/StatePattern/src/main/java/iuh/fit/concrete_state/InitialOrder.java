package iuh.fit.concrete_state;

import iuh.fit.context.OrderManagementContext;
import iuh.fit.state.OrderState;

public class InitialOrder implements OrderState {

    @Override
    public void process(OrderManagementContext context) {
        System.out.println("Order created");
        context.setState(new ProcessingOrder());
    }

    @Override
    public void delivery(OrderManagementContext context) {
        System.out.println("Cannot delivery, order not process yet");
    }

    @Override
    public void cancel(OrderManagementContext context) {
        System.out.println("Order cancelled");
        context.setState(new CancelledOrder());
    }
}
