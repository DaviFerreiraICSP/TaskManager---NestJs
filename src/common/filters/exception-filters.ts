import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Response, Request} from 'express'
import { timestamp } from "rxjs";
import { json } from "stream/consumers";

@Catch(HttpException)
export class ApiExceptionFilter implements ExceptionFilter{
    catch(exception: HttpException, host: ArgumentsHost) {
        
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>()
        const request = ctx.getRequest<Request>()
        const status = exception.getStatus();
        const errorResponse = exception.getResponse();

        response.status(400).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            message: errorResponse != "" ? errorResponse: "Erro on realizig this operation",
            path: request.url
        })


    }
}