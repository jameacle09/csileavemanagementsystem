package com.csi.leavemanagement.models;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class MessageCatalogId  implements Serializable {
	
	@Column(name="message_set_nbr")
	private int messageSetNbr;
	
	@Column(name="message_nbr")
	private int messageNbr;

	public MessageCatalogId() {
		
	}
	
	public MessageCatalogId(int messageSetNbr, int messageNbr) {
		this.messageSetNbr = messageSetNbr; 
		this.messageNbr = messageNbr;
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
	
	public boolean equals(Object obj) {
		boolean result = false;
		
		if(obj instanceof MessageCatalogId) {
			int objMessageSetNbr = ((MessageCatalogId) obj).getMessageSetNbr();
			int objMessageNbr = ((MessageCatalogId) obj).getMessageNbr();			
			
			result = (messageSetNbr == objMessageSetNbr && 
					messageNbr == objMessageNbr);			
		}
			
		return result;		
	}
	
	public int hashCode() {
		return Objects.hash(getMessageSetNbr(), getMessageNbr());
	}

	@Override
	public String toString() {
		return "MessageCatalogId [messageSetNbr=" + messageSetNbr + ", messageNbr=" + messageNbr + "]";
	}
	
	
}
