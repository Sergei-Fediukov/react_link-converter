import * as fs from 'fs'
import { HTMLBeautifyOptions, html_beautify } from 'js-beautify'
import { join } from 'path'
import puppeteer, { Page, PuppeteerLifeCycleEvent, Browser } from 'puppeteer'
import { v4 as uuid } from 'uuid'
import ytdl from 'ytdl-core'

import { Injectable, Logger } from '@nestjs/common'

import { AttachmentService } from 'src/modules/attachment'
import { AudioTypes, ConvertTypes, ImageTypes } from 'src/modules/types/converter'

import { ErrorService } from './../common/error.service'
import { RequestService } from './../common/request.service'
import { FileService } from '../common/file.service'

interface IConvertOptions {
  url: string
  convertType: ConvertTypes | ImageTypes | AudioTypes
}

interface IInitiatePageLounch {
  page: Page
  browser: Browser
}

interface IResponse {
  file: string | null
  image: string | null
}

interface ICreateResponseInput {
  url: string
  convertType: ConvertTypes | ImageTypes | AudioTypes
  attachmentFolder: string
  fileName: string
}

@Injectable()
export class ConverterService {
  constructor(
    private readonly attachmentService: AttachmentService,
    private readonly fileService: FileService,
    private readonly requestService: RequestService,
    private readonly errorService: ErrorService,
  ) { }
  private readonly logger = new Logger(ConverterService.name)

  private async initialPageLounch(url: string): Promise<IInitiatePageLounch> {
    /**
     * networkidle2:
     * Waits until there is no network activity for a short period after the page is fully loaded.
     * Expects no more than two in-flight network connections in the last 500 milliseconds.
     * It represents a more "relaxed" state, allowing a brief period of network inactivity after the initial page load.
     *
     * networkidle0:
     * Waits until there are no more network connections for a continuous period.
     * It doesn't have the same restrictions on the number of in-flight connections or the duration of inactivity as networkidle2.
     * It waits until there is no more network activity for a continuous period, potentially leading to a longer waiting time compared to networkidle2.
     */
    const waitUntil: PuppeteerLifeCycleEvent[] = ['load', 'domcontentloaded', 'networkidle2']
    // Create a browser instance
    const browser = await puppeteer.launch({ headless: 'new' })
    // Create a new page
    const page = await browser.newPage()
    // Open URL in current page
    await page.setBypassCSP(true)
    await page.goto(url, { waitUntil, timeout: 30000 })
    // To reflect CSS used for screens instead of print
    await page.emulateMediaType('screen')
    return { browser, page }
  }

  private async finalPageShutdown(browser: Browser): Promise<void> {
    // Close the browser instance
    await browser.close()
  }

  private getPath(attachmentFolder: string, fileName: string, type: ConvertTypes | ImageTypes | AudioTypes): string {
    return `${attachmentFolder}/${type}/${fileName}.${type.toLowerCase()}`
  }

  private async createPageFile(response: IResponse, { convertType, attachmentFolder, fileName, url }: ICreateResponseInput) {
    const htmlBeautifyOptions: HTMLBeautifyOptions = {
      indent_size: 2,
      wrap_line_length: 80,
      preserve_newlines: true,
      wrap_attributes: 'auto',
    }
    const { page, browser } = await this.initialPageLounch(url)
    switch (convertType) {
      case ConvertTypes.PDF: {
        // Preview image
        const imageBuffer = await page.screenshot({ omitBackground: true, fullPage: true })
        await this.fileService.folderExistenceCheck(`${attachmentFolder}/${ImageTypes.JPG}`)
        await this.fileService.createFile(this.getPath(attachmentFolder, `${fileName}_preview`, ImageTypes.JPG), imageBuffer)
        // PDF
        await this.fileService.folderExistenceCheck(`${attachmentFolder}/${convertType}`)
        await page.pdf({
          path: `${attachmentFolder}/${ConvertTypes.PDF}/${fileName}.pdf`,
          width: '100vw',
          height: '100vh',
          margin: { top: '10px', right: '10px', bottom: '10px', left: '10px' },
          printBackground: true,
          format: 'Letter',
          landscape: false,
          scale: 1
        })

        if (await this.fileService.checkFileExists(this.getPath(attachmentFolder, `${fileName}_preview`, ImageTypes.JPG))) {
          response.image = `${fileName}_preview.${ImageTypes.JPG.toLowerCase()}`
        }
        break
      }
      case ConvertTypes.IMAGE: {
        convertType = ImageTypes.JPG
        const imageBuffer = await page.screenshot({ omitBackground: true, fullPage: true })
        await this.fileService.folderExistenceCheck(`${attachmentFolder}/${convertType}`)
        await this.fileService.createFile(this.getPath(attachmentFolder, fileName, convertType), imageBuffer)

        response.image = `${fileName}.${convertType.toLowerCase()}`
        break
      }
      case ConvertTypes.HTML:
      case ConvertTypes.TXT: {
        const bodyHTML = await page.evaluate(() => document.documentElement.outerHTML)
        await this.fileService.folderExistenceCheck(`${attachmentFolder}/${convertType}`)
        await this.fileService.createFile(
          this.getPath(attachmentFolder, fileName, convertType),
          html_beautify(bodyHTML, htmlBeautifyOptions),
        )
        break
      }
    }
    await this.finalPageShutdown(browser)
    return convertType
  }

  private async createAudioFile({ convertType, attachmentFolder, fileName, url }: ICreateResponseInput) {
    switch (convertType) {
      case ConvertTypes.AUDIO: {
        convertType = AudioTypes.MP3

        const info = await ytdl.getInfo(url)
        if (!info) this.errorService.throwError({ errorCode: 404, errorMessage: 'URL is not correct or enpoint is not available' })

        await this.fileService.folderExistenceCheck(`${attachmentFolder}/${convertType}`)
        await new Promise<void>(async (resolve, reject) => {
          ytdl(url, { filter: 'audioonly', quality: 'highestaudio' })
            .pipe(fs.createWriteStream(this.getPath(attachmentFolder, fileName, convertType)))
            .on('error', (e) => reject(e))
            .on('finish', () => resolve())
        })
        return { convertType, resourceName: info.videoDetails.title }
      }
    }
  }

  async initialURLHealhCheck(url: string, convertType?: ConvertTypes | ImageTypes | AudioTypes) {
    let endpointAvailability: boolean
    if (convertType === ConvertTypes.AUDIO) {
      const lowerCasedURL = url.toLocaleLowerCase()
      endpointAvailability = lowerCasedURL.includes('youtube.com') || lowerCasedURL.includes('youtu.be')
    } else {
      endpointAvailability = await this.requestService.checkEndpointAvailability(url)
    }
    this.logger.log(`[HEALTH CHECK for type ${convertType}] URL: ${url}, AVAILABILITY: ${endpointAvailability}`)
    return endpointAvailability
  }

  async convert({ url, convertType }: IConvertOptions): Promise<{
    file: string;
    resourceName: string;
    image: string | null;
  }> {
    const endpointAvailability = await this.initialURLHealhCheck(url, convertType)

    if (!endpointAvailability) {
      this.errorService.throwError({ errorCode: 404, errorMessage: 'URL is not correct or enpoint is not available' })
    }

    const attachmentFolder = join(__dirname, '../../../', 'dist/static/files')
    await this.fileService.folderExistenceCheck(attachmentFolder)

    const fileName = uuid()
    const response: { file: string | null; image: string | null, resourceName: string | null } = { file: null, image: null, resourceName:  `${new URL(url).hostname}.${convertType.toLowerCase()}` }

    if (convertType === ConvertTypes.AUDIO) {
      const createAudioFilePayload = await this.createAudioFile({ convertType, attachmentFolder, fileName, url })
      convertType = createAudioFilePayload.convertType
      response.resourceName = createAudioFilePayload.resourceName
    } else {
      convertType = await this.createPageFile(response, { convertType, attachmentFolder, fileName, url })
    }

    if (await this.fileService.checkFileExists(this.getPath(attachmentFolder, fileName, convertType))) {
      // Create db record
      await this.attachmentService.createAttachment(fileName, convertType)
    }
    return { ...response, file: `${fileName}.${convertType.toLowerCase()}`, }
  }
}
