var classByName = Packages.java.lang.Class.forName
var List = Packages.java.util.ArrayList
var Set = Packages.java.util.LinkedHashSet

function wrapInFunction(value) function() value
var System=Packages.java.lang.System;
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

function mappingToArray(propertyName, type)
    typeForObjectValue(propertyName, type).startsWith('[')

function nameOfArrayType(propertyName, type)
    typeForObjectValue(propertyName, type).substring(2).replaceAll(";$","")

function wrapValuesInFunctions(map) {
    var wrapped = {}
    for (var key in map) wrapped[key] = wrapInFunction(map[key])
    return wrapped
}

function containsObjects(array) array.length > 0 && !isSimpleValue(array[0])

function parseObjectArray(array, key, type) {
    System.out.println(typeForObjectValue(key, type));
    if (mappingToArray(key, type)) {
        return array.map(function(item) parse(
            nameOfArrayType(key, type),
            JSON.stringify(item)
        ));
    } else {
        var values = array.map(function(item) parse(
            typeForObjectArrayValue(key, type),
            JSON.stringify(item)
        ))
        return typeForObjectValue(key, type) === 'java.util.Set'
            ? new Set(values)
            : new List(values)
    }

}

function parseProperty(type, parsedJSON, property) {
    if (isArray(property.value)) {
        return containsObjects(property.value)
            ? parseObjectArray(property.value, property.name, type)
            : mappingToArray(property.name, type) ? property.value : new List(property.value)
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
