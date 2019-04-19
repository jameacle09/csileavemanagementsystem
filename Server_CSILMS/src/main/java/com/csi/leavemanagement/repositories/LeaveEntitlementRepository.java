package com.csi.leavemanagement.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.csi.leavemanagement.models.LeaveEntitlement;
import com.csi.leavemanagement.models.LeaveEntitlementId;

@Repository
public interface LeaveEntitlementRepository extends CrudRepository<LeaveEntitlement, LeaveEntitlementId>  {

	List<LeaveEntitlement> findByIdEmplidAndIdYear(String emplid, int year);
	List<LeaveEntitlement> findByIdEmplidAndIdLeaveCode(String emplid, String leaveCode);
	List<LeaveEntitlement> findByIdEmplid(String emplid);
	List<LeaveEntitlement> findByIdYear(int year);
	List<LeaveEntitlement> findByIdEmplidIn(List<String> emplIdList);
}
