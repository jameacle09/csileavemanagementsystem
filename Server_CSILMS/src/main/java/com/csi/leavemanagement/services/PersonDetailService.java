package com.csi.leavemanagement.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.csi.leavemanagement.models.PersonDetails;
import com.csi.leavemanagement.repositories.PersonDetailsRepository;

@Service
public class PersonDetailService {
	
	@Autowired
	private PersonDetailsRepository personDetailsRepository;
	
	
	public PersonDetailService(PersonDetailsRepository personDetailsRepository) {
		this.personDetailsRepository = personDetailsRepository;
	}
	
	public List<PersonDetails> findAll() {
		List<PersonDetails> personDetails = (List<PersonDetails>)this.personDetailsRepository.findAll();
		return personDetails;
	}
	
	public PersonDetails save(PersonDetails personDetail) {
		return this.personDetailsRepository.save(personDetail);
	}
	
	public PersonDetails findById(String emplid) {
		PersonDetails personDetail = this.personDetailsRepository.findById(emplid).orElse(null);
		return personDetail;
		
	}
	
	public void deleteByID(String emplid) {
		this.personDetailsRepository.deleteById(emplid);
		
	}
}
