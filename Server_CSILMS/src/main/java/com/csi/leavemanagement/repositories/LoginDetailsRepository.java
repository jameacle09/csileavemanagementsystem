package com.csi.leavemanagement.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.csi.leavemanagement.models.LoginDetails;

public interface LoginDetailsRepository extends JpaRepository<LoginDetails, Long>{
	
	Optional<LoginDetails> findByUserIdAndLockAccount(String userId, int lockAccount);
	Optional<LoginDetails> findByEmplId(String emplId);
	Optional<LoginDetails> deleteByEmplId(String emplId);
}
