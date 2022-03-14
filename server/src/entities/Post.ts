import { Field, Int, ObjectType } from "type-graphql";
import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
} from "typeorm";
import { User } from "./Users";

@ObjectType()
@Entity()
export class Post extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  title!: string;

  @Field()
  @Column()
  text!: string;

  @Field()
  @Column({ type: "int", default: 0 })
  points!: number;

  @Field()
  @Column({ type: "int" })
  creatorId: number;

  @Field()
  @ManyToOne(() => User, (user) => user.posts)
  creator: User;

  @Field(() => String)
  @CreateDateColumn({ type: "date" })
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn({ type: "date" })
  updatedAt: Date;
}
