import { join } from 'path'

import { DynamicModule, ForwardReference, Module } from '@nestjs/common'
import { ConfigModule as NestConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { Type } from '@nestjs/passport'
import { ScheduleModule } from '@nestjs/schedule'
import { ServeStaticModule } from '@nestjs/serve-static'

import { CommonModule } from 'src/modules/common/common.module'
import { ConverterModule } from 'src/modules/converter/converter.module'

import appConfig from './app.config'
import { AppController } from './app.controller'
import { AttachmentModule } from './modules/attachment/attachment.module'

const imports: (DynamicModule | Type<any> | Promise<DynamicModule> | ForwardReference<any>)[] = [
  NestConfigModule.forRoot({
    isGlobal: true,
    load: [appConfig],
    cache: true,
  }),
  ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'dist', 'static', 'files'),
  }),
  MongooseModule.forRoot(appConfig().db),
  ScheduleModule.forRoot(),
  CommonModule,
  AttachmentModule,
  ConverterModule,
]

const controllers: Type<any>[] = [AppController]

@Module({
  imports,
  controllers,
})
export class AppModule {}
