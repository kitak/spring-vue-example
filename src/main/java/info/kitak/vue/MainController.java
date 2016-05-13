package info.kitak.vue;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Map;

@Controller
public class MainController {
    @RequestMapping("/")
    public String index(Map<String, Object> model) throws Exception {
        model.put("message", "hello");
        return "index";
    }
}
