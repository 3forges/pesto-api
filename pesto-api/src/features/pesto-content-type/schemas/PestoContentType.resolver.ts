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
import { PestoContentType } from './PestoContentType.schema';
import {
  PestoContentTypeDeletionResponse,
  PestoContentTypeService,
} from '../pesto-content-type.service';
import { UpdatePestoContentTypeDto } from '../dto/update-pesto-content-type.dto';
// import { PestoContent } from 'src/features/pesto-content/schemas/PestoContent.schema';
import { InputType, Field } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { CreatePestoContentTypeDto } from '../dto/create-pesto-content-type.dto';

@InputType()
export class UpdatePestoContentTypePayload extends UpdatePestoContentTypeDto {
  @Field(() => ID)
  _id?: Types.ObjectId;
  @Field(() => ID)
  project_id: Types.ObjectId;
  @Field()
  name: string;
  @Field()
  frontmatter_definition: string;
  @Field()
  description?: string;
  // @Field()
  // createdAt: Date;
  // @Field()
  // deletedAt?: Date;
}
@InputType()
export class CreatePestoContentTypePayload extends CreatePestoContentTypeDto {
  // @Field(() => ID, { nullable: true })
  // _id?: Types.ObjectId;
  @Field(() => ID)
  project_id: Types.ObjectId;
  @Field()
  name: string;
  @Field()
  frontmatter_definition: string;
  @Field()
  description?: string;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
/**
 * Examples of resolvers : https://gist.github.com/paramsinghvc/7b0c59821084c0c8df8b0c7af469b0bc
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
@Resolver((of: any) => PestoContentType)
export class PestoContentTypesResolver {
  constructor(private pestoContentTypeService: PestoContentTypeService) {}
  // private postsService: PostsService,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query((returns: any) => PestoContentType, { nullable: true })
  async pestoContentType(
    @Args('_id', { type: () => ID }) id: string,
  ): Promise<PestoContentType> {
    return this.pestoContentTypeService.findOne(`${id}`);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query((returns) => [PestoContentType])
  async getAllPestoContentTypes(): Promise<PestoContentType[]> {
    return this.pestoContentTypeService.findAll();
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query((returns) => [PestoContentType])
  async getAllPestoContentTypesByProjectID(
    @Args('project_id', { type: () => ID }) project_id: string,
  ): Promise<PestoContentType[]> {
    return this.pestoContentTypeService.findAllByProjectID(project_id);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation((returns: any) => PestoContentTypeDeletionResponse, {
    nullable: true,
  })
  async deletePestoContentType(
    @Args('_id', { type: () => ID }) id: string,
  ): Promise<PestoContentTypeDeletionResponse> {
    return await this.pestoContentTypeService.delete(`${id}`);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation((returns) => PestoContentType)
  async updatePestoContentType(
    @Args('contentTypeUpdate')
    contentTypeUpdate: UpdatePestoContentTypePayload,
  ) {
    return this.pestoContentTypeService.update(
      `${contentTypeUpdate._id}`,
      contentTypeUpdate,
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation((returns) => PestoContentType)
  async createPestoContentType(
    @Args('contentTypeToCreate')
    contentTypeToCreate: CreatePestoContentTypePayload,
  ) {
    return this.pestoContentTypeService.create(contentTypeToCreate);
  }
  /*
  @ResolveField()
  async posts(@Parent() pestoContentType: PestoContentType) {
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
