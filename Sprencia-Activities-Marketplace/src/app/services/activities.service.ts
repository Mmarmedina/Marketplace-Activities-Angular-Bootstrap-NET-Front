import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { Activity } from '../interfaces/activity.interface';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {

  private baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:5062/api/Activity/';
  }

  getAll(): Promise<Activity[]> {
    const response = lastValueFrom(this.httpClient.get<Activity[]>(this.baseUrl));
    return response;
  }

  getById (pId: number): Promise<Activity>{
    const response = lastValueFrom(this.httpClient.get<Activity>(this.baseUrl + pId));
    return response;
  }

  create (pNewActivityForm: Activity): Promise<Activity> {
    const endpointNewActivity = this.baseUrl + 'NewActivity';
    const response = lastValueFrom(this.httpClient.post<Activity>(endpointNewActivity, pNewActivityForm));
    return response;
  }

  update (pUpdateActivityForm: Activity): Promise<Activity>{
    const endpointUpdateActivity = this.baseUrl + 'UpdateActivity';
    const response = lastValueFrom(this.httpClient.put<Activity>(endpointUpdateActivity, pUpdateActivityForm));
    return response; 
  }

  // MMM No sé cómo hacer esto si la actividad se elimina.
  delete (pId: number): void{    
    const response = lastValueFrom(this.httpClient.delete<Activity>(this.baseUrl + pId));
    //  return response;

    // 
  }
}
