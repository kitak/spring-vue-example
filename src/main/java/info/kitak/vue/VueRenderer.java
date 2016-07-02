package info.kitak.vue;

import jdk.nashorn.api.scripting.NashornScriptEngine;

import javax.script.*;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.List;

public class VueRenderer {
    private Object renderServerFunction;

    public VueRenderer() {
        NashornScriptEngine engine = (NashornScriptEngine) new ScriptEngineManager().getEngineByName("nashorn");
        try {
            CompiledScript compiled = engine.compile(read("static/server-bundle.js"));
            this.renderServerFunction = compiled.eval();
        } catch (ScriptException e) {
            throw new RuntimeException(e);
        }
    }

    public String renderCommentBox(List<Comment> comments) {
        NashornScriptEngine engine = (NashornScriptEngine) new ScriptEngineManager().getEngineByName("nashorn");
        try {
            ScriptContext newContext = new SimpleScriptContext();
            newContext.setBindings(engine.createBindings(), ScriptContext.ENGINE_SCOPE);
            Bindings engineScope = newContext.getBindings(ScriptContext.ENGINE_SCOPE);
            engineScope.put("renderServer", this.renderServerFunction);
            engine.setContext(newContext);
            Object html = engine.invokeFunction("renderServer", comments);
            return String.valueOf(html);
        }
        catch (Exception e) {
            throw new IllegalStateException("failed to render vue component", e);
        }

    }

    private Reader read(String path) {
        InputStream in = getClass().getClassLoader().getResourceAsStream(path);
        return new InputStreamReader(in);
    }
}
