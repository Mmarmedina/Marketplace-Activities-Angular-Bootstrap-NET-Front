import { Component, Input } from '@angular/core';
import { Review } from '../../interfaces/review.interface';
import { formatDate } from '@angular/common';

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
    this.formatDate();
  }

  showText() {
    this.isReadMore = !this.isReadMore;
  }

  formatDate() {
    const dateObject = new Date(this.review.date);
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
    
    // En JavaScript, los meses se representan como números enteros del 0 al 11. Si monthNumber es 0, months[monthNumber] devolverá 'enero'. Se está utilizando monthNumber como índice para acceder al nombre del mes correspondiente en el array months.
    const monthName = months[monthNumber];
    this.dateFormated = `${day} de ${monthName} de ${year}`;
    console.log (this.dateFormated);
  }
}


// Backup Delete

// import { Component, Input } from '@angular/core';
// import { Review } from '../../interfaces/review.interface';
// import { formatDate } from '@angular/common';

// @Component({
//   selector: 'app-reviews-sprencia-thumbnail',
//   templateUrl: './reviews-sprencia-thumbnail.component.html',
//   styleUrl: './reviews-sprencia-thumbnail.component.css'
// })

// export class ReviewsSprenciaThumbnailComponent {

//   @Input () review: Review;
//   dateFormated: string;
//   isReadMore = true;
  
//   constructor() {
//     this.review = {
//       id: 0, 
//       reviewText: '',   
//       author: '',
//       date: new Date(),
//       activityId: 0
//     }

//     this.dateFormated = '';
//   }

//   ngOnInit() {
//     this.formatDate();
//   }

//   showText() {
//     this.isReadMore = !this.isReadMore;
//   }

//   formatDate() {
//     const dateObject = new Date(this.review.date);
//     const day = dateObject.getDate();
//     const monthNumber = dateObject.getMonth();
//     const year = dateObject.getFullYear();

//     const months = [
//       "enero",
//       "febrero", 
//       "marzo", 
//       "abril", 
//       "mayo", 
//       "junio",
//       "julio", 
//       "agosto", 
//       "septiembre", 
//       "octubre", 
//       "noviembre", 
//       "diciembre"
//     ];
    
//     // En JavaScript, los meses se representan como números enteros del 0 al 11. Si monthNumber es 0, months[monthNumber] devolverá 'enero'. Se está utilizando monthNumber como índice para acceder al nombre del mes correspondiente en el array months.
//     const monthName = months[monthNumber];
//     this.dateFormated = `${day} de ${monthName} de ${year}`;
//     console.log (this.dateFormated);
//   }
// }


    