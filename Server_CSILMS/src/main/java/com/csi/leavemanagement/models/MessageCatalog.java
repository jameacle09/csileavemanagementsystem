package com.csi.leavemanagement.models;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="message_catalog")
public class MessageCatalog {

	@Id
	@Column(name="message_set_nbr")
	private int messageSetNbr;
	
	@Column(name="message_nbr")
	private int messageNbr;
	
	@Column(name="message_text")
	private String messageText;
	
	@Column(name="message_saverity")
	private String messageSaverity;
	
	@Column(name="long_decr")
	private String longDecr;
	
	@Column(name="lastupddttm")
	private Timestamp lastupddttm;
	
	public MessageCatalog() {
		
	}
	
	public MessageCatalog(int messageSetNbr, int messageNbr, String messageText, String messageSaverity, String longDecr, Timestamp lastupddttm) {
		this.messageSetNbr = messageSetNbr; 
		this.messageNbr = messageNbr;
		this.messageText = messageText;
		this.messageSaverity = messageSaverity;
		this.longDecr = longDecr;
		this.lastupddttm = lastupddttm;
	}

	public int getMessageSetNbr() {
		return messageSetNbr;
	}

	public void setMessageSetNbr(int messageSetNbr) {
		this.messageSetNbr = messageSetNbr;
	}

	public int getMessageNbr() {
		return messageNbr;
	}

	public void setMessageNbr(int messageNbr) {
		this.messageNbr = messageNbr;
	}

	public String getMessageText() {
		return messageText;
	}

	public void setMessageText(String messageText) {
		this.messageText = messageText;
	}

	public String getMessageSaverity() {
		return messageSaverity;
	}

	public void setMessageSaverity(String messageSaverity) {
		this.messageSaverity = messageSaverity;
	}

	public String getLongDecr() {
		return longDecr;
	}

	public void setLongDecr(String longDecr) {
		this.longDecr = longDecr;
	}

	public Timestamp getLastupddttm() {
		return lastupddttm;
	}

	public void setLastupddttm(Timestamp lastupddttm) {
		this.lastupddttm = lastupddttm;
	}

	@Override
	public String toString() {
		return "MessageCatalog [messageSetNbr=" + messageSetNbr + ", messageNbr=" + messageNbr + ", messageText="
				+ messageText + ", messageSaverity=" + messageSaverity + ", longDecr=" + longDecr + ", lastupddttm="
				+ lastupddttm + "]";
	}	
}
