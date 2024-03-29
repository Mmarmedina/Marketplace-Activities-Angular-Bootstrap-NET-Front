import { Component, Input } from '@angular/core';
import { Activity } from '../../interfaces/activity.interface';
import { ActivitiesService } from '../../services/activities.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activity-thumbnail',
  templateUrl: './activity-thumbnail.component.html',
  styleUrl: './activity-thumbnail.component.css'
})

export class ActivityThumbnailComponent {

  @Input () activity: Activity;

  constructor(
    private activitiesService: ActivitiesService,
    private router: Router) {
      this.activity = {
        id: 0,
        title: "",
        description: "",
        price: 0,
        schedule: [],
        review: []
      }
  };

  async onDeleteClick(): Promise<void> {
    try {
      await this.activitiesService.delete(this.activity.id);
      this.router.navigate(['/home']);

    } catch (error) {
      console.error('Error al eliminar la actividad:', error);
    }
  } 
    
}

  
  





