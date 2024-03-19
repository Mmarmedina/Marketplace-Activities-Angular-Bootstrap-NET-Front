import { Component, Input } from '@angular/core';
import { Activity } from '../../interfaces/activity.interface';

@Component({
  selector: 'app-activity-thumbnail',
  templateUrl: './activity-thumbnail.component.html',
  styleUrl: './activity-thumbnail.component.css'
})

export class ActivityThumbnailComponent {

  @Input () activity: Activity;

  constructor() {
    this.activity = {
      id: 0,
      title: "",
      description: "",
      price: 0,
      schedule: [],
      review: []
      }
    };    
}

  
  





