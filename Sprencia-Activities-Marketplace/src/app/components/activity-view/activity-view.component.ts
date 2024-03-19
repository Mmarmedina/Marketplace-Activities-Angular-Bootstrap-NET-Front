import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Activity } from '../../interfaces/activity.interface';
import { ActivitiesService } from '../../services/activities.service';

@Component({
  selector: 'app-activity-view',
  templateUrl: './activity-view.component.html',
  styleUrl: './activity-view.component.css'
})

export class ActivityViewComponent {
  activity: Activity | undefined;
  
  constructor(
    private activatedRoute: ActivatedRoute, 
    private activitiesService: ActivitiesService){
  }

  async ngOnInit() {
    this.activatedRoute.params.subscribe(async (params: any) => {
      const id = parseInt(params.idactivity);
      this.activity = await this.activitiesService.getById(params.idactivity);
      console.log (this.activity);
    })
  }
}
