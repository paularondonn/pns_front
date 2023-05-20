import { CUSTOM_ELEMENTS_SCHEMA, ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { ModulesModule } from './core/modules/modules.module';
import { InterceptorService } from './core/services/interceptor/interceptor.service';
import { ErrorService } from './core/services/interceptor/error.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ModulesModule,
    HttpClientModule,
    NgIdleKeepaliveModule.forRoot()
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
  { provide: ErrorHandler, useClass: ErrorService }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
