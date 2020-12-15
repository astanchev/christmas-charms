import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })
  export class ErrorHandlerInterceptor implements HttpInterceptor {

    constructor(private snackbar: MatSnackBar) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next
                .handle(req)
                .pipe(catchError((err) => {
                        this.snackbar.open(err.error?.message, 'Cancel', {
                        duration: 5000
                        });
                        throw err;
                }));
    }
  }
