import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const resquest = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const msg =
      exception instanceof HttpException ? exception.getResponse() : exception;

    this.logger.error(`Status: ${status} Error: ${JSON.stringify(msg)}`);
    
    response.status(status).json({
      timesstamps: new Date().toISOString(),
      path: resquest.url,
      error: msg,
    });
  }
}

// import {
//   ArgumentsHost,
//   Catch,
//   ExceptionFilter,
//   HttpException,
//   HttpStatus,
//   Logger,
// } from '@nestjs/common';

// @Catch()
// export class AllExceptionFilter implements ExceptionFilter {
//   private readonly logger = new Logger(AllExceptionFilter.name);

//   catch(exception: any, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse();
//     const request = ctx.getRequest();

//     let status = HttpStatus.INTERNAL_SERVER_ERROR;
//     let message: any = 'Internal Server Error';

//     if (exception instanceof HttpException) {
//       status = exception.getStatus();
//       message = exception.getResponse();
//     } else if (exception instanceof Error) {
//       status = HttpStatus.INTERNAL_SERVER_ERROR;
//       message = exception.message;
//     }

//     this.logger.error(`Status: ${status} Error: ${JSON.stringify(message)}`);
    
//     response.status(status).json({
//       timestamp: new Date().toISOString(),
//       path: request.url,
//       error: message,
//     });
//   }
// }

