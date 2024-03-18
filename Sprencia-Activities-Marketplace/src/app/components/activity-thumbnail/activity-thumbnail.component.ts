import { Component } from '@angular/core';
import { ActivitiesService } from '../../services/activities.service';
import { Activity } from '../../interfaces/activity.interface';

@Component({
  selector: 'app-activity-thumbnail',
  templateUrl: './activity-thumbnail.component.html',
  styleUrl: './activity-thumbnail.component.css'
})
export class ActivityThumbnailComponent {

  activities: Activity []

  constructor(private activitiesService: ActivitiesService) {
    this. activities = [];
  }
  
  ngOnInit() {
    this.activitiesService.getAll()
      .then((response) => {
        this.activities = response;
        console.log(this.activities);
      })
      .catch((reject) => { })   
  }

   // async ngOnInit() {

  //   MMM Con await no funciona
  //   const response = await this.activitiesService.getAll();
  //   console.log (response); 
  // }

  
  

}



