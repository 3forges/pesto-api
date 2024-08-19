import { Inject, Injectable, Logger as NestJsLogger } from '@nestjs/common';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston/dist/winston.constants';

@Injectable()
export class AppService {
  private readonly nestjsLogger = new NestJsLogger(AppService.name);
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}
  async doSomething(callerMessage: string): Promise<void> {
    const tesMsg = `APP SERVICE [doSomething] - I am an asynchrone service method defined in the app service, and called by [${callerMessage}] !`;
    // throw `${errMsg}`;
    this.logger.verbose(`${tesMsg}`);
    this.nestjsLogger.verbose(`nestjs logger - ${tesMsg}`);
    // eslint-disable-next-line prettier/prettier
    // throw new Error('APP SERVICE [doSomething] - I am an error thrown in the data service method')
  }
  doSomethingSync(callerMessage: string): void {
    const tesMsg = `APP SERVICE [doSomethingSync] - I am a synchrone service method in the app service, and called by [${callerMessage}] !`;
    // throw `${errMsg}`;
    this.logger.verbose(`${tesMsg}`);
    this.nestjsLogger.verbose(`nestjs logger - ${tesMsg}`);
    // eslint-disable-next-line prettier/prettier
    // throw new Error('APP SERVICE [doSomething] - I am an error thrown in the data service method')
  }

  getHello(): any {
    return { hello: 'Hello World!' };
  }
  getCheerUp(): any {
    const tesMsg = `APP SERVICE [getCheerUp] - I am another service method`;
    // throw `${errMsg}`;
    this.logger.verbose(`${tesMsg}`);
    return { cheerup: "Thumbs Up, We're the best!" };
  }
}
