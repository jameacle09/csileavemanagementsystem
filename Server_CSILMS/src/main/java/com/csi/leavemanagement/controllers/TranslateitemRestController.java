package com.csi.leavemanagement.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.csi.leavemanagement.exceptions.TranslateItemServiceException;
import com.csi.leavemanagement.models.Translateitem;
import com.csi.leavemanagement.services.TranslateitemService;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class TranslateitemRestController {

	private TranslateitemService translateitemService;
	
	@Autowired
	public TranslateitemRestController(TranslateitemService translateitemService) {
		this.translateitemService = translateitemService;
	}
	
	@RequestMapping(value="/translateitems", method=RequestMethod.GET)
	public List<Translateitem> doListTranslateitem() {
		List<Translateitem> translateitems = this.translateitemService.findAll();
		return translateitems;
	}	

	@RequestMapping(value="/translateitem/{fieldname}", method=RequestMethod.GET)
	public List<Translateitem> doGetTranslateitemById(@PathVariable("fieldname") String fieldname) {
		List<Translateitem> translateitem = this.translateitemService.findByFieldname(fieldname);
		return translateitem;
	}
	
	@RequestMapping(value="/translateitem/{fieldname}/{fieldvalue}", method=RequestMethod.GET)
	public Translateitem doGetTranslateitemById(@PathVariable("fieldname") String fieldname,
													  @PathVariable("fieldvalue") String fieldvalue) {
		Translateitem translateitem = this.translateitemService.findByIdFieldnameAndIdFieldvalue(fieldname, fieldvalue);
		return translateitem;
	} 
	
	@RequestMapping(value="/translateitem", method=RequestMethod.POST)
	@PreAuthorize("hasAuthority('HR')")
	public ResponseEntity<?> doCreateTranslateitem(@RequestBody Translateitem translateitem) {
		
		Translateitem newTranslateitem = null;
		try {			
			newTranslateitem = this.translateitemService.create(translateitem);			
		} catch (TranslateItemServiceException e) {
			
			String errorMessage = "";
			switch(e.getExceptionCode()) {
				case TranslateItemServiceException.TRANSLATE_ITEM_ALREADY_EXIST:
					errorMessage = translateitem.getId().getFieldvalue() + " already defined for " + translateitem.getId().getFieldname();
					break;
					
				case TranslateItemServiceException.TRANSLATE_ITEM_INVALID_FIELDNAME:
					errorMessage = translateitem.getId().getFieldname() + " is not a valid field name";
					break;
				
				default:
					errorMessage = "An unknown error has occured";					
			}
			throw new ResponseStatusException(HttpStatus.CONFLICT, errorMessage);

		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "An unknown error has occured");
		}
		
		if(newTranslateitem == null) 
			throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to create Translate Item");
				
		return new ResponseEntity<Translateitem>(newTranslateitem, HttpStatus.CREATED);
	}
	
	@RequestMapping(value="/translateitem/{fieldname}", method=RequestMethod.DELETE)
	@PreAuthorize("hasAuthority('HR')")
	public String doDeleteTranslateitemById(@PathVariable("fieldname") String fieldname,  
											   @RequestParam("fieldvalue") String fieldvalue) {

		this.translateitemService.deleteById(fieldname, fieldvalue);
		return "Successfully Deleted";
	}
	
//	@RequestMapping(value="/translateitem/{fieldname}", method=RequestMethod.PATCH)
//	public Translateitem doUpdateTranslateitemById(@PathVariable("fieldname") TranslateitemId id,													
//													@RequestBody Translateitem translateitem) {
//		translateitem.setId(id);
//		Translateitem newTranslateitem = this.translateitemService.save(translateitem);
//		return newTranslateitem;
//	}	
	
	@RequestMapping(value="/translateitem/{fieldname}/{fieldvalue}", method=RequestMethod.PATCH)
	@PreAuthorize("hasAuthority('HR')")
	public Translateitem doUpdateTranslateitemById(@PathVariable("fieldname") String fieldname,
													@PathVariable("fieldvalue") String fieldvalue,
													@RequestBody Translateitem translateitem) {
		
		Translateitem newTranslateitem = this.translateitemService.save(translateitem);
		return newTranslateitem;
	}
}
