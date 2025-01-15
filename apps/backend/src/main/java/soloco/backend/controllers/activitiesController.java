package soloco.backend.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class activitiesController {
    @GetMapping("/category/{category_id}")
    public Map<String, String> getActivities() {
        return Map.of("msg", "Hello World!");
    }
}

@RestController
class activityController {
    @GetMapping("/{category_id}")
    public Map<String, String> getActivities() {
        return Map.of("msg", "Hello World!");
    }
}