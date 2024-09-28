import java.io.*;
import java.net.*;
import java.util.concurrent.ConcurrentLinkedQueue;
public class Server{
    static ConcurrentLinkedQueue q;
    public static void main(String[] args){
        try{
        String ip=InetAddress.getLocalHost().getHostAddress();
        ServerSocket server=new ServerSocket(443);
        while(true){
            Socket client=server.accept();

        }
    }
    catch(UnknownHostException e){
        System.out.println("There is an issue with geting my IP");
    }
    catch(IOException e){
        System.out.println("Issue with creating client");
    }
    catch(Exception e){
        System.out.println(e.toString());
    }
    }
}
class acceptThread implements Runnable{
    public void run(){

    }
}
class listenThread implements Runnable{
    public void run(){

    }
}
class talkThread implements Runnable{
    public void run(){

    }
}