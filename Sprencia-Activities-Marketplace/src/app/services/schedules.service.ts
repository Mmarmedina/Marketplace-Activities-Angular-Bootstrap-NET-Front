import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { Schedule } from '../interfaces/schedule.interface';

@Injectable({
  providedIn: 'root'
})

export class SchedulesService {

  private baseUrl: string; 

  constructor(private httpClient: HttpClient) {
    // this.baseUrl = 'http://localhost:5062/api/Schedule/';
    this.baseUrl = 'https://sprenciaapi.azurewebsites.net/api/Schedule/';   
   }

   getAll(): Promise<Schedule[]> {
    const response = lastValueFrom(this.httpClient.get<Schedule[]>(this.baseUrl));
    return response;
   }
}