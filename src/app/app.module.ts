import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorHandlerInterceptor } from './core/interceptors/error-handler';
import { RouteHandlerInterceptor } from './core/interceptors/route-handler';
import { MaterialModule } from './core/material/material.module';
import { CharmsService } from './core/services/charms.service';
import { IpService } from './core/services/ip.service';
import { CountDownComponent } from './components/count-down/count-down.component';


@NgModule({
  declarations: [
    AppComponent,
    CountDownComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
  ],
  providers: [
    IpService,
    CharmsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RouteHandlerInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
