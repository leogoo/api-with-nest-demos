
import { Query, Resolver } from '@nestjs/graphql';
import { Post } from './models/post.model';
import { PostService } from './post.service';

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
}