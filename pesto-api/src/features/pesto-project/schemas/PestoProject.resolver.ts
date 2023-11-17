import {
  Args,
  // Int,
  ID,
  // ObjectType,
  // Parent,
  Query,
  // ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PestoProject } from './PestoProject.schema';
import { PestoProjectService } from '../pesto-project.service';
// import { PestoContent } from 'src/features/pesto-content/schemas/PestoContent.schema';
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
  @Query((returns: any) => PestoProject)
  async pestoProject(
    @Args('_id', { type: () => ID }) id: string,
  ): Promise<PestoProject> {
    return this.pestoProjectService.findOne(`${id}`);
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
   * @ResolveField : use it on properties that are not primary types [number string boolean]
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
