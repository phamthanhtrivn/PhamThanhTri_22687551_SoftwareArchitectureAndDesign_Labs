package iuh.fit;

import iuh.fit.context.OrderManagementContext;

public class Main {
    public static void main(String[] args) {
        OrderManagementContext context = new OrderManagementContext();

        context.process();
        context.cancel();
        context.delivery();
    }
}