package com.pomodorotimer.security;

import lombok.Setter;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Setter
@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private String password;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return User.
                withUsername(username)
                .password(password)
                .roles("USER")
                .build();
    }
}
