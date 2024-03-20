import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivitiesService } from '../../services/activities.service';
import { SchedulesService } from '../../services/schedules.service';
import { Schedule } from '../../interfaces/schedule.interface';

@Component({
  selector: 'app-form-new-activity',
  templateUrl: './form-new-activity.component.html',
  styleUrl: './form-new-activity.component.css'
})
export class FormNewActivityComponent {

  newActivityForm!: FormGroup;
  allSchedules: Schedule[];
  selectedSchedules: Schedule[]

    constructor (
      private activitiesService: ActivitiesService,
      private schedulesService: SchedulesService ){
        this.allSchedules = [];
        this.selectedSchedules = [];
    }

    ngOnInit(): void {
      this.newActivityForm = new FormGroup({
        title: new FormControl('', [Validators.required, Validators.minLength(25), Validators.maxLength(130)]),
        description: new FormControl('', [Validators.required, Validators.minLength(100)]), 
        price: new FormControl('', [Validators.required]), 
        schedule: new FormControl('', []),
      },[])

      this.getAllSchedules();
    }

    // MMM Petición al servicio de todos los horarios (entidad Schedules en BBDD) para pintar el checkbox con los horarios en los que podría realizarse la nueva actividad.
    async getAllSchedules() {
      this.allSchedules = await this.schedulesService.getAll();
      console.log (this.allSchedules);
    }

    // MMM Selección o deselección de un horario. Si el checkbox asociado al horario está marcado, el horario se agrega al array selectedSchedules. Si el checkbox se desmarca, el horario se elimina del array selectedSchedules.

    updateSelectedSchedules (checked: boolean, schedule: Schedule){
      
      // MMM Si se marca el check de un horario, el horario seleccionado (schedule, con sus propiedades id y name), se añaden al array selectedSchedules.
      if(checked) {
        this.selectedSchedules.push(schedule);
      }else {
        this.selectedSchedules = this.selectedSchedules.filter(item => item.id !== schedule.id);
      }
      console.log(this.selectedSchedules);
    }

    // updateSelectedSchedules (event: Event, schedule: Schedule){
    //   const checkbox = event.target as HTMLInputElement;
    //   // MMM Si se marca el check de un horario, el horario seleccionado (schedule, con sus propiedades id y name), se añaden al array selectedSchedules.
    //   if(checkbox.checked) {
    //     this.selectedSchedules.push(schedule);
    //   }else {
    //     this.selectedSchedules = this.selectedSchedules.filter(item => item.id !== schedule.id);
    //   }
    //   console.log(this.selectedSchedules);
    // }

    // updateSelectedSchedules (checked: number, schedule: Schedule){
    //   // MMM Si se marca el check de un horario, el horario seleccionado (schedule, con sus propiedades id y name), se añaden al array selectedSchedules.
    //   if(checked) {
    //     this.selectedSchedules.push(schedule);
    //   }else {
    //     this.selectedSchedules = this.selectedSchedules.filter(item => item.id !== schedule.id);
    //   }
    //   console.log(this.selectedSchedules);
    // }

    

    // MMM Se hace una petición al servicio para que ejecute el método create, el cual sirve para hacer una solicitud de inserción de una nueva actividad en BBDD.
    async onSubmit() {
      const response = await this.activitiesService.create(this.newActivityForm.value);
      console.log (response);
      console.log (this.newActivityForm.value);
    }

    checkError (control: string, error: string) {
      if (this.newActivityForm.get(control)?.hasError(error) && this.newActivityForm.get(control)?.touched) {
        return true
      }else {
        return false
      }
    } 
}
