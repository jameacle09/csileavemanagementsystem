package com.csi.leavemanagement.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.csi.leavemanagement.services.JobDetailService;
import com.csi.leavemanagement.models.JobDetails ;
import com.csi.leavemanagement.models.JobDetailsId;



@RestController
@RequestMapping("/api")
@CrossOrigin
public class JobDetailRestController {
	
	
	private JobDetailService jobDetailService;
	
	@Autowired	
	public JobDetailRestController(JobDetailService jobDetailService) {
		this.jobDetailService = jobDetailService;
	}

	@RequestMapping(value="/jobdetails", method=RequestMethod.GET)
	public List<JobDetails> doListJobDetailss() {
		List<JobDetails> jobDetails = this.jobDetailService.findAll();
		return jobDetails;
	}
	
	@RequestMapping(value="/jobdetail/{emplid}", method=RequestMethod.GET)
	public JobDetails doGetJobDetailsById(@PathVariable("emplid") JobDetailsId id) {
		JobDetails jobDetail = this.jobDetailService.findById(id);
		return jobDetail;
	}
	
	
	@RequestMapping(value="/jobdetail", method=RequestMethod.POST)
	public JobDetails doSaveJobDetails(@RequestBody JobDetails jobDetail) {
		JobDetails newJobDetails = this.jobDetailService.save(jobDetail);
		return newJobDetails;
	}
	
/*	@RequestMapping(value="/jobdetail/{emplid}", method=RequestMethod.DELETE)
	public String doDeleteJobDetails(@PathVariable("emplid") JobDetailsId id) {
		this.jobDetailService.deleteById(id);
		return "Successfully Deleted";
	}
	
	@RequestMapping(value="/jobdetail/{emplid}", method=RequestMethod.PATCH)
	public JobDetails doUpdateJobDetails(@PathVariable("emplid") JobDetailsId id, @RequestBody JobDetails jobDetail) {
		jobDetail.setId(id);
		JobDetails newJobDetails = this.jobDetailService.save(jobDetail);
		return newJobDetails; 
	} */
}
