package com.csi.leavemanagement.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.csi.leavemanagement.models.LeaveDetail;
import com.csi.leavemanagement.repositories.LeaveDetailRepository;

@Service
public class LeaveDetailService {

	@Autowired
	private LeaveDetailRepository leaveDetailRepository;
	public List<LeaveDetail> findAll() {
		List<LeaveDetail> leaveDetails = (List<LeaveDetail>)this.leaveDetailRepository.findAll();
		return leaveDetails;
	}
	
	public LeaveDetail save(LeaveDetail leaveDetail) {
		return this.leaveDetailRepository.save(leaveDetail);
	}
	
	public LeaveDetail findById(int id) {
		LeaveDetail leaveDetail = this.leaveDetailRepository.findById(id).orElse(null);
		return leaveDetail;
		
	}
	
	public void deleteByID(int id) {
		this.leaveDetailRepository.deleteById(id);
		
	}
	
	
}
