import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class AddHeaderInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {

        const response = context.switchToHttp().getResponse();
        response.setHeader('X-Custom-Header', 'CustomHeaderValue');

        return next.handle();
    }
}