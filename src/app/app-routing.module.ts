import { ObservableCreationComponent } from './observable-creation/observable-creation.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/rxjs-create',
    pathMatch: 'full'
  },
  {
    path: 'rxjs-create',
    component: ObservableCreationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routedComponents = [ObservableCreationComponent];
