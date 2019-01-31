package com.csi.leavemanagement.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.csi.leavemanagement.models.MessageCatalog;
import com.csi.leavemanagement.models.MessageCatalogId;
import com.csi.leavemanagement.services.MessageCatalogService;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class MessageCatalogRestController {

	private MessageCatalogService messageCatalogService;
	
	@Autowired	
	public MessageCatalogRestController(MessageCatalogService messageCatalogService) {
		this.messageCatalogService = messageCatalogService;
	}

	@RequestMapping(value="/messagecatalogs", method=RequestMethod.GET)
	public List<MessageCatalog> doListMessageCatalog() {
		List<MessageCatalog> messageCatalog = this.messageCatalogService.findAll();
		return messageCatalog;
	}
	
	@RequestMapping(value="/messagecatalog/{messageSetNbr}", method=RequestMethod.GET)
	public List<MessageCatalog> doGetMessageCatalogById(@PathVariable("messageSetNbr") int messageSetNbr) {
		List<MessageCatalog> messageCatalog = this.messageCatalogService.findByMessageSetNbr(messageSetNbr);
		return messageCatalog;
	}
	
	
	@RequestMapping(value="/messagecatalog", method=RequestMethod.POST)
	public MessageCatalog doSaveMessageCatalog(@RequestBody MessageCatalog messageCatalog) {
		MessageCatalog newMessageCatalog = this.messageCatalogService.save(messageCatalog);
		return newMessageCatalog;
	}
	
	@RequestMapping(value="/messagecatalog/{messageSetNbr}", method=RequestMethod.DELETE)
	public String doDeleteMessageCatalog(@PathVariable("messageSetNbr") int messageSetNbr,
									 @RequestParam("messageNbr") int messageNbr) {
		this.messageCatalogService.deleteById(messageSetNbr, messageNbr);
		return "Successfully Deleted";
	}
	
	
	@RequestMapping(value="/messagecatalog/{messageSetNbr}", method=RequestMethod.PATCH)
	public MessageCatalog doUpdateMessageCatalog(@PathVariable("messageSetNbr") MessageCatalogId id, 
												@RequestBody MessageCatalog messageCatalog) {
		messageCatalog.setId(id);
		MessageCatalog newMessageCatalog = this.messageCatalogService.save(messageCatalog);
		return newMessageCatalog; 
	} 
}
