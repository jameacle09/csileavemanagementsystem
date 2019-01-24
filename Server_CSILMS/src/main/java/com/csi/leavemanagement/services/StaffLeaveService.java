package com.csi.leavemanagement.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.csi.leavemanagement.models.StaffLeave;
import com.csi.leavemanagement.repositories.StaffLeaveRepository;

@Service
public class StaffLeaveService {

	@Autowired
	private StaffLeaveRepository staffLeaveRepository;
	public List<StaffLeave> findAll() {
		List<StaffLeave> staffLeaves = (List<StaffLeave>)this.staffLeaveRepository.findAll();
		return staffLeaves;
	}
	
	public StaffLeave save(StaffLeave staffLeave) {
		return this.staffLeaveRepository.save(staffLeave);
	}
	
	public StaffLeave findById(int id) {
		StaffLeave staffLeave = this.staffLeaveRepository.findById(id).orElse(null);
		return staffLeave;
		
	}
	
	public void deleteByID(int id) {
		this.staffLeaveRepository.deleteById(id);
		
	}
	
	
}
