package decorator;

public class ExtendBorrow extends BorrowDecorator {

    public ExtendBorrow(Borrow borrow) {
        super(borrow);
    }

    @Override
    public String getDescription() {
        return borrow.getDescription() + " + Gia hạn";
    }
}
