var classByName = Packages.java.lang.Class.forName
var List = Packages.java.util.ArrayList
function wrapInFunction(value) function() value

function isArray(value)
    typeof value === 'object' &&
    typeof value.length !== 'undefined'

function isSimpleValue(value) typeof value.class !== 'undefined'

function typeForObjectValue(key, containerType)
    classByName(containerType)
        .getMethod(key)
        .getReturnType()
        .getName()

function typeForObjectArrayValue(key, containerType)
    classByName(containerType)
        .getMethod(key)
        .getGenericReturnType()
        .getActualTypeArguments()[0]
        .getName()

function wrapValuesInFunctions(map) {
    var wrapped = {}
    for (var key in map) wrapped[key] = wrapInFunction(map[key])
    return wrapped
}

function containsObjects(array) array.length > 0 && !isSimpleValue(array[0])

function parseObjectArray(array, key, type) {
    return new List(
        array.map(function(item) parse(
            typeForObjectArrayValue(key, type),
            JSON.stringify(item)
        ))
    )
}

function parseProperty(type, parsedJSON, property) {
    if (isArray(property.value)) {
        return containsObjects(property.value)
                ? parseObjectArray(property.value, property.name, type)
                : new List(property.value)
    } else if (!isSimpleValue(property.value)) {
        return parse(typeForObjectValue(property.name, type), JSON.stringify(property.value))
    } else {
        return property.value
    }
}

function parse(type, json) {
    var parsed = JSON.parse(json)

    for (var key in parsed) {
        parsed[key] = parseProperty(type, parsed, { name: key, value: parsed[key] })
    }

    return new Packages[type](wrapValuesInFunctions(parsed))
}
