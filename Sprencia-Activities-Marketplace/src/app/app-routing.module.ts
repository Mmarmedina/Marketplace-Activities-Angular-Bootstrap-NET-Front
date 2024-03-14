import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { ActivityViewComponent } from './components/activity-view/activity-view.component';
import { ContactComponent } from './components/contact/contact.component';
import { FormNewActivityComponent } from './components/form-new-activity/form-new-activity.component';
import { FormUpdateActivityComponent } from './components/form-update-activity/form-update-activity.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home'},
  { path: 'home', component: HomeComponent},
  { path: 'activities/:idpost', component: ActivityViewComponent},
  { path: 'new', component: FormNewActivityComponent},
  { path: 'update', component: FormUpdateActivityComponent},
  { path: 'contact', component: ContactComponent},
  { path: '**', redirectTo:'/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
