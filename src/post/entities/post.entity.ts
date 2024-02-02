import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, Index } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
class Post {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  @Index('title_index')
  public title: string;

  @Column()
  public content: string;

  @Column({type: 'varchar', array: true, nullable: true })
  public paragraphs: string[];

  @ManyToOne(() => User, (author: User) => author.posts)
  public author: User;
}

export default Post;