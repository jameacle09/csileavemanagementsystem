package com.csi.leavemanagement.services;

import java.util.HashSet;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.csi.leavemanagement.models.StaffProfile;
import com.csi.leavemanagement.repositories.StaffProfileRepository;

@Service
public class StaffProfileService {

	private StaffProfileRepository staffProfileRepository;
	
	@Autowired
	public StaffProfileService(StaffProfileRepository staffProfileRepository) {
		this.staffProfileRepository = staffProfileRepository;
	}
	
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
	
	public List<StaffProfile> findAllManager() {
		
		List<StaffProfile> staffProfiles = (List<StaffProfile>)this.staffProfileRepository.findAll();
		HashSet<Integer> managerIdSet = new HashSet<Integer> ();
		
		for(StaffProfile staffProfile : staffProfiles) {
			if(staffProfile.getLineManager() != null) {
				managerIdSet.add(staffProfile.getLineManager().getId());
			}
		}

		List<StaffProfile> managerList = (List<StaffProfile>)this.staffProfileRepository.findAllById(managerIdSet) ;		
		return managerList;
	}	
}
