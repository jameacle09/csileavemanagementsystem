package com.csi.leavemanagement.models;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name="message_catalog")
public class MessageCatalog {

	@EmbeddedId
	private MessageCatalogId id;
	
	@Column(name="message_text")
	private String messageText;
	
	@Column(name="message_severity")
	private String messageSeverity;
	
	@Column(name="long_descr")
	private String longDescr;
	
	@Column(name="lastupddttm")
	private Timestamp lastupddttm;
	
	public MessageCatalog() {
		
	}
	
	public MessageCatalog(MessageCatalogId id, String messageText, String messageSeverity, String longDescr, Timestamp lastupddttm) {
		this.id = id; 
		this.messageText = messageText;
		this.messageSeverity = messageSeverity;
		this.longDescr = longDescr;
		this.lastupddttm = lastupddttm;
	}

	public MessageCatalogId getId() {
		return id;
	}

	public void setId(MessageCatalogId id) {
		this.id = id;
	}

	public String getMessageText() {
		return messageText;
	}

	public void setMessageText(String messageText) {
		this.messageText = messageText;
	}

	public String getMessageSeverity() {
		return messageSeverity;
	}

	public void setMessageSeverity(String messageSeverity) {
		this.messageSeverity = messageSeverity;
	}

	public String getLongDescr() {
		return longDescr;
	}

	public void setLongDescr(String longDescr) {
		this.longDescr = longDescr;
	}

	public Timestamp getLastupddttm() {
		return lastupddttm;
	}

	public void setLastupddttm(Timestamp lastupddttm) {
		this.lastupddttm = lastupddttm;
	}

	@Override
	public String toString() {
		return "MessageCatalog [id=" + id + ", messageText=" + messageText + ", messageSeverity=" + messageSeverity
				+ ", longDescr=" + longDescr + ", lastupddttm=" + lastupddttm + "]";
	}


}
