import { DateTime } from 'luxon'
import { FilterQuery, Model } from 'mongoose'
import ms from 'ms'

import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectModel } from '@nestjs/mongoose'

import { Attachment, AttachmentDocument } from './schemas/attachment.schema'
import { AudioTypes, ConvertTypes, ImageTypes } from '../types/converter'

@Injectable()
export class AttachmentRepository {
  constructor(
    @InjectModel(Attachment.name)
    private attachmentModel: Model<AttachmentDocument>,
    private readonly configService: ConfigService,
  ) {}

  async create(fileName: string, type: ConvertTypes | ImageTypes | AudioTypes): Promise<AttachmentDocument> {
    const attachment = new this.attachmentModel({
      fileName,
      type,
      createdAt: DateTime.utc().toISO(),
      expiredAt: DateTime.utc()
        .plus(ms(this.configService.get<string>('attachment.expirationInterval')))
        .toISO(),
    })
    return await attachment.save()
  }

  async findOne(attachmentFilterQuery: FilterQuery<Attachment>): Promise<AttachmentDocument> {
    return await this.attachmentModel.findOne(attachmentFilterQuery)
  }

  async findMany(attachmentFilterQuery: FilterQuery<Attachment>): Promise<AttachmentDocument[]> {
    return await this.attachmentModel.find(attachmentFilterQuery)
  }

  async deleteOne(attachmentFilterQuery: FilterQuery<Attachment>): Promise<any> {
    return await this.attachmentModel.deleteOne(attachmentFilterQuery)
  }

  async deleteMany(attachmentFilterQuery: FilterQuery<Attachment>): Promise<any> {
    return await this.attachmentModel.deleteMany(attachmentFilterQuery)
  }
}
