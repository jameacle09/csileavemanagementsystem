package com.csi.leavemanagement.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.csi.leavemanagement.exceptions.TranslateItemServiceException;
import com.csi.leavemanagement.models.Translateitem;
import com.csi.leavemanagement.models.TranslateitemId;
import com.csi.leavemanagement.repositories.TranslateitemRepository;

@Service
public class TranslateitemService {
	
	private TranslateitemRepository translateitemRepository;

	@Autowired
	public TranslateitemService(TranslateitemRepository translateitemRepository) {
		this.translateitemRepository = translateitemRepository;
	}
	
	public List<Translateitem> findAll() {
		List<Translateitem> translateitemList = (List<Translateitem>)this.translateitemRepository.findAll();
		return translateitemList;
	}
	
	public Translateitem create(Translateitem newTranslateitem) throws TranslateItemServiceException {
		
		Translateitem translateItemCheck = this.findById(newTranslateitem.getId());
		if(translateItemCheck != null)
			throw new TranslateItemServiceException(TranslateItemServiceException.TRANSLATE_ITEM_ALREADY_EXIST);
		
		return this.translateitemRepository.save(newTranslateitem);
	}
	
	public Translateitem save(Translateitem newTranslateitem) {
		 return this.translateitemRepository.save(newTranslateitem);
	}
	
	public Translateitem findById(TranslateitemId id) {
		return this.translateitemRepository.findById(id).orElse(null);
	}
	
	public boolean deleteById(String fieldname, String fieldvalue) {
		TranslateitemId id = new TranslateitemId(fieldname, fieldvalue);
		this.translateitemRepository.deleteById(id);
		
		return !(this.translateitemRepository.existsById(id));
	}
	
	public List<Translateitem> findByFieldname(String fieldname) {
		return translateitemRepository.findByIdFieldname(fieldname);		
	}
	
	public Translateitem findByIdFieldnameAndIdFieldvalue(String fieldname, String fieldvalue) {
		TranslateitemId id = new TranslateitemId(fieldname, fieldvalue);
		return translateitemRepository.findByIdFieldnameAndIdFieldvalue(fieldname, fieldvalue);		
	} 
	
	
	/*public List<Translateitem> findByFieldnameAndEffStatus(String fieldname, String effStatus) {
		return translateitemRepository.findByFieldnameAndEffStatus(fieldname, effStatus);		
	}*/
}
