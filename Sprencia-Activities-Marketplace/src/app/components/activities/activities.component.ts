import { Component } from '@angular/core';
import { ActivitiesService } from '../../services/activities.service';
import { Activity } from '../../interfaces/activity.interface';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.css'
})

export class ActivitiesComponent {

  activities: Activity[];

  constructor(private activitiesService: ActivitiesService) {
    this.activities = [];
  }

  async ngOnInit() {
    this.activities = await this.activitiesService.getAll();
    console.log (this.activities); 
  }
    
}
