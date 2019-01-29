package com.csi.leavemanagement.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.csi.leavemanagement.models.Translateitem;

@Repository
public interface TranslateitemRepository extends CrudRepository<Translateitem, String> {

}
