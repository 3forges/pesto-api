/* eslint-disable prettier/prettier */
/**
 * The question is: How can I validate a frontmatter 
 * againt a typescript interface?
 * Ts interface => JSON Schema
 * Yaml => JSON 
 * JSON <=> JSON Schema
 * 
 * In this code generating JSON Schema :
 * https://github.com/3forges/pesto-api/issues/10#issuecomment-1903783684
 * I am sure i can find in Typescript Compiler API or ts-morph 
 * a way to provide getRootNodes from a ttext instead of a file.
 * 
 */
export class Converter {
  /**
   * 
   * @param string zod source code as text
   * @param frontmatter_def typescript interface as text
   */
  convertFrontmatterDefinitionFromTsToZod = (frontmatter_def: string): string => {
    let toReturn: string = ``
    console.log(`frontmatter_def=[${frontmatter_def}]`)
    toReturn =  ``
    /**
     * 
     */
    return toReturn
  }
  compile = (frontmatter: string, frontmatter_def: string): boolean => {
    let toReturn: boolean = false
    console.log(`frontmatter_def=[${frontmatter_def}]`)
    toReturn =  false
    /**
     * 
     */
    return toReturn
  }
}