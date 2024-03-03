import { Injectable, Logger } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'

import { AttachmentService } from '../attachment'

const RETRY_ATTEMPTS = 3
const EVERY_15_MINUTES = '*/15 * * * *'

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name)
  constructor(private readonly attachmentService: AttachmentService) {}

  async withRetry<T>(fn: () => Promise<T>): Promise<void> {
    let counter = 0
    let success = false
    while (counter <= RETRY_ATTEMPTS - 1 && !success) {
      try {
        await fn()
        success = true
      } catch (e) {
        counter++
        this.logger.debug(`RETRY ATTEMPT NUMBER: ${counter}`)
        this.logger.debug(`FAIL REASON: ${e}`)
      }
    }
  }

  async deleteAllExpiredFiles(): Promise<void> {
    this.logger.debug('Files deleting started')
    await this.attachmentService.deleteAllExpiredAttachments()
    this.logger.debug('Files deleting finished')
  }

  @Cron(EVERY_15_MINUTES)
  async cronDeleteAllExpiredFiles(): Promise<void> {
    await this.withRetry(this.deleteAllExpiredFiles.bind(this))
  }
}
