package com.csi.leavemanagement.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.csi.leavemanagement.models.LeaveStatus;
import com.csi.leavemanagement.repositories.LeaveStatusRepository;

@Service
public class LeaveStatusService {

	@Autowired
	private LeaveStatusRepository leaveStatusRepository;
	public List<LeaveStatus> findAll() {
		List<LeaveStatus> leaveStatuss = (List<LeaveStatus>)this.leaveStatusRepository.findAll();
		return leaveStatuss;
	}
	
	public LeaveStatus save(LeaveStatus leaveStatus) {
		return this.leaveStatusRepository.save(leaveStatus);
	}
	
	public LeaveStatus findById(int id) {
		LeaveStatus leaveStatus = this.leaveStatusRepository.findById(id).orElse(null);
		return leaveStatus;
		
	}
	
	public void deleteByID(int id) {
		this.leaveStatusRepository.deleteById(id);
		
	}
	
	
}
