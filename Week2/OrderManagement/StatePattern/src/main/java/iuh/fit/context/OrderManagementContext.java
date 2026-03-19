package iuh.fit.context;

import iuh.fit.concrete_state.InitialOrder;
import iuh.fit.state.OrderState;

public class OrderManagementContext {
    private OrderState state;

    public OrderManagementContext() {
        state = new InitialOrder();
    }

    public void setState(OrderState state) {
        this.state = state;
    }

    public void process() {
        state.process(this);
    }

    public void delivery() {
        state.delivery(this);
    }

    public void cancel() {
        state.cancel(this);
    }

}
