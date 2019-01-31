package com.csi.leavemanagement;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;

import com.csi.leavemanagement.models.EmployeeDetails;
import com.csi.leavemanagement.models.LoginDetails;
import com.csi.leavemanagement.models.Roles;
import com.csi.leavemanagement.repositories.EmployeeDetailsRepository;
import com.csi.leavemanagement.repositories.LoginDetailsRepository;
import com.csi.leavemanagement.repositories.RoleRepository;

@RunWith(SpringRunner.class)
@SpringBootTest
public class LeavemanagementApplicationTests {
	
	@Autowired
	LoginDetailsRepository loginDetailsRepository;
	
	@Autowired
	RoleRepository roleRepository;
	
	@Autowired
	EmployeeDetailsRepository employeeDetailsRepository;
	
	@Autowired
    PasswordEncoder passwordEncoder;

	@Test
	public void contextLoads() {
	}
	
	@Transactional
	@Test
	@Rollback(false)
	public void testLogin(){
		String userId = "wai.leng@chinasofti.com";
		Optional<LoginDetails> login = loginDetailsRepository.findByUserIdAndLockAccount(userId, 0);
		
		Assert.assertEquals(login.get().getUserId(), userId);
		Assert.assertTrue(login.get().getRoles().size() > 0);
		
		LoginDetails loginDetails = login.get();
		loginDetails.setPassword(passwordEncoder.encode("123456"));
		System.out.println(loginDetails.getPassword());
		loginDetailsRepository.save(loginDetails);
		
		System.out.println(login);
	}
	
	@Test
	public void testRole(){
		List<Roles> roles = roleRepository.findAll();
		Assert.assertTrue(roles.size() > 0);
	}
	
	@Test
	public void testEmployeeDetails(){
		String emplId = "E000000011";
		EmployeeDetails employee = employeeDetailsRepository.findByEmplId(emplId);
		Assert.assertTrue(employee.getEmplId().equals(emplId));
	}

}

