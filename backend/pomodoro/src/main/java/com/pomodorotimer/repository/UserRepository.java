package com.pomodorotimer.repository;

import com.pomodorotimer.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserModel, Long> {
    Optional<UserModel> findUserByEmail(String email);

    Optional<UserModel> findUserByRandomUUID(String randomUUID);
}
