package com.csi.leavemanagement.services;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.csi.leavemanagement.models.BusinessUnit;
import com.csi.leavemanagement.models.Department;
import com.csi.leavemanagement.models.EmployeeDetails;
import com.csi.leavemanagement.models.JobDetails;
import com.csi.leavemanagement.models.JobDetailsId;
import com.csi.leavemanagement.models.LoginDetails;
import com.csi.leavemanagement.models.PersonDetails;
import com.csi.leavemanagement.repositories.BusinessUnitRepository;
import com.csi.leavemanagement.repositories.DepartmentRepository;
import com.csi.leavemanagement.repositories.EmployeeDetailsRepository;
import com.csi.leavemanagement.repositories.JobDetailsRepository;
import com.csi.leavemanagement.repositories.LoginDetailsRepository;
import com.csi.leavemanagement.repositories.PersonDetailsRepository;
import com.csi.leavemanagement.security.UserPrincipal;

@Service
public class EmployeeDetailsService {

	private static final Logger logger = LoggerFactory.getLogger(EmployeeDetailsService.class);

	private EmployeeDetailsRepository employeeDetailRepository;
	private PersonDetailsRepository personDetailRepository;
	private LoginDetailsRepository loginDetailRepository;
	private BusinessUnitRepository businessUnitRepository;
	private DepartmentRepository departmentRepository;
	private JobDetailsRepository jobDetailsRepository;
	private PasswordEncoder passwordEncoder;

	@Autowired
	public EmployeeDetailsService(EmployeeDetailsRepository employeeDetailRepository,
			PersonDetailsRepository personDetailRepository, JobDetailsRepository jobDetailsRepository,
			LoginDetailsRepository loginDetailRepository, BusinessUnitRepository businessUnitRepository,
			DepartmentRepository departmentRepository, PasswordEncoder passwordEncoder) {
		this.employeeDetailRepository = employeeDetailRepository;
		this.personDetailRepository = personDetailRepository;
		this.jobDetailsRepository = jobDetailsRepository;
		this.loginDetailRepository = loginDetailRepository;
		this.businessUnitRepository = businessUnitRepository;
		this.departmentRepository = departmentRepository;
		this.passwordEncoder = passwordEncoder;
	}

	public List<EmployeeDetails> findAll() {
		List<EmployeeDetails> employeeDetailsList = this.employeeDetailRepository.findAll();
		return employeeDetailsList;
	}

	public EmployeeDetails findById(String emplId) {
		return this.employeeDetailRepository.findById(emplId).orElse(new EmployeeDetails());
	}

	public EmployeeDetails findByBusinessEmail(String email) {
		return this.employeeDetailRepository.findByBusinessEmail(email).orElse(new EmployeeDetails());
	}

	public List<EmployeeDetails> findByMgrId(String mgrId) {

		PersonDetails manager = this.personDetailRepository.findById(mgrId).orElse(null);
		if (manager != null) {
			List<EmployeeDetails> employeeDetailsList = this.employeeDetailRepository.findByReportsTo(manager);
			return employeeDetailsList;
		}

		return null;
	}

	public List<EmployeeDetails> findAllManagers() {
		List<EmployeeDetails> managerList = this.employeeDetailRepository.findAllManagers();
		return managerList;
	}

	public List<EmployeeDetails> findEmplidWithoutLogin() {
		List<LoginDetails> loginList = this.loginDetailRepository.findAll();
		List<String> emplidList = new ArrayList<String>();

		for (LoginDetails loginDetail : loginList)
			emplidList.add(loginDetail.getEmplId());

		List<EmployeeDetails> employeeList = this.employeeDetailRepository.findByEmplIdNotIn(emplidList);
		return employeeList;
	}

	public EmployeeDetails addEditEmployeeDetails(EmployeeDetails employeeDetails, UserPrincipal currentUser) {
		PersonDetails personDetails = new PersonDetails();
		personDetails.setEmplId(employeeDetails.getEmplId());
		personDetails.setName(employeeDetails.getName());
		personDetails.setGender(employeeDetails.getGender());
		personDetails.setNricPassprt(employeeDetails.getNricPassport());
		personDetails.setMarriageStatus(employeeDetails.getMarriageStatus());
		personDetails.setMarriageDate(employeeDetails.getMarriageDate());
		personDetails.setMobileNo(employeeDetails.getMobileNo());
		personDetails.setBussEmail(employeeDetails.getBusinessEmail());
		personDetails.setTotalChildren(employeeDetails.getTotalChildren());
		personDetails.setMarriageCnt(employeeDetails.getMarriageCount());
		
		JobDetailsId jobDetailsId = new JobDetailsId();
		jobDetailsId.setEmplid(employeeDetails.getEmplId());
		jobDetailsId.setEffDate(
				employeeDetails.getEffectiveDate() == null ? new Date() : employeeDetails.getEffectiveDate());

		JobDetails jobDetails = new JobDetails();
		jobDetails.setId(jobDetailsId);
		jobDetails.setJoinDate(employeeDetails.getJoinDate());
		jobDetails.setStatus(employeeDetails.getStatus());

		BusinessUnit businessUnit = this.businessUnitRepository.findById(employeeDetails.getBusinessUnit())
				.orElse(null);
		Department department = this.departmentRepository.findById(employeeDetails.getDeptId()).orElse(null);

		jobDetails.setBusinessUnit(businessUnit);
		jobDetails.setDeptId(department);
		jobDetails.setJobTitle(employeeDetails.getJobTitle());
		jobDetails.setReportsTo(employeeDetails.getReportsTo().getEmplId());
		jobDetails.setReportDottedLine(employeeDetails.getReportDottedLine());
		jobDetails.setLastUpddTtm(new Date());
		jobDetails.setLastUpdoprId(currentUser.getId());

		this.personDetailRepository.save(personDetails);
		this.jobDetailsRepository.save(jobDetails);
		
		boolean isUpdate = false;
		int lockAccount = employeeDetails.getStatus().equals("A") ? 0:1;
		LoginDetails loginDetails = loginDetailRepository.findByEmplId(employeeDetails.getEmplId()).orElse(null);
		if (loginDetails == null) {
			loginDetails = new LoginDetails();
			loginDetails.setEmplId(employeeDetails.getEmplId());
			loginDetails.setUserId(employeeDetails.getBusinessEmail());
			loginDetails.setPassword(this.passwordEncoder.encode(employeeDetails.getNricPassport()));
			loginDetails.setLockAccount(lockAccount);
			loginDetails.setRoles(employeeDetails.getRoles());
		} else {
			isUpdate = true;
			loginDetails.setUserId(employeeDetails.getBusinessEmail());
			loginDetails.setLockAccount(lockAccount);
			loginDetails.setRoles(employeeDetails.getRoles());
		}

		this.loginDetailRepository.save(loginDetails);
		
		logger.info("User {} has successfully {} by User {}", employeeDetails.getEmplId(),isUpdate ? "update" : "added", currentUser.getId());
		employeeDetails = employeeDetailRepository.findByEmplId(employeeDetails.getEmplId());
		if(employeeDetails == null) {
			employeeDetails = new EmployeeDetails();
		}
		
		return employeeDetails;
	}
}
