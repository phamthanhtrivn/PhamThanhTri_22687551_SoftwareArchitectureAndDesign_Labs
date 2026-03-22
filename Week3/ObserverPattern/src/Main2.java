import java.util.ArrayList;
import java.util.List;

interface ObserverTask {
    void update(String status);
}

class Task {
    private String status;
    private List<ObserverTask> observers = new ArrayList<>();

    public Task(String status) {
        this.status = status;
    }

    public void attach(ObserverTask observer) {
        observers.add(observer);
    }

    public void detach(ObserverTask observer) {
        observers.remove(observer);
    }

    public void setStatus(String status) {
        this.status = status;
        notifyObservers();
    }

    private void notifyObservers() {
        for (ObserverTask o : observers) {
            o.update(status);
        }
    }
}

class TeamMember implements ObserverTask {
    private String name;

    public TeamMember(String name) {
        this.name = name;
    }

    @Override
    public void update(String status) {
        System.out.println(name + " nhận thông báo: trạng thái mới " + status);
    }
}

public class Main2 {
    public static void main(String[] args) {
        Task task = new Task("Chưa bắt đầu");

        TeamMember member1 = new TeamMember("Alice");
        TeamMember member2 = new TeamMember("Bob");

        task.attach(member1);
        task.attach(member2);

        task.setStatus("Đang tiến hành");
    }
}
