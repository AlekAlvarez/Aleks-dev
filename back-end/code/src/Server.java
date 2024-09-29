import java.io.*;
import java.net.*;
import java.util.HashMap;
import java.util.List;
import java.util.concurrent.ConcurrentLinkedQueue;
public class Server{
    static ConcurrentLinkedQueue<HashMap<String,Socket>> request;
    static ConcurrentLinkedQueue<HashMap<List,Socket>> talking;
    public static void main(String[] args){
        try{
        String ip=InetAddress.getLocalHost().getHostAddress();
        Thread talk=new Thread(new talkThread());
        talk.run();
        ServerSocket server=new ServerSocket(443);
        while(true){
            Socket client=server.accept();
            Thread listen=new Thread(new listenThread(client));
            listen.run();
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
class listenThread implements Runnable{
    Socket client;
    BufferedReader br;
    public listenThread(Socket client){
        this.client=client;
    }
    public void run(){
        try{
            while(true){
                String s=br.readLine();
                if(s.equals("song data")){
                    HashMap<String,Socket> h=new HashMap<>();
                    h.put("song data", client);
                    Server.request.add(h);
                }
            }
        }catch(Exception e){
            System.out.println("Fail");
            System.out.println(e.toString());
            return;
        }
    }
}
class talkThread implements Runnable{
    PrintWriter pr;
    public void run(){
        while(true){
            while(!Server.talking.isEmpty()){
                HashMap<List,Socket> o=Server.talking.poll();

            }
        }
    }
}