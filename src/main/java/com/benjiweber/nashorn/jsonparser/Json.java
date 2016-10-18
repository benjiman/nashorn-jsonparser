package com.benjiweber.nashorn.jsonparser;


import javax.script.Invocable;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;

public class Json {
    private static final String jsonParseScript =
            "function createFunc(value) function() value\n" +
                    "function iface(map) {\n" +
                    "  var ifaceImpl = {}\n" +
                    "  for (key in map) ifaceImpl[key] = createFunc(map[key]);\n" +
                    "  return ifaceImpl;\n" +
                    "}" +
                    "function parse(type, json) { return new Packages[type](iface(JSON.parse(json)))};";

    private static final ScriptEngine engine = new ScriptEngineManager().getEngineByName("nashorn");

    static {
        try {
            engine.eval(jsonParseScript);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public static class JsonParseException extends RuntimeException {
        public JsonParseException(Exception e) {
            super(e);
        }
    }

    public static <T> T parse(String json, Class<T> interfaceType) {
        try {
            return (T) ((Invocable) engine).invokeFunction("parse", interfaceType.getName(), json);
        } catch (ScriptException | NoSuchMethodException e) {
            throw new JsonParseException(e);
        }

    }
}
