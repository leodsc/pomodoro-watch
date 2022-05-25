package com.pomodorotimer.repository;

import com.pomodorotimer.model.UserModel;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class UserRepositoryTest {

    @Autowired
    UserRepository userRepository;

    @AfterEach
    void tearDown() {
        userRepository.deleteAll();
    }

    @Test
    void findBlankRandomUUID() {
        assertEquals(Optional.empty(), userRepository.findUserByRandomUUID(""));
    }

    @Test
    @Disabled
    void findRandomUUIDThatExists() {
        String randomUUID = createRandomUUID();
        var user = new UserModel();
        userRepository.save(user);
        assertEquals(Optional.of(user), userRepository.findUserByRandomUUID(randomUUID));
    }

    @Test
    void findRandomUUIDThatDoesntExists() {
        String randomUUID = createRandomUUID();
        var user = new UserModel();
        assertEquals(Optional.empty(), userRepository.findUserByRandomUUID(randomUUID));
    }

    String createRandomUUID() {
        UUID randomUUID = UUID.randomUUID();
        return randomUUID.toString();
    }
}