import { Document } from 'mongoose'

import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'

import { AudioTypes, ConvertTypes, ImageTypes } from 'src/modules/types/converter'

export type AttachmentDocument = Attachment & Document

@Schema({ collection: 'attachment' })
export class Attachment {
  @Prop()
  fileName: string
  @Prop()
  type: ConvertTypes | ImageTypes | AudioTypes
  @Prop()
  expiredAt: string
  @Prop()
  createdAt: string
}

export const AttachmentSchema = SchemaFactory.createForClass(Attachment)
