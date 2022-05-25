package com.pomodorotimer.repository;

import com.pomodorotimer.model.TaskModel;
import com.pomodorotimer.dto.TimeTrack;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<TaskModel, Long> {

    @Query(value="SELECT SUM(seconds) AS totalSeconds, EXTRACT(DOW FROM initial_date) AS timeUnit " +
                    "FROM tasks " +
                    "GROUP BY EXTRACT(DOW FROM initial_date);", nativeQuery = true)
    List<TimeTrack> fetchAllDataDaily(Long id);

    @Query(value="SELECT SUM(seconds) AS totalSeconds, WEEK(initial_date) AS timeUnit " +
            "FROM tasks " +
            "GROUP BY WEEK(initial_date);", nativeQuery = true)
    List<TimeTrack> fetchAllDataWeekly(Long id);

    @Query(value="SELECT SUM(seconds) AS totalSeconds, EXTRACT(MONTH FROM initial_date) AS timeUnit " +
            "FROM tasks " +
            "GROUP BY EXTRACT(MONTH FROM initial_date);", nativeQuery = true)
    List<TimeTrack> fetchAllDataMonthly(Long id);

    @Query(value="SELECT SUM(seconds) AS totalSeconds, EXTRACT( YEAR FROM initial_date) AS timeUnit " +
            "FROM tasks " +
            "GROUP BY EXTRACT(YEAR FROM initial_date);", nativeQuery = true)
    List<TimeTrack> fetchAllDataYearly(Long id);

}
