import { Component } from '@angular/core';
import { ReviewsService } from '../../services/reviews.service';
import { Review } from '../../interfaces/review.interface';

@Component({
  selector: 'app-reviews-sprencia',
  templateUrl: './reviews-sprencia.component.html',
  styleUrl: './reviews-sprencia.component.css'
})

export class ReviewsSprenciaComponent {

  reviews: Review[];

  constructor(private reviewsService: ReviewsService) {
    this.reviews = [];
  }

  async ngOnInit() {
    this.reviews = await this.reviewsService.getAll();
  }  
}
