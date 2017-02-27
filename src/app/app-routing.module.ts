import { RxJSComponent } from './rxjs-test/rxjs-test.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/rxjs',
    pathMatch: 'full'
  },
  {
    path: 'rxjs',
    component: RxJSComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routedComponents = [RxJSComponent];
