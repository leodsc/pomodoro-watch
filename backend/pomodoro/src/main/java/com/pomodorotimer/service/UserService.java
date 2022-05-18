package com.pomodorotimer.service;

import com.pomodorotimer.exceptions.EmailAlreadyExistsException;
import com.pomodorotimer.exceptions.WrongPasswordException;
import com.pomodorotimer.model.UserModel;
import com.pomodorotimer.repository.UserRepository;
import com.pomodorotimer.security.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.validation.constraints.Email;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    private boolean passwordMatch(String hashedPassword, String rawPassword) {
        return passwordEncoder.matches(rawPassword, hashedPassword);
    }

    public List<UserModel> getAllUsers() {
        return this.userRepository.findAll();
    }

    public Optional<UserModel> login(UserModel user) throws UsernameNotFoundException, WrongPasswordException {
        return userRepository.findUserByEmail(user.getEmail())
                .map((result) -> {
                    if (passwordMatch(result.getPassword(), user.getPassword())) {
                        userDetailsService.setPassword(result.getPassword());
                        userDetailsService.loadUserByUsername(user.getEmail());
                        return Optional.of(result);
                    }
                    return Optional.<UserModel>empty();
                })
                .orElseThrow(() -> {
                    String message = String.format("E-mail %s não foi encontrado!", user.getEmail());
                    return new UsernameNotFoundException(message);
                });
    }

    public UserModel signup(UserModel user) throws EmailAlreadyExistsException {
        Optional<UserModel> userFound = userRepository.findUserByEmail(user.getEmail());

        if (userFound.isPresent()) {
            throw new EmailAlreadyExistsException();
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return user;
    }

    public UserModel createUserWithRandomUUID(UserModel user) {
        return userRepository.save(user);
    }

    public UserModel findUserByUuid(String uuid) {
        return userRepository.findUserByRandomUUID(uuid).get();
    }
}
