package com.benjiweber.nashorn.jsonparser;

import org.junit.Test;

import java.util.Collections;
import java.util.List;

import static org.junit.Assert.*;

public class JsonTest {

    public interface Person {
        String firstName();
        String lastName();
    }

    @Test
    public void example_parsing_person_json() {
        String json = "{ \"firstName\": \"benji\", \"lastName\": \"weber\" }";
        Person person = Json.parse(json, Person.class);
        assertEquals("benji", person.firstName());
        assertEquals("weber", person.lastName());
    }


    public interface Colour {
        int red();
        int green();
        int blue();
    }
    @Test
    public void example_parsing_colour_json() {
        String json = "{ \"red\": 5, \"green\": 2, \"blue\": 9 }";
        Colour colour = Json.parse(json, Colour.class);
        assertEquals(5, colour.red());
        assertEquals(2, colour.green());
        assertEquals(9, colour.blue());
    }


    public interface Customer {
        int id();
        Person person();
    }

    @Test
    public void example_parsing_nested_json() {
        String json = "{ \"id\": 1111, \"person\": { \"firstName\": \"benji\", \"lastName\": \"weber\" } }";
        Customer customer = Json.parse(json, Customer.class);
        assertEquals(1111, customer.id());
        assertEquals("benji", customer.person().firstName());
        assertEquals("weber", customer.person().lastName());
    }

    public interface SimpleArray {
        List<Integer> ids();
    }
    @Test
    public void example_parsing_with_array() {
        String json = "{ \"ids\": [1111, 2222] }";
        SimpleArray example = Json.parse(json, SimpleArray.class);
        assertEquals(Integer.valueOf(1111), example.ids().get(0));
        assertEquals(Integer.valueOf(2222), example.ids().get(1));
    }


    public interface WithArrays{
        List<Person> people();
    }
    @Test
    public void example_parsing_nested_json_with_array() {
        String json = "{ \"people\": [ { \"firstName\": \"benji\", \"lastName\": \"weber\" },  { \"firstName\": \"bob\", \"lastName\": \"McBobFace\" } ] }";
        WithArrays example = Json.parse(json, WithArrays.class);
        assertEquals("benji", example.people().get(0).firstName());
        assertEquals("weber", example.people().get(0).lastName());
        assertEquals("bob", example.people().get(1).firstName());
        assertEquals("McBobFace", example.people().get(1).lastName());
    }

    @Test
    public void example_parsing_with_empty_array() {
        String json = "{ \"ids\": [] }";
        SimpleArray example = Json.parse(json, SimpleArray.class);
        assertEquals(Collections.emptyList(), example.ids());
    }


    public interface ArrayProperty {
        int[] ids();
    }
    @Test
    public void example_parsing_with_array_to_array() {
        String json = "{ \"ids\": [1111, 2222] }";
        ArrayProperty example = Json.parse(json, ArrayProperty.class);
        assertEquals(1111, example.ids()[0]);
        assertEquals(2222, example.ids()[1]);
    }

    public interface WithArraysToArray{
        Person[] people();
    }
    @Test
    public void example_parsing_nested_json_with_array_to_array() {
        String json = "{ \"people\": [ { \"firstName\": \"benji\", \"lastName\": \"weber\" },  { \"firstName\": \"bob\", \"lastName\": \"McBobFace\" } ] }";
        WithArraysToArray example = Json.parse(json, WithArraysToArray.class);
        assertEquals("benji", example.people()[0].firstName());
        assertEquals("weber", example.people()[0].lastName());
        assertEquals("bob", example.people()[1].firstName());
        assertEquals("McBobFace", example.people()[1].lastName());
    }


}
