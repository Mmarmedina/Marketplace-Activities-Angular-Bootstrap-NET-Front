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
        price: new FormControl('', [Validators.required]), 
        // price: new FormControl('', [Validators.required, Validators.pattern(/^\d+(\.\d{2})?$/)]), 
        schedule: new FormControl('', [Validators.requiredTrue]),
      },[])

      this.getAllSchedules();
    }

    // MMM Petición al servicio de todos los horarios (entidad Schedules en BBDD) para pintar el checkbox con los horarios en los que podría realizarse la nueva actividad.
    async getAllSchedules() {
      this.allSchedules = await this.schedulesService.getAll();
      console.log (this.allSchedules);
    }

    // MMM Si se marca el check de un horario se dispara evento change y checkbox seleccionado toma valor true. Cuando esto sucede entra en el if, y el objeto con los datos del horario seleccionado (schedule) se añade al array selectedSchedules.
    // Si se desmarca el checbox, entra en el else (porque su valor no es true). Se filtra el array que se compone de los elementos seleccionados y deja todos los objetos (schedule) que sean distintos al desmarcado.
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

    // MMM El valor del FormControl Schedule se debe actualizar antes de hacer la petición de inserción al back, de manera que se incluyan solo los horarios seleccionados.
    updateFormControlScheduleValue(selectedSchedules: number []) {
        this.newActivityForm.get('schedule')?.setValue(this.selectedSchedules);
    }

    // MMM Se hace una petición al servicio para que ejecute el método create, el cual sirve para hacer una solicitud de inserción de una nueva actividad en BBDD.
    async onSubmit() {
      this.updateFormControlScheduleValue(this.selectedSchedules);
      console.log (this.newActivityForm.value);
      const response = await this.activitiesService.create(this.newActivityForm.value);
      console.log (response);
      console.log (this.newActivityForm.value);
    }

    // MMM Método para mostrar el mensaje de error cuando no se rellena correctamente el campo.
    checkError (control: string, error: string) {
      if (this.newActivityForm.get(control)?.hasError(error) && this.newActivityForm.get(control)?.touched) {
        return true
      }else {
        return false
      }
    } 
}


    