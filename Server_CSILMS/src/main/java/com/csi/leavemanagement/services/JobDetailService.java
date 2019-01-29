package com.csi.leavemanagement.services;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.csi.leavemanagement.models.AppliedLeave;
import com.csi.leavemanagement.models.AppliedLeaveId;
import com.csi.leavemanagement.models.JobDetails;
import com.csi.leavemanagement.models.JobDetailsId;
import com.csi.leavemanagement.repositories.JobDetailsRepository;

@Service
public class JobDetailService {
	
	
	private JobDetailsRepository jobDetailsRepository;
	
	@Autowired
	public JobDetailService(JobDetailsRepository jobDetailsRepository) {
		this.jobDetailsRepository = jobDetailsRepository;
	}
	
	public List<JobDetails> findAll() {
		List<JobDetails> jobDetails = (List<JobDetails>)this.jobDetailsRepository.findAll();
		return jobDetails;
	}
	
	public JobDetails save(JobDetails jobDetail) {
		return this.jobDetailsRepository.save(jobDetail);
	}
	
	public JobDetails findById(JobDetailsId id) {
		return this.jobDetailsRepository.findById(id).orElse(null);
		
	}
	
	public boolean deleteByID(String emplid, Date effDate) {
		JobDetailsId id = new JobDetailsId(emplid, effDate);
		this.jobDetailsRepository.deleteById(id);
		return !(this.jobDetailsRepository.existsById(id));
		
	}
	
	public List<JobDetails> findByEmplid(String emplid) {		
		return jobDetailsRepository.findByIdEmplid(emplid);
	}
}
