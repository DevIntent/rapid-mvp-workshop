import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddChildComponent } from './add-child/add-child.component';
import { ChildDetailsComponent } from './child-details/child-details.component';

const routes: Routes = [
  {path: '', component: AddChildComponent},
  {path: 'add', component: AddChildComponent},
  {path: 'child/:name', component: ChildDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
