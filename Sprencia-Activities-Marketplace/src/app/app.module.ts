import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ActivitiesComponent } from './components/activities/activities.component';
import { ActivityThumbnailComponent } from './components/activity-thumbnail/activity-thumbnail.component';
import { ActivityViewComponent } from './components/activity-view/activity-view.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { ReviewsActivityThumbnailComponent } from './components/reviews-activity-thumbnail/reviews-activity-thumbnail.component';
import { ReviewsSprenciaComponent } from './components/reviews-sprencia/reviews-sprencia.component';
import { ReviewsSprenciaThumbnailComponent } from './components/reviews-sprencia-thumbnail/reviews-sprencia-thumbnail.component';
import { UpdateActivityComponent } from './components/update-activity/update-activity.component';
import { FooterComponent } from './components/footer/footer.component';
import { NewActivityComponent } from './components/new-activity/new-activity.component';
import { ReviewsActivityComponent } from './components/reviews-activity/reviews-activity.component';

@NgModule({
  declarations: [
    AppComponent,
    ActivitiesComponent,
    ActivityThumbnailComponent,
    ActivityViewComponent,
    ContactComponent,
    FooterComponent,
    HomeComponent,
    NavComponent,
    NewActivityComponent,
    ReviewsActivityComponent,
    ReviewsActivityThumbnailComponent,
    ReviewsSprenciaComponent,
    ReviewsSprenciaThumbnailComponent,
    UpdateActivityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

