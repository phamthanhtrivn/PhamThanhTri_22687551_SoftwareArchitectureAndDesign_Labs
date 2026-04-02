package decorator;

public class SpecialEdition extends BorrowDecorator {

    public SpecialEdition(Borrow borrow) {
        super(borrow);
    }


    @Override
    public String getDescription() {
        return borrow.getDescription() + " + Phiên bản đặc biệt";
    }
}
