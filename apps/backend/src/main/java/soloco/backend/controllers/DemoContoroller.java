package soloco.backend.controllers;

// import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class DemoContoroller {

    @GetMapping("")
    public Map<String, String> getDemo() {
        return Map.of("msg", "Hello World!");
    }
}
