import {
  BadRequestException,
  ForbiddenException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  PreconditionFailedException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common'

interface IThrowErrorOptions {
  errorCode: number
  errorMessage?: string
}

@Injectable()
export class ErrorService {
  throwError({ errorCode, errorMessage }: IThrowErrorOptions): void {
    const message = errorMessage || ''
    switch (errorCode) {
      case HttpStatus.BAD_REQUEST:
        throw new BadRequestException(message)
      case HttpStatus.UNAUTHORIZED:
        throw new UnauthorizedException(message)
      case HttpStatus.FORBIDDEN:
        throw new ForbiddenException(message)
      case HttpStatus.NOT_FOUND:
        throw new NotFoundException(message)
      case HttpStatus.PRECONDITION_FAILED:
        throw new PreconditionFailedException(message)
      case HttpStatus.UNPROCESSABLE_ENTITY:
        throw new UnprocessableEntityException(message)
      case HttpStatus.INTERNAL_SERVER_ERROR:
        throw new InternalServerErrorException(message)
    }
  }
}
