import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { ActivityViewComponent } from './components/activity-view/activity-view.component';
import { ContactComponent } from './components/contact/contact.component';
import { NewActivityComponent } from './components/new-activity/new-activity.component';
import { UpdateActivityComponent } from './components/update-activity/update-activity.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home'},
  { path: 'home', component: HomeComponent},
  { path: 'actividades/:idactivity', component: ActivityViewComponent},
  { path: 'nueva-actividad', component: NewActivityComponent},
  { path: 'editar-actividad', component: UpdateActivityComponent},
  { path: 'contacto', component: ContactComponent},
  { path: '**', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
