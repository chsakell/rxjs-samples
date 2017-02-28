import { ObservableCreationComponent } from './observable-creation/observable-creation.component';
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
    ObservableCreationComponent
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
