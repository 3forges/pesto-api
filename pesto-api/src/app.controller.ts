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

  @Get()
  getHello(): string {
    // eslint-disable-next-line prettier/prettier
    this.logger.verbose(`AppController - Iam the WINSTON LOGGER in the app controller, for the / endpoint`)
    return this.appService.getHello();
  }
}
