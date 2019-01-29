package com.csi.leavemanagement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.csi.leavemanagement.models.LoginDetails;

public interface LoginDetailsRepository extends JpaRepository<LoginDetails, Long>{
	
	LoginDetails findByUserIdAndLockAccount(String userId, int lockAccount);

}
