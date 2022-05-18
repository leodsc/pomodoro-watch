package com.pomodorotimer.service;

import com.pomodorotimer.TimingOptions;
import com.pomodorotimer.dto.*;
import com.pomodorotimer.model.TaskModel;
import com.pomodorotimer.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;
//    private List<?> timeSpentDto = null;
    private List<TimeTrack> tasksTime;
    public List<TaskModel> getAllTasks(Long userId) {
        return taskRepository.findAll();
    }

    public TaskModel create(TaskModel task) {
        taskRepository.save(task);
        return task;
    }

    public List<?> createData(Long id, String timing) {
        TimingOptions timingOpt = TimingOptions.valueOf(timing.toUpperCase());
        var timeSpentDto = new TimeSpentDto();
        switch (timingOpt) {
            case HOURLY -> {
                // tbi
            }
            case DAILY -> {
                tasksTime = taskRepository.fetchAllDataDaily(id);
            }
            case WEEKLY -> {
                // tbi
            }
            case MONTHLY -> {
                tasksTime = taskRepository.fetchAllDataMonthly(id);
            }
            case YEARLY -> {
                tasksTime = taskRepository.fetchAllDataYearly(id);
            }
        }
        return timeSpentDto.transform(tasksTime, timingOpt);
    }
}
