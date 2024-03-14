import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { ActivitiesSprenciaComponent } from './activities-sprencia/activities-sprencia.component';
import { ActivitiesComponent } from './activities/activities.component';
import { ReviewsSprenciaComponent } from './reviews-sprencia/reviews-sprencia.component';
import { ThumbnailActivityComponent } from './thumbnail-activity/thumbnail-activity.component';
import { ReviewActivityComponent } from './review-activity/review-activity.component';
import { ActivityThumbnailComponent } from './activity-thumbnail/activity-thumbnail.component';
import { ReviewSprenciaThumbnailComponent } from './review-sprencia-thumbnail/review-sprencia-thumbnail.component';
import { FooterComponent } from './footer/footer.component';
import { ContactComponent } from './contact/contact.component';
import { ViewActivityComponent } from './view-activity/view-activity.component';
import { ActivityViewComponent } from './activity-view/activity-view.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    ActivitiesSprenciaComponent,
    ActivitiesComponent,
    ReviewsSprenciaComponent,
    ThumbnailActivityComponent,
    ReviewActivityComponent,
    ActivityThumbnailComponent,
    ReviewSprenciaThumbnailComponent,
    FooterComponent,
    ContactComponent,
    ViewActivityComponent,
    ActivityViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
