import { AppModule } from './app.module';
import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'rxjs-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {
  title = 'RxJS Samples';
}
