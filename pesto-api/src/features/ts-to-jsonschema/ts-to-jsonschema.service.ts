import { Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common';
/**
 * See example at: https://github.com/3forges/poc-frontmatter-schema/blob/46c167a4055bceae79a38f03f4270c9b03310b3a/src/examples/five.ts#L41C27-L41C36
 */
import * as tsj from 'ts-json-schema-generator';
import * as fs from 'fs';
// my-constructor-parser.ts

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
  ): Promise<{ schema: string }> {
    const tsInterfaceName = tsInterfaceAsStr
      .substring(0, tsInterfaceAsStr.indexOf('{') + 1)
      .replace(`{`, ``)
      .replace(`export`, ``)
      .replace(`interface`, ``)
      .trim();
    const tsInterfacefilePath =
      path.join(tmpDir, crypto.randomBytes(16).toString('hex')) + '.ts';
    //const jsonSchemafilePath =
    //  path.join(tmpDir, crypto.randomBytes(16).toString('hex')) +
    //  '.schema.json';
    //const tsconfigfilePath =
    //  path.join(tmpDir, crypto.randomBytes(16).toString('hex')) +
    //  '.tsconfig.json';
    try {
      fs.writeFileSync(tsInterfacefilePath, tsInterfaceAsStr);
      console.log(
        `TS-TO-JSONSCHEMA SERVICE [convertToJSonSchema] method - tsInterfaceAsStr = [${tsInterfaceAsStr}] was sucessfully saved to [${tsInterfacefilePath}]`,
      );
    } catch (error) {
      let catchedErrorMessage = 'Unknown Error';
      if (error instanceof Error) catchedErrorMessage = error.message;
      // throw new Error(`${e.message}`)
      //throw new Error(`An error occured `);
      const errMsg = `TS-TO-JSONSCHEMA SERVICE [convertToJSonSchema] method - an error occured while saving [${tsInterfaceAsStr}] to filesystem in [${tsInterfacefilePath}]. The Error message is : [${catchedErrorMessage}]`;
      // throw `${errMsg}`;
      console.warn(`${errMsg}`);
      throw new HttpException(`${errMsg}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    /** @type {import('ts-json-schema-generator/dist/src/Config').Config} */
    const config = {
      path: tsInterfacefilePath, // "./.tests_assets/bigIceCreamData.ts",
      //tsconfig: tsconfigfilePath, // "./.tests_assets/tsconfig.json",
      type: `${tsInterfaceName}`, // Or <type-name> if you want to generate schema for that one type only
    };
    let schemaToReturn = null;
    let schemaString = ``;
    try {
      schemaToReturn = tsj.createGenerator(config).createSchema(config.type);
      schemaString = JSON.stringify(schemaToReturn, null, 2);
      console.log(
        `TS-TO-JSONSCHEMA SERVICE [convertToJSonSchema] method - returned schema is: [${schemaString}]`,
      );
      return {
        schema: schemaToReturn,
      };
    } catch (error) {
      let catchedErrorMessage = 'Unknown Error';
      if (error instanceof Error) catchedErrorMessage = error.message;
      // throw new Error(`${e.message}`)
      //throw new Error(`An error occured `);
      const errMsg = `TS-TO-JSONSCHEMA SERVICE [convertToJSonSchema] method - converting interface [${tsInterfaceAsStr}] to json schema resulted in an error: [${catchedErrorMessage}]`;
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
