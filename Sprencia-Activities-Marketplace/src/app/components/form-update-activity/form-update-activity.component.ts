import { Component } from '@angular/core';
import { Activity } from '../../interfaces/activity.interface';
import { Schedule } from '../../interfaces/schedule.interface';
import { ActivitiesService } from '../../services/activities.service';
import { SchedulesService } from '../../services/schedules.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-update-activity',
  templateUrl: './form-update-activity.component.html',
  styleUrl: './form-update-activity.component.css'
})
export class FormUpdateActivityComponent {
  updateActivityForm!: FormGroup;
  activity: Activity | undefined;
  allSchedules: Schedule[];
  updateSchedules: number[];

  constructor (
    private activitiesService: ActivitiesService,
    private activatedRoute: ActivatedRoute,
    private schedulesService: SchedulesService){

      this.allSchedules = [];
      this.updateSchedules = []

      // this.updateActivityForm = new FormGroup({
      //   title: new FormControl('', [Validators.required, Validators.minLength(25), Validators.maxLength(130)]),
      //   description: new FormControl('', [Validators.required, Validators.minLength(100)]),
      //   price: new FormControl('', [Validators.required]),
      //   schedule: new FormControl('', [Validators.requiredTrue]),
      // });    
  }

  async ngOnInit() {
    
    // MMM Petición a ScheduleService de todos los horarios (mañana, noche, fin de semana). GetAll()
    this.getAllSchedules();

    // MMM Cargar el formulario y sus validaciones.
    this.initializeForm();

    this.activatedRoute.params.subscribe(async (params: any) => {

      // MMM Petición al servicio para recuperar la actividad que se pretende editar.
      const id = parseInt(params.idactivity);
      this.activity = await this.activitiesService.getById(params.idactivity);
      console.log(this.activity);
      console.log (this.activity.schedule);
      
      // MMM Que al cargar la página salgan los valores que tiene la actividad grabados en base de datos.
      this.setDefaultFormValues(this.allSchedules);      
      
    })

  }

  async onSubmit() {
    // Método: updateFormControlScheduleValue. Al darle al botón de enviar el objeto que se envía al back, incluya los horarios seleccionados por el usuario, y la información se envíe actualizada.
    this.updateFormControlScheduleValue(this.updateSchedules);
    console.log (this.updateActivityForm.value);   
  }
  
  // MMM Formulario y sus validaciones.
  initializeForm(){
    this.updateActivityForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(25), Validators.maxLength(130)]),
      description: new FormControl('', [Validators.required, Validators.minLength(100)]),
      price: new FormControl('', [Validators.required]),
      schedule: new FormControl('', [Validators.requiredTrue]),
    });
  }

  // MMM Petición de todos los horarios (mañana, tarde, fin de semana).
  async getAllSchedules(): Promise<Schedule[]> {
    this.allSchedules = await this.schedulesService.getAll();
    console.log (this.allSchedules);
    return this.allSchedules;    
  }

  setDefaultFormValues(allSchedules: Schedule[]) {   
    // Asignar valores por defecto
    if (this.activity) {      
      console.log (this.activity);
      console.log (this.activity.schedule);

      this.updateActivityForm.patchValue({
        title: this.activity.title,
        description: this.activity.description,
        price: this.activity.price,
      }); 

    }

    // MMM QUE AL CARGAR LA PÁGINA SE MARQUEN LOS HORARIOS DE LA ACTIVIDAD (CHECKBOX)
    // Se recupera de base de datos la actividad, almacenados en al variable activity (que incluye los horarios de la misma). 
    // De la actividad sólo queremos quedarnos con schedule.id, es decir, un array con los ids con los horarios de la actividad (porque activity.schedule, incluye el id del horario y su name).
    const selectedSchedulesIdsByDefault: number[] | undefined = this.activity?.schedule.map(schedule => schedule.id);
    console.log(selectedSchedulesIdsByDefault);

  // Asignar los IDs de los horarios por defecto a updateSchedules
  if (selectedSchedulesIdsByDefault) {
    this.updateSchedules = [...selectedSchedulesIdsByDefault];
  }

    // Marcar los checkboxes correspondientes si los IDs están presentes en selectedScheduleIds
    // Bucle forEach que itera sobre cada objeto schedule en el array allSchedules.
    // as HTMLInputElement se utiliza para indicar TypeScript que el elemento <input> es de tipo checkbox.
    // getElementById() necesita un string como argumento, y el id es tipo number. Se convierte el id a string.
    // Si document.getElementById no encuentra ningún elemento con el ID especificado en el DOM, devuelve null. Queremos que el código dentro del bloque se ejecute si se encontró un elemento del DOM con el ID especificado.
    // Si checkbox no es nulo y si además dentro de selectedSchedulesIdsByDefault (que son los horarios que tiene la actividad recuperada), está alguno de los horarios de la base de datos, entonces, se marca el checkbox.
    allSchedules.forEach(schedule => {
      const checkbox = document.getElementById(schedule.id.toString()) as HTMLInputElement;
      if (checkbox && selectedSchedulesIdsByDefault?.includes(schedule.id)) {
        checkbox.checked = true;
      }
    });    
  }

  updateSelectedSchedules (event: Event, schedule: Schedule, updateSchedules: number[]): number []{
    // Almacenar en una variable el objeto event (para poder acceder al atributo checked el input que se ha seleccionado).
    const checkbox = event.target as HTMLInputElement;

    if(checkbox.checked) {
      this.updateSchedules.push(schedule.id);
    }else {
      this.updateSchedules = this.updateSchedules.filter(item => item !== schedule.id);
    }

    console.log(this.updateSchedules);
    return this.updateSchedules;  
  }  
  
  updateFormControlScheduleValue(selectedSchedules: number []) {
    this.updateActivityForm.get('schedule')?.setValue(this.updateSchedules);
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



