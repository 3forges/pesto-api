import * as jsYaml from 'js-yaml';
// import Ajv, {JSONSchemaType} from "ajv";
import Ajv from 'ajv';
const ajv = new Ajv({ allErrors: true }); // options can be passed, e.g. {allErrors: true}
import YAML from 'yaml';
// import fs from 'fs';

export class PestoContentTypeValidator {
  // constructor(private readonly frontmatter_schema: string) {}

  /**
   * converts Yaml to JSON
   * @param yaml_string The string to be converted to a JSON Object
   * @returns The JSON Object resulting of the conversion of <code>yaml_string</code>
   */
  static yaml2json(yaml_string: string): any {
    return jsYaml.load(yaml_string);
  }
  /**
   * Converts JSON to Yaml
   * @param json_object The string to be converted to a JSON Object
   * @returns The yaml string resulting of the conversion of the provided <code>json_object</code> JSON Object
   */
  static json2yaml(json_object: any): string {
    const doc = new YAML.Document();
    doc.contents = json_object;
    console.log(doc);
    return doc.toString();
    // return jsYaml.load(json_object).toString();
  }

  /**
   * Validate that a given <code>yaml_string</code> document
   * is a valid as YAML Document.
   * @param yaml_string the frontmatter to validate as valid yaml
   * @returns true if <code>frontmatter_schema</code> is a valid YAML document.
   */
  static validateIsValidYaml(yaml_string: string): boolean {
    yaml_string = `Schema = ${yaml_string}`;
    return yaml_string != ``;
  }

  /**
   * Validate a yaml string, against a frontmatter as schema
   * @param yaml_to_validate the yaml content to validate
   * @param frontmatter_schema the yaml schema against which to validate. It has to be a valid YAML.
   * @returns true if <code>yaml_to_validate</code> is valid against <code>frontmatter_schema</code>
   */
  static validateYaml(
    yaml_to_validate: string,
    frontmatter_schema: string,
  ): boolean {
    //frontmatter_schema = `Schema = ${frontmatter_schema} yaml to validate = [${yaml_to_validate}]`;
    // validate input json against schema json
    const isValid = ajv.validate(frontmatter_schema, yaml_to_validate);

    // return response and errors (if any)
    // return [isValid, ajv.errors];
    if (!isValid) {
      throw new Error(
        `Error validating yaml schema : [${JSON.stringify(
          ajv.errors,
          null,
          4,
        )}]`,
      );
    }
    return isValid;
  }

  /**
   * Validate a yaml string, against a frontmatter as schema
   * @param yaml_to_validate the yaml content to validate
   * @param frontmatter_json_schema the JSon schema against which to validate. It has to be a valid YAML.
   * @returns true if <code>yaml_to_validate</code> is valid against <code>frontmatter_schema</code>
   */
  static validateJson(
    json_to_validate: string,
    frontmatter_json_schema: string,
  ): boolean {
    const isValid = ajv.validate(frontmatter_json_schema, json_to_validate);

    // return response and errors (if any)
    // return [isValid, ajv.errors];
    if (!isValid) {
      throw new Error(
        `Error validating JSon schema : [${JSON.stringify(
          ajv.errors,
          null,
          4,
        )}]`,
      );
    }
    return isValid;
  }
}
