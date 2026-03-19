package iuh.fit.state;

import iuh.fit.context.OrderManagementContext;

public interface OrderState {
    void process(OrderManagementContext context);
    void delivery(OrderManagementContext context);
    void cancel(OrderManagementContext context);
}
