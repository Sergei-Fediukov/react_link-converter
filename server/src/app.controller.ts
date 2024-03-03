import { Controller, Get, HttpCode } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ApiExcludeEndpoint } from '@nestjs/swagger'

@Controller()
export class AppController {
  constructor(private readonly configService: ConfigService) {}

  @ApiExcludeEndpoint()
  @Get('/')
  @HttpCode(200)
  async healthCheck() {
    const uptime = process.uptime()
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Server Page</title>
        <meta charset="utf-8" />
    </head>
    <body>
        <h1>Converter server is running on port: ${this.configService.get('port')}</h1>
        <div>Uptime: ${uptime}</div>
    </body>
    <html>`
  }
}
