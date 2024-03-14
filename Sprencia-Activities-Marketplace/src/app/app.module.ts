import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ActivitiesComponent } from './components/activities/activities.component';
import { ActivitiesThumbnailComponent } from './components/activities-thumbnail/activities-thumbnail.component';
import { ActivityViewComponent } from './components/activity-view/activity-view.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormNewActivityComponent } from './components/form-new-activity/form-new-activity.component';
import { FormUpdateActivityComponent } from './components/form-update-activity/form-update-activity.component';
import { NavComponent } from './components/nav/nav.component';
import { ReviewsSprenciaComponent } from './components/reviews-sprencia/reviews-sprencia.component';
import { ReviewsSprenciaThumbnailComponent } from './components/reviews-sprencia-thumbnail/reviews-sprencia-thumbnail.component';
import { ReviewsActivityComponent } from './components/reviews-activity/reviews-activity.component';


@NgModule({
  declarations: [
    AppComponent,
    ActivitiesComponent,
    ActivitiesThumbnailComponent,
    ActivityViewComponent,
    ContactComponent,
    FooterComponent,
    FormNewActivityComponent,
    FormUpdateActivityComponent,
    NavComponent,
    ReviewsSprenciaComponent,
    ReviewsSprenciaThumbnailComponent,
    ReviewsActivityComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
