import { RxJSComponent } from './rxjs-test/rxjs-test.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AppRoutingModule, routedComponents } from './app-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule
  ],
  declarations: [
    AppComponent,
    routedComponents,
    RxJSComponent
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
