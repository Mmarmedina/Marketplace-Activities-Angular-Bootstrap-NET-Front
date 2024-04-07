import { Component, Input } from '@angular/core';
import { Review } from '../../interfaces/review.interface';
import { formatDate } from '../../utils/date-helper';

@Component({
  selector: 'app-reviews-sprencia-thumbnail',
  templateUrl: './reviews-sprencia-thumbnail.component.html',
  styleUrl: './reviews-sprencia-thumbnail.component.css'
})

export class ReviewsSprenciaThumbnailComponent {

  @Input () review: Review;
  dateFormated: string;
  isReadMore = true;
  
  constructor() {
    this.review = {
      id: 0, 
      reviewText: '',   
      author: '',
      date: new Date(),
      activityId: 0
    }

    this.dateFormated = '';
  }

  ngOnInit() {
    this.dateFormated = formatDate(this.review.date);
  }

  showText() {
    this.isReadMore = !this.isReadMore;
  }

}





    