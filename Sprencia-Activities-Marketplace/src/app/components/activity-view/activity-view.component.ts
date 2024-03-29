import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Activity } from '../../interfaces/activity.interface';
import { ActivitiesService } from '../../services/activities.service';
import { Review } from '../../interfaces/review.interface';

@Component({
  selector: 'app-activity-view',
  templateUrl: './activity-view.component.html',
  styleUrl: './activity-view.component.css'
})

export class ActivityViewComponent {
  activity: Activity | undefined;
  dateFormated: string;
  reviewsActivity!: Review[] | undefined;
  

  constructor(
    private activatedRoute: ActivatedRoute, 
    private activitiesService: ActivitiesService){      
      this.dateFormated = '';
  }

  async ngOnInit() {
    this.activatedRoute.params.subscribe(async (params: any) => {
      const id = parseInt(params.idactivity);

      this.activity = await this.activitiesService.getById(params.idactivity);
      console.log (this.activity);

      // Array sólo con la información de las opiniones de la actividad (para pintar las opiniones).
      this.reviewsActivity = this.getReviews(this.activity);
      console.log(this.reviewsActivity);
      
      this.formatDate();     
      
    })
  }

  
  getReviews (activity: Activity): Review [] | undefined {
    const reviewDates = this.activity?.review.map(review => review);
    return reviewDates;
  }

  getReviewDates (activity: Activity): Date [] {
    const reviewDates = activity.review.map(review => review.date);
    return reviewDates;
  }

  formatDate() {
    this.reviewsActivity?.forEach(review => {
      const dateObject = new Date(review.date);
      const day = dateObject.getDate();
      const monthNumber = dateObject.getMonth();
      const year = dateObject.getFullYear();

      const months = [
        "enero",
        "febrero", 
        "marzo", 
        "abril", 
        "mayo", 
        "junio",
        "julio", 
        "agosto", 
        "septiembre", 
        "octubre", 
        "noviembre", 
        "diciembre"
      ];
      
      // En JavaScript, los meses se representan como números enteros del 0 al 11.
      // Si monthNumber es 0, months[monthNumber] devolverá 'enero'
      // se está utilizando monthNumber como índice para acceder al nombre del mes correspondiente en el array months.

      const monthName = months[monthNumber];

      this.dateFormated = `${day} de ${monthName} de ${year}`;
      console.log (this.dateFormated);    

    })  

  }
}
