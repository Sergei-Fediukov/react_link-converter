import { Module } from '@nestjs/common'

import { ConverterService } from 'src/modules/converter'

import { ConverterController } from './converter.controller'

@Module({
  imports: [],
  controllers: [ConverterController],
  providers: [ConverterService],
  exports: [ConverterService],
})
export class ConverterModule {}
