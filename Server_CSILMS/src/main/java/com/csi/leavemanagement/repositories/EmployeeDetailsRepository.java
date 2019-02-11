package com.csi.leavemanagement.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.csi.leavemanagement.models.EmployeeDetails;
import com.csi.leavemanagement.models.PersonDetails;

public interface EmployeeDetailsRepository extends JpaRepository<EmployeeDetails, String>{
	EmployeeDetails findByEmplId(String emplId);

	List<EmployeeDetails> findByReportsTo(PersonDetails mgrId);
}
