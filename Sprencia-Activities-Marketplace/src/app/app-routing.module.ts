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
  { path: 'actividades/:idactivity', component: ActivityViewComponent},
  { path: 'nueva-actividad', component: FormNewActivityComponent},
  { path: 'editar-actividad/:idactivity', component: FormUpdateActivityComponent},
  { path: 'contacto', component: ContactComponent},
  { path: '**', redirectTo: '/home'}
];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled' })],
  exports: [RouterModule]
})


export class AppRoutingModule { }
