package com.csi.leavemanagement.security;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.csi.leavemanagement.models.LoginDetails;
import com.csi.leavemanagement.repositories.LoginDetailsRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    LoginDetailsRepository loginDetailsRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {
        // Let people login with either username or email
    	System.out.println("loadUserByUsername: " + email);
    	LoginDetails user = loginDetailsRepository.findByUserIdAndLockAccount(email, 0)
                .orElseThrow(() -> 
                        new UsernameNotFoundException("User not found with email : " + email)
        );

        return UserPrincipal.create(user);
    }

    // This method is used by JWTAuthenticationFilter
    @Transactional
    public UserDetails loadUserById(String id) {
    	System.out.println("loadUserById: " + id);
    	LoginDetails user = loginDetailsRepository.findByEmplId(id)
    			.orElseThrow(() -> new UsernameNotFoundException("User not found with id : " + id)
        );

        return UserPrincipal.create(user);
    }
}
