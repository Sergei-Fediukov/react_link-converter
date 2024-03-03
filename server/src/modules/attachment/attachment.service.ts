import * as fs from 'fs'
import { DateTime } from 'luxon'
import { join } from 'path'

import { Injectable } from '@nestjs/common'

import { AttachmentRepository } from './attachment.repository'
import { AttachmentDocument } from './schemas/attachment.schema'
import { ErrorService } from '../common'
import { AudioTypes, ConvertTypes, ImageTypes } from '../types/converter'

@Injectable()
export class AttachmentService {
  constructor(private readonly attachmentRepository: AttachmentRepository, private readonly errorService: ErrorService) {}

  private deleteFile(path: string) {
    fs.unlink(path, (err: NodeJS.ErrnoException) => {
      if (err) throw err
    })
  }

  async getAttachmentByFileName(fileName: string): Promise<AttachmentDocument> {
    return await this.attachmentRepository.findOne({ fileName })
  }

  async createAttachment(fileName: string, type: ConvertTypes | ImageTypes | AudioTypes): Promise<AttachmentDocument> {
    const alreadyExistingAttachment = await this.getAttachmentByFileName(fileName)
    if (alreadyExistingAttachment) this.errorService.throwError({ errorCode: 400 })

    return await this.attachmentRepository.create(fileName, type)
  }

  async deleteAllExpiredAttachments(): Promise<void> {
    const where = { expiredAt: { $lt: DateTime.utc().toISO() } }
    const expiredRecords = await this.attachmentRepository.findMany(where)

    if (!expiredRecords.length) return

    // Delete each expired file for expiredRecords
    for (const { fileName, type, id } of expiredRecords) {
      const attachmentFolder = join(__dirname, '../../../', 'dist/static/files')
      const filePath = `${attachmentFolder}/${type}/${fileName}.${type.toLowerCase()}`
      if (fs.existsSync(filePath)) {
        this.deleteFile(filePath)
      }
      // Check if file deleted
      if (!fs.existsSync(filePath)) {
        // Delete db record
        await this.attachmentRepository.deleteOne({ _id: id })
      }

      // Delete preview files for PDF
      if (type === ConvertTypes.PDF) {
        const filePath = `${attachmentFolder}/${ImageTypes.JPG}/${fileName}_preview.${ImageTypes.JPG.toLowerCase()}`
        if (fs.existsSync(filePath)) {
          this.deleteFile(filePath)
        }
      }
    }
    // Delete expiredRecords from DB
    // await this.attachmentRepository.deleteMany({ where: { expiredAt: { $lt: DateTime.utc().toISO() } } })
  }
}
