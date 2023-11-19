import { Module } from '@nestjs/common';
import { PestoProjectController } from './pesto-project.controller';
import { PestoProjectService } from './pesto-project.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PestoProject,
  PestoProjectSchema,
} from './schemas/PestoProject.schema';
import { PestoProjectsResolver } from './schemas/PestoProject.resolver';

@Module({
  controllers: [PestoProjectController],
  providers: [
    PestoProjectService,
    PestoProjectsResolver,
    // PestoProjectListResolver,
  ],
  imports: [
    // registers the controller into the module
    MongooseModule.forFeature([
      { name: PestoProject.name, schema: PestoProjectSchema },
    ]),
  ],
})
export class PestoProjectModule {}
