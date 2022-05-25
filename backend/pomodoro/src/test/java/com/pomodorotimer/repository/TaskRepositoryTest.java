package com.pomodorotimer.repository;

import com.pomodorotimer.model.TaskModel;
import com.pomodorotimer.model.UserModel;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.time.LocalDate;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class TaskRepositoryTest {

    @Autowired
    TaskRepository taskRepository;

    @BeforeAll
    void setUp() {
        var task = new TaskModel();
        var random = new Random();
        long minDate = LocalDate.of(2000, 1, 1).toEpochDay();
        long maxDate = LocalDate.of(2022, 5, 23).toEpochDay();
        List<UserModel> users = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
//            users.add(new UserModel(UUID.randomUUID().toString()));
        }
        for (int i = 0; i < 40; i++) {
            task.setSeconds(random.nextLong());
//            task.setInitialDate();
//            task.setFinishDate();
            task.setUser(users.get(random.nextInt(5)));
        }
    }

    @AfterAll
    void tearDown() {
        taskRepository.deleteAll();
    }

    @Test
    void fetchAllDataDaily() {

    }

    @Test
    void fetchAllDataWeekly() {
    }

    @Test
    void fetchAllDataMonthly() {
    }

    @Test
    void fetchAllDataYearly() {
    }
}