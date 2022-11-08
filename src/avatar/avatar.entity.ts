import { Field, ObjectType } from '@nestjs/graphql'
import { Entity, Column, ObjectIdColumn, ObjectID } from 'typeorm'
import { NameService } from './inputs/name-service.input'

@Entity()
@ObjectType()
export class Avatar {
  @ObjectIdColumn()
  _id?: ObjectID

  @Field()
  @Column()
  address: string

  @Column(() => NameService)
  @Field(() => NameService)
  ens: NameService

  @Column(() => NameService)
  @Field(() => NameService)
  csb: NameService

  @Column(() => NameService)
  @Field(() => NameService)
  lens: NameService
}
