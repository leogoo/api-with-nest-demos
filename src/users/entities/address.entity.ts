
import { Column, Entity, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
class Address {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public street: string;

  @Column()
  public city: string;

  @Column()
  public country: string;

  // 关系反转
  @OneToOne(() => User, (user: User) => user.address)
  public user: User;
}

export default Address;