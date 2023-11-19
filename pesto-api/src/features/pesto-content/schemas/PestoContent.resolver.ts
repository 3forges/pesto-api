import {
  Args,
  // Int,
  ID,
  // Parent,
  Query,
  // ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PestoContent } from './PestoContent.schema';
import { PestoContentService } from '../pesto-content.service';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
/**
 * Examples of resolvers : https://gist.github.com/paramsinghvc/7b0c59821084c0c8df8b0c7af469b0bc
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
@Resolver((of: any) => PestoContent)
export class PestoContentsResolver {
  constructor(private pestoContentService: PestoContentService) {}
  // private postsService: PostsService,

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query((returns: any) => PestoContent, { nullable: true })
  async pestoContent(@Args('_id', { type: () => ID }) id: string) {
    return this.pestoContentService.findOne(`${id}`);
  }

  /*
  @ResolveField()
  async posts(@Parent() pestoContent: PestoContent) {
    const { id } = pestoContent;
    return this.postsService.findAll({ pestoContentId: id })
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
