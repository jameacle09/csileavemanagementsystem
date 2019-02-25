package com.csi.leavemanagement.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.csi.leavemanagement.models.EmployeeDetails;
import com.csi.leavemanagement.models.PersonDetails;

public interface EmployeeDetailsRepository extends JpaRepository<EmployeeDetails, String>{
	EmployeeDetails findByEmplId(String emplId);

	List<EmployeeDetails> findByReportsTo(PersonDetails mgrId);
	
	@Query("SELECT DISTINCT e FROM EmployeeDetails e INNER JOIN e.roles r WHERE r.role = 'M'")
	List<EmployeeDetails> findAllManagers();
	
	List<EmployeeDetails> findByEmplIdNotIn(List<String> emplId);
	
	Optional<EmployeeDetails> findByBusinessEmail(String businessEmail);
}
