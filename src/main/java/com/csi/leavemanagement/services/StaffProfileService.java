package com.csi.leavemanagement.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.csi.leavemanagement.models.StaffProfile;
import com.csi.leavemanagement.repositories.StaffProfileRepository;

@Service
public class StaffProfileService {

	@Autowired
	private StaffProfileRepository staffProfileRepository;
	public List<StaffProfile> findAll() {
		List<StaffProfile> staffProfiles = (List<StaffProfile>)this.staffProfileRepository.findAll();
		return staffProfiles;
	}
	
	public StaffProfile save(StaffProfile staffProfile) {
		return this.staffProfileRepository.save(staffProfile);
	}
	
	public StaffProfile findById(int id) {
		StaffProfile staffProfile = this.staffProfileRepository.findById(id).orElse(null);
		return staffProfile;
		
	}
	
	public void deleteByID(int id) {
		this.staffProfileRepository.deleteById(id);
		
	}
	
	
}
