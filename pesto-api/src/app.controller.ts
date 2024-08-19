import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston/dist/winston.constants';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}
  @Get('cheerup')
  getCheerUp(): Promise<string> {
    this.appService.doSomethingSync(`[getCheerUp()]`);
    this.appService.doSomething(`[getCheerUp()]`);
    // eslint-disable-next-line prettier/prettier
    this.logger.verbose(`AppController - Iam the WINSTON LOGGER in the app controller, for the / endpoint`)
    return this.appService.getCheerUp();
  }
  @Get()
  async getHello(): Promise<string> {
    await this.appService.doSomething(`[getHello()]`);
    this.appService.doSomethingSync(`[getHello()]`);
    // eslint-disable-next-line prettier/prettier
    this.logger.verbose(`AppController - Iam the WINSTON LOGGER in the app controller, for the / endpoint`)
    return await this.appService.getHello();
  }
}
