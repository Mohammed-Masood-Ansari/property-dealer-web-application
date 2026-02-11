package com.properties.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendOtp(String email, String otp) {

        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(email);
        msg.setSubject("Property Dealer OTP");
        msg.setText("Your OTP is " + otp + ". It is valid for 5 minutes.");

        mailSender.send(msg);

        System.out.println("EMAIL OTP SENT TO: " + email);
    }
}
