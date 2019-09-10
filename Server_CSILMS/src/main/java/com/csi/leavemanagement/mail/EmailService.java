package com.csi.leavemanagement.mail;

import javax.mail.MessagingException;
import javax.mail.Transport;
import javax.mail.internet.MimeMessage;

public class EmailService {

	/**
	 * @param message - composed message
	 * */
	public void sendEmail(MimeMessage message) throws MessagingException{
		Transport.send(message);
	}
	
	public MimeMessage composeEmail() {
		return null;
	}
	
}
