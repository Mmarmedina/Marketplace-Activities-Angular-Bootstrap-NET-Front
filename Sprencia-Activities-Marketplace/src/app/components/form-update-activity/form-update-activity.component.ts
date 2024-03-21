import { Component } from '@angular/core';
import { Activity } from '../../interfaces/activity.interface';
import { ActivitiesService } from '../../services/activities.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-update-activity',
  templateUrl: './form-update-activity.component.html',
  styleUrl: './form-update-activity.component.css'
})
export class FormUpdateActivityComponent {
  activity: Activity | undefined;

  constructor (
    private activitiesService: ActivitiesService,
    private activatedRoute: ActivatedRoute){
    
  }

  async ngOnInit() {
    this.activatedRoute.params.subscribe(async (params: any) => {
      const id = parseInt(params.idactivity);
      this.activity = await this.activitiesService.getById(params.idactivity);
      console.log(this.activity);
    })
  }

}



// public int Id { get; set; }
// public string Title { get; set; }
// public string Description { get; set; }
// public double Price { get; set; }
// public List<int> ScheduleId { get; set; }
