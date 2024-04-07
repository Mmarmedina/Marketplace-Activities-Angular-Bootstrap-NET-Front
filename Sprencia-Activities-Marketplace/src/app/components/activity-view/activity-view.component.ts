import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Activity } from '../../interfaces/activity.interface';
import { ActivitiesService } from '../../services/activities.service';
import { Review, ReviewFormatted } from '../../interfaces/review.interface';
import { formatDate } from '../../utils/date-helper';

@Component({
  selector: 'app-activity-view',
  templateUrl: './activity-view.component.html',
  styleUrl: './activity-view.component.css'
})

export class ActivityViewComponent {
  activity: Activity | undefined;
  reviewsActivity: Review[] | undefined;
  reviewDateTypeString: string;
  numberOfReviews!: number | undefined;

  reviewsActivityFormatted: ReviewFormatted[] | undefined;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private activitiesService: ActivitiesService){   
      this.reviewsActivity = [];
      this.reviewsActivityFormatted = [];
      this.reviewDateTypeString = '';
  }

  async ngOnInit() {
    this.activatedRoute.params.subscribe(async (params: any) => {
      // MMM Convertir tipo entero el parámetro variable de la url (params)
      const id = parseInt(params.idactivity);
      
      // MMM Recuperar datos de la actividad (actividad, horarios y opiniones).
      this.activity = await this.activitiesService.getById(params.idactivity);
      console.log (this.activity);

      // MMM Si el servicio devuelve una actividad, del objeto activividad me quedo sólo con la información de las opiniones de la actividad (para pintar las opiniones).
      this.reviewsActivity = this.getReviews(this.activity);
      console.log(this.reviewsActivity);

      // MMM Se crea un objeto tipo ReviewFormatted: es igual que Review pero con la fecha tipo string. 
      // MMM El objetivo es poder pintar todos los datos de las opiniones de la actividad, incluida la fecha formateada.
      this.reviewsActivityFormatted = this.mapToReviewsActivityFormated(this.reviewsActivity || []);
      console.log (this.reviewsActivityFormatted); 

      // MMM Mostrar en la cabecera de la página (arriba de la página) el número de opiniones.
      this.numberOfReviews = this.getNumberOfReviews(this.reviewsActivity);
      console.log (this.numberOfReviews);      
    })
  }

  // MMM Del objeto activity, quedarme sólo con las opiniones.
  getReviews (activity: Activity): Review [] | undefined {
    if (this.activity){
      this.reviewsActivity = this.activity?.review.map(review => review);
    }    
    return this.reviewsActivity;
  }

  // MMM Método que devuelve el número de reviews que tiene una actividad.
  getNumberOfReviews (reviewsActivity: Review[] | undefined): number | undefined {
    const numberOfReviews = reviewsActivity?.length;
    return numberOfReviews;
  }

  mapToReviewsActivityFormated (reviewsActivity: Review[]): ReviewFormatted [] | undefined {
    reviewsActivity.forEach(review => {
      const formattedReview: ReviewFormatted = {
        id: review.id,
        reviewText: review.reviewText,
        author: review.author,
        date: formatDate(review.date),
        activityId: review.activityId
      };
      this.reviewsActivityFormatted?.push(formattedReview);    
    });    
    return this.reviewsActivityFormatted;
  }
}
