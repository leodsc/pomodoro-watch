package com.pomodorotimer.controller;

import com.pomodorotimer.exceptions.EmailAlreadyExistsException;
import com.pomodorotimer.exceptions.WrongPasswordException;
import com.pomodorotimer.model.UserModel;
import com.pomodorotimer.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("users")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/all")
    public List<UserModel> getAll() {
        return userService.getAllUsers();
    }

    @GetMapping("randomUUID/{uuid}")
    public ResponseEntity<UserModel> getUserById(@PathVariable String uuid) {
        return ResponseEntity.ok(userService.findUserByUuid(uuid));
    }

    @PostMapping("/signup")
    public ResponseEntity<UserModel> signup(@RequestBody UserModel user, @RequestParam boolean withUserUUID) {
        if (withUserUUID) {
            return ResponseEntity.ok(userService.createUserWithRandomUUID(user));
        } else {
            try {
                return ResponseEntity.ok((userService.signup(user)));
            } catch (EmailAlreadyExistsException e) {
                throw new ResponseStatusException(HttpStatus.CONFLICT, e.getMessage());
            }
        }
    }

    @PostMapping("/login")
    public ResponseEntity<UserModel> login(@RequestBody UserModel user) {
        try {
            Optional<UserModel> result = userService.login(user);
            if (result.isEmpty()) {
                return ResponseEntity.notFound().build();
            } else {
                var headers = new HttpHeaders();
                headers.setBasicAuth(user.getEmail(), user.getPassword());
                return ResponseEntity.status(HttpStatus.OK).headers(headers).body(user);
            }
        } catch (WrongPasswordException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }
}
