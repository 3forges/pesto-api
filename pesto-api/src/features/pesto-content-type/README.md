
# The `PestoContentType` dirty secrets

There is one thing I need:

* when i create a new `PestoContentType`, I need to associate to it a frontmatter: I will support yaml and json, we will see later for toml
* The question is: how do i send the yaml schema with an HTTP request ? my best guess would be to send the yaml schema
* Now, once i have my yaml shcema, i can transform that into a json object, that i can store into the MongoDB :
  * how do I store it ? as an object to map with mongoose no, it would mean i need to dynamically create schema, dto, controller, service, etc...
  * That's why I will store the schema as pure text into the Database
  * Now, the `frontmatter_schema` field of the `PestoContentType`, will be used like this :
    * when I receive the HTTP request to create the `PestoContentType`:
      * before saving to mongoDB the new record,
      * I validate that either the `frontmatter_json` is a valid JSON, or `frontmatter_yaml` is a valid YAML.
      * then I record either of frontmatter

Tutorials on how to work with yaml files, and yaml schemas :

* convert yaml to json, and vice-versa using `js-yaml` : <https://rishabhawt.medium.com/reading-and-writing-yaml-2cf4206df4f2>
* validate JSON Schema using [`AJV]` : https://scriptable.com/how-to-validate-yaml-input-with-nodejs-schema/
* Using `AJV` in `TypeScript`: <https://ajv.js.org/guide/typescript.html>
* How to use enums in a `NestJs` DTO, also with `@nestjs/swagger` : <https://stackoverflow.com/questions/68544666/nestjs-swagger-show-all-enum-values>
* In this one i found how to reference Class instances instead of just primary types, and how to build  : https://medium.com/@haadbaig/composite-compound-keys-in-mongodb-using-mongoose-in-nestjs-bc82e5f500d9