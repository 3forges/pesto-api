import { Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common';

import { generate } from 'ts-to-zod';
import path from 'path';
import crypto from 'crypto';
import os from 'os';
const tmpDir = os.tmpdir?.();
/**
 * Converts typescript interface to zod schema, just like https://github.com/ritz078/transform/blob/c6e0748bad06a31373e2a8324a764e9467646742/pages/api/typescript-to-zod.ts#L17
 */
@Injectable()
export class TsToZodService {
  // static tmpDir = os.tmpdir?.();
  constructor() {}
  async convertToZod(
    tsInterfaceAsStr: string,
  ): Promise<{ schema: string; error: string }> {
    const filePath =
      path.join(tmpDir, crypto.randomBytes(16).toString('hex')) + '.ts';
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
        `JBL DEBUG: schemaGenerator.transformedSourceText [${schemaGenerator.transformedSourceText}]`,
      );
      schemaGenerator.transformedSourceText;
      console.log(
        `JBL DEBUG: schemaGenerator.transformedSourceText [${schemaGenerator.transformedSourceText}]`,
      );

      const schema = schemaGenerator.getZodSchemasFile(filePath);
      console.log(
        `JBL DEBUG: schemaGenerator.getZodSchemasFile returns [${schema}]`,
      );
      const formattedSchema = schema.split(/\r?\n/).slice(1).join('\n');
      console.log(`JBL DEBUG: formattedSchema = [${formattedSchema}]`);

      return { schema: formattedSchema, error: schemaGenerator.errors[0] };
    } catch (error) {
      let catchedErrorMessage = 'Unknown Error';
      if (error instanceof Error) catchedErrorMessage = error.message;
      // throw new Error(`${e.message}`)
      //throw new Error(`An error occured `);
      const errMsg = `TS-TO-ZOD SERVICE [convertToZod] method - converting interface [${tsInterfaceAsStr}] to zod schema resulted in an error: [${catchedErrorMessage}]`;
      // throw `${errMsg}`;
      console.warn(`${errMsg}`);
      throw new HttpException(`${errMsg}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    /*
    if (id == ``) {
      const errMsg = `TS-TO-ZOD SERVICE [convertToZod] method - converting interface [${tsInterfaceAsStr}] to zod schema resulted in an error`;
      // throw `${errMsg}`;
      console.warn(`${errMsg}`);
      throw new HttpException(`${errMsg}`, HttpStatus.NOT_ACCEPTABLE);
    }
      */
    // return await this.model.findById(id).exec();
  }
}
