package com.pomodorotimer.repository;

import com.pomodorotimer.model.TaskModel;
import com.pomodorotimer.dto.TimeTrack;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<TaskModel, Long> {

    @Query(value="SELECT SUM(seconds) AS totalSeconds, WEEKDAY(initial_date) AS timeUnit " +
                    "FROM tasks " +
                    "GROUP BY WEEKDAY(initial_date);", nativeQuery = true)
    List<TimeTrack> fetchAllDataDaily(Long id);

    @Query(value="SELECT SUM(seconds) AS totalSeconds, WEEK(initial_date) AS timeUnit " +
            "FROM tasks " +
            "GROUP BY WEEK(initial_date);", nativeQuery = true)
    List<TimeTrack> fetchAllDataWeekly(Long id);

    @Query(value="SELECT SUM(seconds) AS totalSeconds, EXTRACT(MONTH FROM TIMESTAMP initial_date) AS timeUnit " +
            "FROM tasks " +
            "GROUP BY MONTH(initial_date);", nativeQuery = true)
    List<TimeTrack> fetchAllDataMonthly(Long id);

    @Query(value="SELECT SUM(seconds) AS totalSeconds, YEAR(initial_date) AS timeUnit " +
            "FROM tasks " +
            "GROUP BY YEAR(initial_date);", nativeQuery = true)
    List<TimeTrack> fetchAllDataYearly(Long id);

}
