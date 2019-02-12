package com.csi.leavemanagement.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
	
	/*public List<Translateitem> findByFieldnameAndEffStatus(String fieldname, String effStatus) {
		return translateitemRepository.findByFieldnameAndEffStatus(fieldname, effStatus);		
	}*/
}
