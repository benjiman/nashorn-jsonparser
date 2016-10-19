nashorn-jsonparser
===========

Example using Nashorn to parse JSON strings to Java interfaces.

Supports nested objects and arrays.

```java
  public interface Person {
      String firstName();
      String lastName();
  }

  @Test
  public void example_parsing_person_json_using_nashorn() {
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
  public void example_parsing_colour_json_using_nashorn() {
      String json = "{ \"red\": 5, \"green\": 2, \"blue\": 9 }";

      Colour colour = Json.parse(json, Colour.class);

      assertEquals(5, colour.red());
      assertEquals(2, colour.green());
      assertEquals(9, colour.blue());
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
```

Requires Java 8.