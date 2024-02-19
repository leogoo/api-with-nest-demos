
import { Field, Int, ObjectType, InputType } from '@nestjs/graphql';

@ObjectType()
export class Post {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field(() => [String])
  paragraphs: string[];
}

@InputType()
export class CreatePostInput {
  @Field()
  title: string;

  @Field()
  content: string;
  
  @Field(() => [String])
  paragraphs: string[];
}