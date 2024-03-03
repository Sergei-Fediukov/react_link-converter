import { IsNotEmpty, IsString } from 'class-validator'

import { ConvertTypes } from 'src/modules/types/converter'

export class UrlHealthCheckPayload {
  @IsString()
  @IsNotEmpty()
  url: string

  @IsString()
  @IsNotEmpty()
  convertType: ConvertTypes
}

export class ConvertPagePayload {
  @IsString()
  @IsNotEmpty()
  url: string

  @IsString()
  @IsNotEmpty()
  convertType: ConvertTypes
}
