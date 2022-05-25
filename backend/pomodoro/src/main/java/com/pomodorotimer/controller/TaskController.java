package com.pomodorotimer.controller;

import com.pomodorotimer.model.TaskModel;
import com.pomodorotimer.repository.TaskRepository;
import com.pomodorotimer.service.TaskService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.logging.Logger;

@RestController
@RequestMapping("/tasks")
@CrossOrigin("*")
public class TaskController {

    private final Logger logger = Logger.getLogger("Task controller");

    @Autowired
    private TaskService taskService;

    @GetMapping("{user_id}")
    public List<TaskModel> getAllTasks(@PathVariable("user_id") Long userId) {
        return taskService.getAllTasks(userId);
    }

    @PostMapping
    public TaskModel createTask(@RequestBody TaskModel task) {
        System.out.println(task.toString());
        return taskService.create(task);
    }

    @GetMapping("/data/{timing}")
    public ResponseEntity<?> createData(@RequestParam("id") Long id, @PathVariable String timing) {
        logger.info("Checking data...");
        var result = taskService.createData(id, timing);
        System.out.println(result.get(0).toString());
        return ResponseEntity.ok(result);
    }

}
