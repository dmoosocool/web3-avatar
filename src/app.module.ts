import { Module, CacheModule } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { ConfigService } from '@nestjs/config'
// import { GraphQLModule } from '@nestjs/graphql'
// import GraphQLJSON from 'graphql-type-json'
// import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { TypeOrmModule } from '@nestjs/typeorm'
import * as RedisStore from 'cache-manager-redis-store'
// import { join } from 'path'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { LensService } from './lens/lens.service'
import { LensModule } from './lens/lens.module'
import { EnsService } from './ens/ens.service'
import { EnsModule } from './ens/ens.module'
import { CsbModule } from './csb/csb.module'
import { CsbService } from './csb/csb.service'
import { ConfigModule } from './config/config.module'
import { AvatarModule } from './avatar/avatar.module'
import { Avatar } from './avatar/avatar.entity'

@Module({
  imports: [
    CacheModule.register({
      store: RedisStore,
      url: String(process.env.REDIS_URL),
      isGlobal: true,
    }),
    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //   driver: ApolloDriver,
    //   autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    //   // resolvers: { JSON: GraphQLJSON },
    //   buildSchemaOptions: {
    //     dateScalarMode: 'timestamp',
    //   },
    // }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mongodb',
        url: configService.get('mongodb').url,
        ssl: configService.get('mongodb').ssl,
        logging: true,
        entities: [Avatar],
        synchronize: true,
      }),
    }),
    HttpModule,
    ConfigModule,
    LensModule,
    EnsModule,
    CsbModule,
    AvatarModule,
  ],
  controllers: [AppController],
  providers: [AppService, LensService, EnsService, CsbService],
})
export class AppModule {}
