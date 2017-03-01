import { ObservableCreationComponent } from './observable-creation/observable-creation.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AppRoutingModule, routedComponents } from './app-routing.module';
import { TransformFilterComponent } from "./transform-filter/transform-filter.component";

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
    ObservableCreationComponent,
    TransformFilterComponent
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
