import { Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common';

import * as tsj from 'ts-json-schema-generator'
import * as fs from 'fs';
// my-constructor-parser.ts
import { SubNodeParser } from "ts-json-schema-generator";
// use typescript exported by TJS to avoid version conflict
/////////import ts from "ts-json-schema-generator";
import { createProgram, createParser, SchemaGenerator, createFormatter } from "ts-json-schema-generator";

import path from 'path';
import crypto from 'crypto';
import os from 'os';
const tmpDir = os.tmpdir?.();
/**
 * Converts typescript interface to zod schema, just like https://github.com/ritz078/transform/blob/c6e0748bad06a31373e2a8324a764e9467646742/pages/api/typescript-to-zod.ts#L17
 */
@Injectable()
export class TsToJSonSchemaService {
  // static tmpDir = os.tmpdir?.();
  constructor() {}
  async convertToJSonSchema(
    tsInterfaceAsStr: string,
  ): Promise<{ schema: string; error: string }> {
    
    const tsInterfaceName = tsInterfaceAsStr.substring(0, tsInterfaceAsStr.indexOf("{") + 1).replace(`{`, ``).replace(`export`, ``).replace(`interface`, ``).trim();

    const tmpDir = os.tmpdir?.();
    const tsInterfacefilePath =
      path.join(tmpDir, crypto.randomBytes(16).toString('hex')) + '.ts';
    const jsonSchemafilePath =
      path.join(tmpDir, crypto.randomBytes(16).toString('hex')) + '.schema.json';
    const tsconfigfilePath =
      path.join(tmpDir, crypto.randomBytes(16).toString('hex')) + '.tsconfig.json';
    console.log(
      `TS-TO-JSONSCHEMA SERVICE [convertToJSonSchema] method - tsInterfacefilePath = [${tsInterfacefilePath}]`,
    );
    console.log(
      `TS-TO-JSONSCHEMA SERVICE [convertToJSonSchema] method - tsInterfacefilePath = [${tsInterfacefilePath}]`,
    );
    /** @type {import('ts-json-schema-generator/dist/src/Config').Config} */
    const config = {
      path: tsInterfacefilePath,// "./.tests_assets/bigIceCreamData.ts",
      tsconfig: tsconfigfilePath,// "./.tests_assets/tsconfig.json",
      type: `${tsInterfaceName}`, // Or <type-name> if you want to generate schema for that one type only
    };
    try {
      const schemaGenerator = generate({
        // sourceText: `export interface whatever {
        //       name: string,
        //       surname?: string,
        //       date_of_birth: date
        //   }`,
        sourceText: tsInterfaceAsStr,
        keepComments: false,
        skipParseJSDoc: true,
      });
      // schemaGenerator.transformedSourceText
      console.log(
        `TS-TO-JSONSCHEMA SERVICE [convertToJSonSchema] method - schemaGenerator.transformedSourceText [${schemaGenerator.transformedSourceText}]`,
      );
      schemaGenerator.transformedSourceText;
      console.log(
        `TS-TO-JSONSCHEMA SERVICE [convertToJSonSchema] method - schemaGenerator.transformedSourceText [${schemaGenerator.transformedSourceText}]`,
      );

      const nonFormatttedZodschema =
        schemaGenerator.getZodSchemasFile(filePath);
      console.log(
        `TS-TO-JSONSCHEMA SERVICE [convertToJSonSchema] method - schemaGenerator.getZodSchemasFile returns [${nonFormatttedZodschema}]`,
      );
      const formattedSchema = nonFormatttedZodschema
        .split(/\r?\n/)
        .slice(1)
        .join('\n');
      console.log(
        `TS-TO-JSONSCHEMA SERVICE [convertToJSonSchema] method - formattedSchema = [${formattedSchema}]`,
      );

      return {
        schema: formattedSchema,
        error: schemaGenerator.errors[0],
      };
    } catch (error) {
      let catchedErrorMessage = 'Unknown Error';
      if (error instanceof Error) catchedErrorMessage = error.message;
      // throw new Error(`${e.message}`)
      //throw new Error(`An error occured `);
      const errMsg = `TS-TO-JSONSCHEMA SERVICE [convertToJSonSchema] method - converting interface [${tsInterfaceAsStr}] to zod schema resulted in an error: [${catchedErrorMessage}]`;
      // throw `${errMsg}`;
      console.warn(`${errMsg}`);
      throw new HttpException(`${errMsg}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    /*
    if (id == ``) {
      const errMsg = `TS-TO-JSONSCHEMA SERVICE [convertToJSonSchema] method - converting interface [${tsInterfaceAsStr}] to zod schema resulted in an error`;
      // throw `${errMsg}`;
      console.warn(`${errMsg}`);
      throw new HttpException(`${errMsg}`, HttpStatus.NOT_ACCEPTABLE);
    }
      */
    // return await this.model.findById(id).exec();
  }
}
