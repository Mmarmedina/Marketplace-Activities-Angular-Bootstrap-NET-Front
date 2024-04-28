import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { Review } from '../interfaces/review.interface';

@Injectable({
  providedIn: 'root'
})

export class ReviewsService {

  private baseUrl: string;
  
  constructor(private httpClient: HttpClient) {
    // this.baseUrl = 'http://localhost:5062/api/Review/Sprencia/';
    this.baseUrl = 'https://sprenciaapi.azurewebsites.net/api/Review/Sprencia/';
    
  }

  getAll(): Promise<Review[]> {
    const response = lastValueFrom(this.httpClient.get<Review[]>(this.baseUrl));
    return response;
  }
}
