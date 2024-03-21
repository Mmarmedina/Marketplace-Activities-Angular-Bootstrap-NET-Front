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
  selectedSchedules: number [];
  

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
        price: new FormControl('', [Validators.required, Validators.pattern(/^-?\d*[.,]?\d{0,2}$/)]), 
        schedule: new FormControl(this.selectedSchedules, []),
      },[])

      this.getAllSchedules();
    }

    // MMM Petición al servicio de todos los horarios (entidad Schedules en BBDD) para pintar el checkbox con los horarios en los que podría realizarse la nueva actividad.
    async getAllSchedules() {
      this.allSchedules = await this.schedulesService.getAll();
      console.log (this.allSchedules);
    }

    // MMM Selección o deselección de un horario. Si el checkbox asociado al horario está marcado, el horario se agrega al array selectedSchedules. Si el checkbox se desmarca, el horario se elimina del array selectedSchedules. El método devuelve un array de enteros con los IDs de los horarios seleccionados al crear la actividad.

    updateSelectedSchedules (event: Event, schedule: Schedule): number []{
      // MMM Si se marca el check de un horario se dispara evento change y checkbox seleccionado toma valor true. Cuando esto sucede entra en el if, y el objeto con los datos del horario seleccionado (schedule) se añade al array selectedSchedules.
      // Si se desmarca el checbox, entra en el else (porque su valor no es true). Se filtra el array que se compone de los elementos seleccionados y deja todos los objetos (schedule) que sean distintos al desmarcado. 

      const checkbox = event.target as HTMLInputElement;

      if(checkbox.checked) {
        this.selectedSchedules.push(schedule.id);
      }else {
        this.selectedSchedules = this.selectedSchedules.filter(item => item !== schedule.id);
      }

      console.log(this.selectedSchedules);
      return this.selectedSchedules;
    
    }


    // updateSelectedSchedules (event: Event, schedule: Schedule){
    //   // MMM Si se marca el check de un horario se dispara evento change y checkbox seleccionado toma valor true. Cuando esto sucede entra en el if, y el objeto con los datos del horario seleccionado (schedule) se añade al array selectedSchedules.
    //   // Si se desmarca el checbox, entra en el else (porque su valor no es true). Se filtra el array que se compone de los elementos seleccionados y deja todos los objetos (schedule) que sean distintos al desmarcado. 

    //   const checkbox = event.target as HTMLInputElement;

    //   if(checkbox.checked) {
    //     this.selectedSchedules.push(schedule);
    //   }else {
    //     this.selectedSchedules = this.selectedSchedules.filter(item => item.id !== schedule.id);
    //   }

    //   console.log(this.selectedSchedules);
    //   return this.selectedSchedules;
      
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
