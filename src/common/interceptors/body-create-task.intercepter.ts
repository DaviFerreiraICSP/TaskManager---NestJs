import { CallHandler, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import { Injectable, NestInterceptor } from "@nestjs/common";

@Injectable()
export class BodyCreateTaskInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest();
        const { method, url, body } = request;

        console.log(`[REQUEST] [${method}] ${url} - Body:`, body); 

        return next.handle();
    }
}