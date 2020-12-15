import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class RouteHandlerInterceptor implements HttpInterceptor {

    private apiURL: string = environment.backendless.url;

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const fullURL = request.url.includes('http') ? request.url : `${this.apiURL}${request.url}`;

        request = request.clone({ url: fullURL });

        return next.handle(request);
    }
}