public class User implements Comparable<User>{
    private String username, password, spotifyUsername, spotifyPassword;
    private long id;
    private int highScore;
    //static int globalScore;?

    public User() {
        username = null;
        password = null;
        spotifyUsername = null;
        spotifyPassword = null;
        id = 0;
    }
    public User(String username, String password, long id) {
        this.username = username;
        this.password = password;
        this.id = id; //construct id using hashcode of username
    }
    public User(String spotifyUsername, String spotifyPassword) {
        this.spotifyUsername = spotifyUsername;
        this.spotifyPassword = spotifyPassword;
    }


    public String getUsername() {
        return username;
    }
    public String getPassword() {
        return password;
    }
    public int getHighScore() { return highScore; }
    public long getId() { return id; } //dont use for spotify users
    public void setUsername(String username) {
        this.username = username;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public void setHighScore(int highScore) { this.highScore = highScore; }

    //user-v-user/global comparisons?

    @Override
    public int compareTo(User user) {
        return getHighScore()-(user.getHighScore()); //if return is negative, other has higher score
    }
    public int highestScore(User user) {
        return Math.max(getHighScore(),user.getHighScore()); //returns highest score of the two
    }


    /***********************************/
    /**** I LOVE STACK OVERFLOW!!!! ****/
    /***********************************/

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result
                + ((username == null) ? 0 : username.hashCode());
        return result;
    }

    @Override
    public boolean equals(final Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        final User other = (User) obj;
        if (username == null) {
            if (other.username != null) {
                return false;
            }
        }
        else if (!username.equals(other.username)) {
            return false;
        }
        return true;
    }
}
