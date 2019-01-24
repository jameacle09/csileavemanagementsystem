package com.csi.leavemanagement.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.csi.leavemanagement.models.StaffProfile;



@Repository
public interface StaffProfileRepository extends CrudRepository<StaffProfile, Integer> {

}
