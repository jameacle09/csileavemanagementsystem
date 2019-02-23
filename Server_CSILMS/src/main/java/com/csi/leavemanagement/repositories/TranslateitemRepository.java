package com.csi.leavemanagement.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.csi.leavemanagement.models.JobDetails;
import com.csi.leavemanagement.models.Translateitem;
import com.csi.leavemanagement.models.TranslateitemId;

@Repository
public interface TranslateitemRepository extends CrudRepository<Translateitem, TranslateitemId> {

	List<Translateitem> findByIdFieldname(String fieldname);
	Translateitem findByIdFieldnameAndIdFieldvalue(String fieldname, String fieldvalue);
	//List<Translateitem> findByFieldnameAndEffStatus(String fieldname, String effStatus);

}
