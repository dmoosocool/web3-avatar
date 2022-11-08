import { Field, ObjectType } from '@nestjs/graphql'
import { Column } from 'typeorm'

@ObjectType()
export class NameService {
  @Field()
  @Column()
  handle: string

  @Field({ defaultValue: '' })
  @Column()
  avatar: string
}
