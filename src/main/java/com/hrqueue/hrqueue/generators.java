//package com.hrqueue.hrqueue;
//
//import com.hrqueue.hrqueue.repositories.UserRepository;
//
//import java.util.Calendar;
//import java.util.Date;
//
//public class generators {
//
//    private final UserRepository userRepo;
//
//
//    public generators(UserRepository userRepo) {
//        this.userRepo = userRepo;
//    }
//
//    public generators() {
//    }
//
//    public String FirstNameGenerator() {
//        String[] first = {"Liam","Emma","Noah","Olivia","William","Ava","James","Isabella","Oliver","Sophia","Benjamin","Charlotte","Elijah","Mia","Lucas","Amelia","Mason","Harper","Logan","Evelyn","Alexander","Abigail","Ethan","Emily","Jacob","Elizabeth","Michael","Mila","Daniel","Henry","Avery","Jackson","Sofia","Sebastian","Camila","Aiden","Aria","Matthew","Scarlett","Samuel","Victoria","David","Madison","Joseph","Luna","Carter","Grace","Owen","Chloe","Wyatt","Penelope","John","Layla","Jack","Riley","Luke","Zoey","Jayden","Nora","Dylan","Lily","Grayson","Eleanor","Levi","Hannah","Isaac","Lillian","Gabriel","Addison","Julian"};
//        int index = (int) (Math.random() * first.length);
//        return first[index];
//    }
//
//    public static String LastNameGenerator() {
//        String[] first = {"Smith","Johnson","Williams","Brown","Jones","Miller","Davis","Garcia","Rodriguez","Wilson","Martinez","Anderson","Taylor","Thomas","Hernandez","Moore","Martin","Jackson","Thompson","White","Lopez","Lee","Gonzalez","Harris","Clark","Lewis","Robinson","Walker","Perez","Hall"};
//        int index = (int) (Math.random() * first.length);
//        return first[index];
//    }
//
//    public static Date dategenerator() {
//        Calendar cal = Calendar.getInstance();
//        Date newDate = cal.getTime();
//        return newDate;
//    }
//
//    public static int randomWithRange(int min, int max) {
//        int range = (max - min) + 1;
//        return (int)(Math.random() * range) + min;
//    }
//
//
//    public static void main(String[] args) {
//
//        for (int i = 0; i <=1000;i++){
//        }
//
//    }
//
//}
