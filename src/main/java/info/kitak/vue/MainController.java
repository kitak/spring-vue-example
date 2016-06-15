package info.kitak.vue;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Map;
import java.util.List;

@Controller
public class MainController {
    private CommentService service;
    private VueRenderer vueRenderer;
    private ObjectMapper mapper;

    @Autowired
    public MainController(CommentService service) {
        this.service = service;
        this.vueRenderer = new VueRenderer();
        this.mapper = new ObjectMapper();
    }

    @RequestMapping("/")
    public String index(Map<String, Object> model) throws Exception {
        List<Comment> comments = service.getComments();
        String commentBox = vueRenderer.renderCommentBox(comments);
        String data = mapper.writeValueAsString(comments);
        model.put("content", commentBox);
        model.put("data", data);
        return "index";
    }
}
