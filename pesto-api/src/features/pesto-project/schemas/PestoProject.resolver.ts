import {
  Args,
  // Int,
  ID,
  Mutation,
  // ObjectType,
  // Parent,
  Query,
  // ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PestoProject } from './PestoProject.schema';
import {
  PestoProjectDeletionResponse,
  PestoProjectService,
} from '../pesto-project.service';
import { UpdatePestoProjectDto } from '../dto/update-pesto-project.dto';
// import { PestoContent } from 'src/features/pesto-content/schemas/PestoContent.schema';
import { InputType, Field } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { CreatePestoProjectDto } from '../dto/create-pesto-project.dto';

@InputType()
export class UpdatePestoProjectPayload extends UpdatePestoProjectDto {
  @Field(() => ID)
  _id?: Types.ObjectId;
  @Field()
  name: string;
  @Field()
  description?: string;
  @Field()
  git_ssh_uri: string;
  @Field()
  git_service_provider?: string;
}
@InputType()
export class CreatePestoProjectPayload extends CreatePestoProjectDto {
  // @Field(() => ID, { nullable: true })
  // _id?: Types.ObjectId;
  @Field()
  name: string;
  @Field()
  description?: string;
  @Field()
  git_ssh_uri: string;
  @Field()
  git_service_provider?: string;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
/**
 * Examples of resolvers : https://gist.github.com/paramsinghvc/7b0c59821084c0c8df8b0c7af469b0bc
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
@Resolver((of: any) => PestoProject)
export class PestoProjectsResolver {
  constructor(private pestoProjectService: PestoProjectService) {}
  // private postsService: PostsService,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query((returns: any) => PestoProject, { nullable: true })
  async pestoProject(
    @Args('_id', { type: () => ID }) id: string,
  ): Promise<PestoProject> {
    return this.pestoProjectService.findOne(`${id}`);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query((returns) => [PestoProject])
  async getAllPestoProjects(): Promise<PestoProject[]> {
    return this.pestoProjectService.findAll();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation((returns: any) => PestoProjectDeletionResponse, { nullable: true })
  async deletePestoProject(
    @Args('_id', { type: () => ID }) id: string,
  ): Promise<PestoProjectDeletionResponse> {
    return await this.pestoProjectService.delete(`${id}`);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation((returns) => PestoProject)
  async updatePestoProject(
    @Args('projectUpdate')
    projectUpdate: UpdatePestoProjectPayload,
  ) {
    return this.pestoProjectService.update(
      `${projectUpdate._id}`,
      projectUpdate,
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation((returns) => PestoProject)
  async createPestoProject(
    @Args('projectToCreate')
    projectToCreate: CreatePestoProjectPayload,
  ) {
    return this.pestoProjectService.create(projectToCreate);
  }
  /*
  @ResolveField()
  async posts(@Parent() pestoProject: PestoProject) {
    const { id } = pestoProject;
    return this.postsService.findAll({ pestoProjectId: id })
  }*/
  /**
   * description
   * name
   * project_id
   * text
   * completedAt
   * createdAt
   * deletedAt
   **/
  /**
   * Here below an example
   * @ ResolveField : use it on properties that are not primary types [number string boolean]
   * 
    @Resolver(() => User)
    export class UserResolver {
      constructor(
        private userService: UserService,
        private albumService: AlbumService,
        private photoService: PhotoService,
      ) {}

      @Query(() => User)
      me(@CurrentUser() user: User) {
        return this.userService.findOne(user.id);
      }

      @ResolveField(() => [Album])
      albums(@Parent() user: User) {
        return this.albumService.findByUserId(user.id);
      }

      @ResolveField(() => [Photo])
      photos(@Parent() user: User) {
        return this.photoService.findByUserId(user.id);
      }
    }
 */
}
