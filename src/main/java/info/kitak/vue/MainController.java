package info.kitak.vue;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
public class MainController {
    private CommentService service;
    private ObjectMapper mapper;

    @Autowired
    public MainController(CommentService service) {
        this.service = service;
        this.mapper = new ObjectMapper();
    }

    @RequestMapping("/")
    public String index(Model model) throws Exception {
        List<Comment> comments = service.getComments();
        model.addAttribute("comments", comments);
        model.addAttribute("commentsJson", mapper.writeValueAsString(comments));
        return "index";
    }
}
