package com.csi.leavemanagement.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.csi.leavemanagement.models.PersonDetails;

@Repository
public interface PersonDetailsRepository extends CrudRepository<PersonDetails, String> {

}
