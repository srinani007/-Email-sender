package com.example.email.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendEmail(String name, String email, String messageContent) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setTo("prasanthk377.career@gmail.com");
        helper.setSubject("New Contact Form Submission");
        helper.setFrom("prasanthk377.career@gmail.com"); // ✅ your Gmail
        helper.setReplyTo(email); // ✅ user input

        String emailBody = """
        <h2>New Contact Form Submission</h2>
        <p><b>Name:</b> %s</p>
        <p><b>Email:</b> %s</p>
        <p><b>Message:</b> %s</p>
    """.formatted(name, email, messageContent);

        helper.setText(emailBody, true);

        mailSender.send(message);
    }

}
