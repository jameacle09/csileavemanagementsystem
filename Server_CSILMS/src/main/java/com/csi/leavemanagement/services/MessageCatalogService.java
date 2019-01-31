package com.csi.leavemanagement.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.csi.leavemanagement.models.MessageCatalog;
import com.csi.leavemanagement.models.MessageCatalogId;
import com.csi.leavemanagement.repositories.MessageCatalogRepository;


@Service
public class MessageCatalogService {
	
	private MessageCatalogRepository messageCatalogRepository;

	@Autowired
	public MessageCatalogService(MessageCatalogRepository messageCatalogRepository) {
		this.messageCatalogRepository = messageCatalogRepository;
	}
	
	public List<MessageCatalog> findAll() {
		List<MessageCatalog> messageCatalogList = (List<MessageCatalog>)this.messageCatalogRepository.findAll();
		return messageCatalogList;
	}
	
	public MessageCatalog save(MessageCatalog newMessageCatalog) {
		 return this.messageCatalogRepository.save(newMessageCatalog);
	}
	
	public MessageCatalog findById(MessageCatalogId id) {
		return this.messageCatalogRepository.findById(id).orElse(null);
	}

	public boolean deleteById(int messageSetNbr, int messageNbr) {
		MessageCatalogId id = new MessageCatalogId(messageSetNbr, messageNbr);
		this.messageCatalogRepository.deleteById(id);
		
		return !(this.messageCatalogRepository.existsById(id));
	}
	
	public List<MessageCatalog> findByMessageSetNbr(int messageSetNbr) {
		return messageCatalogRepository.findByIdMessageSetNbr(messageSetNbr);		
	}
	
}
