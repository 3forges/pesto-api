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
// import { PestoContent } from './PestoContent.schema';
import { PestoContent } from './PestoContent.schema';
import {
  PestoContentDeletionResponse,
  PestoContentService,
} from '../pesto-content.service';
import { UpdatePestoContentDto } from '../dto/update-pesto-content.dto';
// import { PestoContent } from 'src/features/pesto-content/schemas/PestoContent.schema';
import { InputType, Field } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { CreatePestoContentDto } from '../dto/create-pesto-content.dto';

@InputType()
export class UpdatePestoContentPayload extends UpdatePestoContentDto {
  @Field(() => ID)
  _id?: Types.ObjectId;
  @Field(() => ID)
  project_id: Types.ObjectId;
  @Field(() => ID)
  content_type_id: Types.ObjectId;
  @Field()
  name: string;
  @Field()
  frontmatter: string;
  @Field()
  markdown_content?: string;
  // @Field()
  // createdAt: Date;
  // @Field()
  // deletedAt?: Date;
}
@InputType()
export class CreatePestoContentPayload extends CreatePestoContentDto {
  // @Field(() => ID, { nullable: true })
  // _id?: Types.ObjectId;
  @Field(() => ID)
  project_id: Types.ObjectId;
  @Field(() => ID)
  content_type_id: Types.ObjectId;
  @Field()
  name: string;
  @Field()
  frontmatter: string;
  @Field()
  markdown_content?: string;
}
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
  async pestoContent(
    @Args('_id', { type: () => ID }) id: string,
  ): Promise<PestoContent> {
    return this.pestoContentService.findOne(`${id}`);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query((returns) => [PestoContent])
  async getAllPestoContents(): Promise<PestoContent[]> {
    return this.pestoContentService.findAll();
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query((returns) => [PestoContent])
  async getAllPestoContentsByProjectID(
    @Args('project_id', { type: () => ID }) project_id: string,
  ): Promise<PestoContent[]> {
    return this.pestoContentService.findAllByProjectID(project_id);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query((returns) => [PestoContent])
  async getAllPestoContentsByContentTypeID(
    @Args('content_type_id', { type: () => ID }) content_type_id: string,
  ): Promise<PestoContent[]> {
    return this.pestoContentService.findAllByContentTypeID(content_type_id);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation((returns: any) => PestoContentDeletionResponse, {
    nullable: true,
  })
  async deletePestoContent(
    @Args('_id', { type: () => ID }) id: string,
  ): Promise<PestoContentDeletionResponse> {
    return await this.pestoContentService.delete(`${id}`);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation((returns) => PestoContent)
  async updatePestoContent(
    @Args('contentUpdate')
    contentUpdate: UpdatePestoContentPayload,
  ) {
    return this.pestoContentService.update(
      `${contentUpdate._id}`,
      contentUpdate,
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation((returns) => PestoContent)
  async createPestoContent(
    @Args('contentToCreate')
    contentToCreate: CreatePestoContentPayload,
  ) {
    return this.pestoContentService.create(contentToCreate);
  }
  /*
  @ResolveField()
  async posts(@Parent() pestoContentType: PestoContent) {
    const { id } = pestoContentType;
    return this.postsService.findAll({ pestoContentTypeId: id })
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
