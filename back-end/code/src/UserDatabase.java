import java.util.HashMap;

public class UserDatabase {
    private HashMap<String, User> database;
    public UserDatabase() {
        database = new HashMap<>();
    }
    public void addUser(User user) {
        database.put(user.getUsername(),user);
    }
    public void removeUser(User user) {
        database.remove(user.getUsername());
    }
    public User getUser(String username) {
        return database.get(username);
    }
}
