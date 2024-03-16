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

  constructor(private activitiesService: ActivitiesService){
    this.activities = []
  }

  ngOnInit(): void {
    this.activitiesService.getAll()
      .then((response) => {
        this.activities = response;
        console.log(this.activities);
      })
      .catch(() => {})
  }
}
