package com.csi.leavemanagement.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.csi.leavemanagement.models.JobDetails;
import com.csi.leavemanagement.models.JobDetailsId;
import com.csi.leavemanagement.repositories.JobDetailsRepository;

@Service
public class JobDetailService {
	
	@Autowired
	private JobDetailsRepository jobDetailsRepository;
	
	
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
		JobDetails jobDetail = this.jobDetailsRepository.findById(id).orElse(null);
		return jobDetail;
		
	}
	
	public void deleteByID(JobDetailsId id) {
		this.jobDetailsRepository.deleteById(id);
		
	}
}
