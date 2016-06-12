package info.kitak.vue;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Map;
import java.util.List;

@Controller
public class MainController {

    private CommentService service;
    private VueRenderer vueRenderer;

    @Autowired
    public MainController(CommentService service) {
        this.service = service;
    }

    @RequestMapping("/")
    public String index(Map<String, Object> model) throws Exception {
        List<Comment> comments = service.getComments();
        VueRenderer vueRenderer = new VueRenderer();
        String commentBox = vueRenderer.renderCommentBox(comments);
        model.put("content", commentBox);

        return "index";
    }
}
