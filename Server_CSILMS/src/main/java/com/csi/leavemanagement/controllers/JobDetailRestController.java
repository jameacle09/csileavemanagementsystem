package com.csi.leavemanagement.controllers;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
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
	@PreAuthorize("hasAuthority('HR')")
	public List<JobDetails> doListJobDetailss() {
		List<JobDetails> jobDetails = this.jobDetailService.findAll();
		return jobDetails;
	}
	
	@RequestMapping(value="/jobdetail/{emplid}", method=RequestMethod.GET)
	public List<JobDetails> doGetJobDetailsById(@PathVariable("emplid") String emplid) {
		List<JobDetails> jobDetail = this.jobDetailService.findByEmplid(emplid);
		return jobDetail;
	}
	
	
	@RequestMapping(value="/jobdetail", method=RequestMethod.POST)
	@PreAuthorize("hasAuthority('HR')")
	public JobDetails doSaveJobDetails(@RequestBody JobDetails jobDetail) {
		JobDetails newJobDetails = this.jobDetailService.save(jobDetail);
		return newJobDetails;
	}
	
	@RequestMapping(value="/jobdetail/{emplid}", method=RequestMethod.DELETE)
	@PreAuthorize("hasAuthority('HR')")
	public String doDeleteJobDetails(@PathVariable("emplid") String emplid,
									 @RequestParam("effdate") Date effDate) {
		this.jobDetailService.deleteByID(emplid, effDate);
		return "Successfully Deleted";
	}
	
	
	@RequestMapping(value="/jobdetail/{emplid}", method=RequestMethod.PATCH)
	@PreAuthorize("hasAuthority('HR')")
	public JobDetails doUpdateJobDetails(@PathVariable("emplid") JobDetailsId id, @RequestBody JobDetails jobDetail) {
		jobDetail.setId(id);
		JobDetails newJobDetails = this.jobDetailService.save(jobDetail);
		return newJobDetails; 
	} 
}
