import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateChapter2Dto {
  @IsString()
  title: string;

  @IsString()
  content: string;
}
