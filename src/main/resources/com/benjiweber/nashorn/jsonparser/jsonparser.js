function wrapInFunction(value) function() value;
function isArray(value) typeof value == 'object' && typeof value.length != 'undefined';
function isSimpleValue(value) typeof value.class != 'undefined';
function typeForComplexValue(key, containerType) Packages.java.lang.Class.forName(containerType).getMethod(key).getReturnType().getName()
function typeForComplexArrayValue(key, containerType) Packages.java.lang.Class.forName(containerType).getMethod(key).getGenericReturnType().getActualTypeArguments()[0].getName();

function wrapValuesInFunctions(map) {
    var wrapped = {}
    for (var key in map) wrapped[key] = wrapInFunction(map[key]);
    return wrapped;
}

function parse(type, json) {

    var complexValues = {}
    var parsed = JSON.parse(json);

    for (var key in parsed) {
        if (isArray(parsed[key])) {
            if (parsed[key].length > 0 && isSimpleValue(parsed[key][0])) {
                complexValues[key] = new Packages.java.util.ArrayList(parsed[key]);
            } else {
                var array = [];
                for each (value in parsed[key]) {
                       array.push(parse(typeForComplexArrayValue(key, type), JSON.stringify(value)))
                }
                complexValues[key] = new Packages.java.util.ArrayList(array);
            }
            delete parsed[key];
        } else if (!isSimpleValue(parsed[key])) {
            complexValues[key] = parse(typeForComplexValue(key, type), JSON.stringify(parsed[key]))
            delete parsed[key]
        }
    }
    var simpleValues = wrapValuesInFunctions(parsed);
    for (var key in complexValues) {
        simpleValues[key] = wrapInFunction(complexValues[key]);
    }

    return new Packages[type](simpleValues)
};