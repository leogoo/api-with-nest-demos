
import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, OneToOne, OneToMany, ManyToMany, JoinTable} from 'typeorm';
import { Exclude } from 'class-transformer';
import Address from './address.entity';
import Post from '../../post/entities/post.entity'
import { Role } from 'src/role/entities/role.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  // Its argument is a function that returns the class of the entity that we want to make a relationship with.
  // cascade开启级联，两个表将关联起来，user表新建行时直接传入结构化的address
  @OneToOne(() => Address, { cascade: true })
  // indicates that the  User entity owns the relationship.
  // It means that the rows of the User table contain the addressId column that can keep the id of an address
  @JoinColumn()
  address: Address;

  // post.author 表示关联的是 Post 实体中的 author 属性
  @OneToMany(() => Post, (post: Post) => post.author)
  public posts: Post[];

  @ManyToMany(() => Role, (role: Role) => role.users)
  @JoinTable()
  public roles: Role[];

  @Column({
    nullable: true
  })
  @Exclude() // 序列化时会过滤掉属性
  public currentHashedRefreshToken?: string;
}
