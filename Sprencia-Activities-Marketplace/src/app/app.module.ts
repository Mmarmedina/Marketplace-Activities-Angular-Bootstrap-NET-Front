import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
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
import { FooterComponent } from './components/footer/footer.component';
import { ReviewsActivityComponent } from './components/reviews-activity/reviews-activity.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormNewActivityComponent } from './components/form-new-activity/form-new-activity.component';
import { FormUpdateActivityComponent } from './components/form-update-activity/form-update-activity.component';
import { PaginationActivitiesComponent } from './components/pagination-activities/pagination-activities.component';

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
    ReviewsActivityComponent,
    ReviewsActivityThumbnailComponent,
    ReviewsSprenciaComponent,
    ReviewsSprenciaThumbnailComponent,
    FormNewActivityComponent,
    FormUpdateActivityComponent,
    PaginationActivitiesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

