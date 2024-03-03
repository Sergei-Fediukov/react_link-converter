import { Global, Module } from '@nestjs/common'

import { ErrorService } from './error.service'
import { FileService } from './file.service'
import { RequestService } from './request.service'
import { TaskService } from './task.service'

@Global()
@Module({
  imports: [],
  providers: [RequestService, ErrorService, TaskService, FileService],
  exports: [RequestService, ErrorService, TaskService, FileService],
})
export class CommonModule {}
