
import { Query, Resolver, Mutation, Context, Args, Info } from '@nestjs/graphql';
import { Post, CreatePostInput } from './models/post.model';
import { PostService } from './post.service';
import { UseGuards } from '@nestjs/common';
import { GraphqlAuthGuard } from '../auth/graphQLGuard';

@Resolver(() => Post)
export class PostsResolver {
  constructor(
    private postService: PostService,
  ) {}

  @Query(() => [Post])
  async posts() {
    const posts = await this.postService.findAll();
    return posts;
  }
  
  @Mutation(() => Post)
  @UseGuards(GraphqlAuthGuard)
  async createPost(
    @Args('input') createInput: CreatePostInput,
    @Context() context,
  ) {
    return this.postService.create(createInput, context.req.user);
  }
}