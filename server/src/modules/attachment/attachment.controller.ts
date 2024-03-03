import { Controller, Get, HttpCode } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

// import { ConverterService } from 'src/modules/converter'

// import { AttachmentService } from './attachment.service'

// import { ConvertPagePayload } from './dto/request'

@ApiTags('attachment')
@Controller('/attachment')
export class AttachmentController {
  // constructor(private readonly attachmentService: AttachmentService) {}

  @Get()
  @HttpCode(201)
  async convertPage(): Promise<any> {
    // return this.attachmentService.getAttachmentByFileName(convertOptions)
  }
}
