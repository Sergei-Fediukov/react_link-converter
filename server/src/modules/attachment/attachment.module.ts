import { Global, Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { AttachmentController } from './attachment.controller'
import { AttachmentRepository } from './attachment.repository'
import { AttachmentService } from './attachment.service'
import { Attachment, AttachmentSchema } from './schemas/attachment.schema'

@Global()
@Module({
  imports: [MongooseModule.forFeature([{ name: Attachment.name, schema: AttachmentSchema }])],
  controllers: [AttachmentController],
  providers: [AttachmentService, AttachmentRepository],
  exports: [AttachmentService],
})
export class AttachmentModule {}
