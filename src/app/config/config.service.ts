import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {

    constructor(
        @Inject('BASE_API_URL') private baseUrl: string) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log(this.baseUrl);
        console.log(request.url);
        
        
        const apiReq = request.clone({ url: `${this.baseUrl}${request.url}` });
        return next.handle(apiReq);
    }
}