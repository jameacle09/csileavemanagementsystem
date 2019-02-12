package com.csi.leavemanagement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.csi.leavemanagement.models.Roles;

public interface RoleRepository extends JpaRepository<Roles, Long>{

}
