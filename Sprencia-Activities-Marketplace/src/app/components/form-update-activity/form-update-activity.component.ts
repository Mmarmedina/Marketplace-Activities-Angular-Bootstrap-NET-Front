import { Component } from '@angular/core';
import { Activity } from '../../interfaces/activity.interface';
import { Schedule } from '../../interfaces/schedule.interface';
import { ActivitiesService } from '../../services/activities.service';
import { SchedulesService } from '../../services/schedules.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-update-activity',
  templateUrl: './form-update-activity.component.html',
  styleUrl: './form-update-activity.component.css'
})
export class FormUpdateActivityComponent {
  updateActivityForm!: FormGroup;
  activity: Activity | undefined;
  allSchedules: Schedule[];
  selectedSchedules: number[];

  constructor (
    private activitiesService: ActivitiesService,
    private activatedRoute: ActivatedRoute,
    private schedulesService: SchedulesService){
      this.allSchedules = [];
      this.selectedSchedules = [];
  }

  async ngOnInit() {
    
    // Petición a ScheduleService de todos los horarios (mañana, noche, fin de semana). GetAll()
    this.getAllSchedules();

    // Cargar el formulario y sus validaciones.
    this.initializeForm();

    this.activatedRoute.params.subscribe(async (params: any) => {
      const id = parseInt(params.idactivity);
      this.activity = await this.activitiesService.getById(params.idactivity);
      console.log(this.activity);
      console.log (this.activity.schedule);

      this.setDefaultFormValues();
    })

  }

  async onSubmit() {
    this.updateFormControlScheduleValue(this.selectedSchedules);
    console.log (this.updateActivityForm.value);   
  }
  
  // Petición de todos los horarios (mañana, tarde, fin de semana).
  async getAllSchedules() {
    this.allSchedules = await this.schedulesService.getAll();
    console.log (this.allSchedules);
  }

  // Formulario y sus validaciones.
  initializeForm(){
    this.updateActivityForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(25), Validators.maxLength(130)]),
      description: new FormControl('', [Validators.required, Validators.minLength(100)]),
      price: new FormControl('', [Validators.required]),
      schedule: new FormControl('', [Validators.requiredTrue]),
    });
  }

  // Establecer valores por defecto en el formulario
  setDefaultFormValues() {
    if (this.activity) {      
      console.log (this.activity);
      this.updateActivityForm.patchValue({
        title: this.activity.title,
        description: this.activity.description,
        price: this.activity.price,
        schedule: this.activity.schedule
      });
    }     
  }

  // Que si cambian los valores del checkbox se actualice el valor de schedules en el formulario.
  updateSelectedSchedules (event: Event, schedule: Schedule): number []{
    const checkbox = event.target as HTMLInputElement;

    if(checkbox.checked) {
      this.selectedSchedules.push(schedule.id);
    }else {
      this.selectedSchedules = this.selectedSchedules.filter(item => item !== schedule.id);
    }

    console.log(this.selectedSchedules);
    return this.selectedSchedules;  
  }

  updateFormControlScheduleValue(selectedSchedules: number []) {
    this.updateActivityForm.get('schedule')?.setValue(this.selectedSchedules);
}

  // MMM Método para mostrar el mensaje de error cuando no se rellena correctamente el campo.
  checkError (control: string, error: string) {
    if (this.updateActivityForm.get(control)?.hasError(error) && this.updateActivityForm.get(control)?.touched) {
      return true
    }else {
      return false
    }
  }   

}







