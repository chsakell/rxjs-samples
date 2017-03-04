import { ObservableCombineComponent } from './combine/observable-combine.component';
import { ObservableCreationComponent } from './observable-creation/observable-creation.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransformFilterComponent } from "./transform-filter/transform-filter.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/rxjs-create',
    pathMatch: 'full'
  },
  {
    path: 'rxjs-create',
    component: ObservableCreationComponent
  },
  {
    path: 'transform-filter',
    component: TransformFilterComponent
  },
  {
    path: 'rxjs-combine',
    component: ObservableCombineComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routedComponents = [
  ObservableCreationComponent,
  TransformFilterComponent,
  ObservableCombineComponent
  ];
