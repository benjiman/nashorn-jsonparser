nashorn-jsonparser
===========

Example using Nashorn to parse JSON strings to Java interfaces.

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

```

Requires Java 8.