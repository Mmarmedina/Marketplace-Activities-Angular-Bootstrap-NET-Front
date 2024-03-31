import { Component } from '@angular/core';
import { Activity } from '../../interfaces/activity.interface';
import { Schedule } from '../../interfaces/schedule.interface';
import { ActivitiesService } from '../../services/activities.service';
import { SchedulesService } from '../../services/schedules.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-update-activity',
  templateUrl: './form-update-activity.component.html',
  styleUrl: './form-update-activity.component.css'
})

export class FormUpdateActivityComponent {
  updateActivityForm!: FormGroup;
  activity: Activity | undefined;
  allSchedules: Schedule[];
  updateSchedules: number[]; // Variable que almacena los horarios marcados en cada momento, cuando se interactúa con el formulario.

  constructor (
    private activitiesService: ActivitiesService,
    private activatedRoute: ActivatedRoute,
    private schedulesService: SchedulesService,
    private router: Router){

      this.allSchedules = [];
      this.updateSchedules = []
  }

  async ngOnInit() {
    
    // MMM Petición a ScheduleService de todos los horarios (mañana, noche, fin de semana). GetAll()
    this.getAllSchedules();

    // MMM Inicializar el formulario y sus validaciones.
    this.initializeForm();

    this.activatedRoute.params.subscribe(async (params: any) => {
      // MMM Petición al servicio para recuperar la actividad que se pretende editar.
      const id = parseInt(params.idactivity);
      this.activity = await this.activitiesService.getById(params.idactivity);
      console.log(this.activity);
      console.log (this.activity.schedule);
      
      // MMM Que al cargar la página salgan los valores que tiene la actividad grabados en base de datos.
      this.setDefaultFormValues(this.allSchedules);
      
      // Método para mostrar el estado de todos los validadores en la consola
      this.logValidatorsState();
    })
  }

  async onSubmit() {
    // Método: updateFormControlScheduleValue. Al darle al botón de enviar el objeto que se envía al back, incluya los horarios seleccionados por el usuario, y la información se envíe actualizada.
    this.updateFormControlScheduleValue();
    console.log (this.updateActivityForm.value);

    // Método para mostrar el estado de todos los validadores en la consola
    this.logValidatorsState();

    // MMM Método para mostrar el estado de todos los validadores en la consola.
    this.requestUpdateActivityToBBDD();

    // Petición al servicio para editar la actividad.
    // console.log (this.updateActivityForm.value);
    // const response = await this.activitiesService.update(this.updateActivityForm.value);
    // console.log (response);
  }
  
  // MMM Formulario y sus validaciones.
  initializeForm(): void {
    this.updateActivityForm = new FormGroup({
      Id: new FormControl(''),
      Title: new FormControl('', [Validators.required, Validators.minLength(25), Validators.maxLength(130)]),
      Description: new FormControl('', [Validators.required, Validators.minLength(100)]),
      Price: new FormControl('', [Validators.required]),
      ScheduleId: new FormControl('', [Validators.requiredTrue]),
    },);
  }

  // MMM Petición de todos los horarios (mañana, tarde, fin de semana).
  async getAllSchedules(): Promise<Schedule[]> {
    this.allSchedules = await this.schedulesService.getAll();
    console.log (this.allSchedules);
    return this.allSchedules;    
  }

  // MMM Que al cargar la página salgan los valores que tiene la actividad grabados en base de datos.
  setDefaultFormValues(allSchedules: Schedule[]) {   
    // MMM Asignar valores por defecto
    if (this.activity) {      
      console.log (this.activity);
      console.log (this.activity.schedule);

      // MMM updateActivityForm es el formulario, estamos asignándole a cada una de sus propiedades los valores de la actividad recuperada de BBDD.
      this.updateActivityForm.patchValue({
        Id: this.activity.id,
        Title: this.activity.title,
        Description: this.activity.description,
        Price: this.activity.price,
      });
    }

    // MMM QUE AL CARGAR LA PÁGINA SE MARQUEN LOS HORARIOS DE LA ACTIVIDAD (CHECKBOX)
      // Se recupera de base de datos la actividad, almacenados en al variable activity (que incluye los horarios de la misma).  
      // selectedSchedulesIdsByDefault: es un array tipo number, que recoge los IDs que tiene en BBDD de la actividad que se quire editar. De la actividad recuperada sólo queremos quedarnos con schedule.id, es decir, un array con los ids de los horarios de la misma (activity.schedule incluye el id del horario y su name). 
    const selectedSchedulesIdsByDefault: number[] | undefined = this.activity?.schedule.map(schedule => schedule.id);
    console.log(selectedSchedulesIdsByDefault);

    // Asignar los IDs de los horarios por defecto a updateSchedules (variable que almacena los horarios marcados en cada momento, cuando se interactúa con el formulario).
    if (selectedSchedulesIdsByDefault) {
      this.updateSchedules = [...selectedSchedulesIdsByDefault];
    }

    // Los horarios de esa actividad deben estar en true para que salgan marcados al renderizar la página.
    // Marcar los checkboxes correspondientes si los IDs están presentes en updateSchedules
    // Bucle forEach que itera sobre cada objeto schedule en el array allSchedules.
    // as HTMLInputElement se utiliza para indicar TypeScript que el elemento <input> es de tipo checkbox.
    // getElementById() necesita un string como argumento, y el id es tipo number. Se convierte el id a string.
    // Si document.getElementById no encuentra ningún elemento con el ID especificado en el DOM devuelve null. Queremos que el código dentro del bloque se ejecute si se encontró un elemento del DOM con el ID especificado.
    // Si checkbox no es nulo y si además dentro de updateSchedules (que son los horarios que tiene la actividad recuperada), está alguno de los horarios de la base de datos, entonces, se marca el checkbox.
    allSchedules.forEach(schedule => {
      const checkbox = document.getElementById(schedule.id.toString()) as HTMLInputElement;
      
      if (checkbox && this.updateSchedules.includes(schedule.id)) {
        checkbox.checked = true;
      }
    });

    // Forzar el estado de validación de los campos como válidos. En un validador null es igual que no hay error.
    this.updateActivityForm.get('Title')?.setErrors(null);
    this.updateActivityForm.get('Description')?.setErrors(null);
    this.updateActivityForm.get('Price')?.setErrors(null);
    this.updateActivityForm.get('ScheduleId')?.setErrors(null);
  }

  // Si se cambian los horarios.
  updateSelectedSchedules (event: Event, schedule: Schedule){
    // Almacenar en una variable el objeto event (para poder acceder al atributo checked el input que se ha seleccionado).
    let checkbox = event.target as HTMLInputElement;

    if(checkbox.checked) { 
      this.updateSchedules.push(schedule.id);
    }else {
      this.updateSchedules = this.updateSchedules.filter(item => item !== schedule.id);
    }

    // Comprobar si hay al menos un horario seleccionado el botón de editar no se desahbilite.
    if (this.updateSchedules.length >= 1) {
      // Si hay al menos uno seleccionado que el botón de editar no se ponga desahbilitado.
      this.updateActivityForm.get('ScheduleId')?.setErrors(null);
    } else {
      // Si no hay horarios seleccionados que el botón salga desahbilitado.
      this.updateActivityForm.get('ScheduleId')?.setErrors({ 'required': true });
    }
    
    // Este método se debe llamar después de cualquier cambio en los horarios seleccionados.
    // Actualizar el estado del botón después de cualquier cambio en los horarios seleccionados
    console.log(this.updateSchedules);
    return this.updateSchedules;  
  }  
  
  // MMM Método: updateFormControlScheduleValue. Al darle al botón de enviar el objeto que se envía al back, incluya los horarios seleccionados por el usuario, y la información se envíe actualizada.
  // Al formulario a su controlForm schedule se le asigna el valor de la variable updateSchedules.
  updateFormControlScheduleValue() {
    this.updateActivityForm.get('ScheduleId')?.setValue(this.updateSchedules);
    console.log (this.updateActivityForm);
  }

  // MMM Método para mostrar el mensaje de error cuando no se rellena correctamente el campo.
  checkError (control: string, error: string) {
    if (this.updateActivityForm.get(control)?.hasError(error) && this.updateActivityForm.get(control)?.touched) {
      return true
    }else {
      return false
    }
  }
  
  // MMM Petición al servicio de actualización de la actividad. 
  async requestUpdateActivityToBBDD(): Promise<void> {    
      const result = await Swal.fire({
        title: "¿Estás seguro de que quieres editar la actividad?",
        // text: "Esta acción es irreversible",
        // icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "¡Sí, actualízala!"
      });
    
      // Si el usuario confirma la eliminación se hace la petición update.
      if (result.isConfirmed) {
        try {
          // Editar la actividad
          const response = await this.activitiesService.update(this.updateActivityForm.value);
          console.log (response);
          
          // Mostrar mensaje de que la actividad ha sido actualizada.
          Swal.fire({
            title: "Actualizada",
            text: "La actividad ha sido editada correctamente",
            icon: "success"
          });
    
          // Redirigir a la página de inicio
          this.router.navigate(['/actividades', this.activity?.id]);
        } catch (error) {
          // Mensaje si falla el proceso de edición.
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "La actividad no se ha podido eliminar. Inténtalo de nuevo.",
            // footer: '<a href="#">Why do I have this issue?</a>'
          });
        }// Si le da a cancelar redirige a home.
        } else {
          this.router.navigate(['/home']);
        }

      console.log (this.updateActivityForm.value);
      
  }


  // MMM Método para mostrar el estado de todos los validadores en la consola.
  logValidatorsState() {
  Object.keys(this.updateActivityForm.controls).forEach(key => {
    const controlErrors = this.updateActivityForm.get(key)?.errors;
    console.log(`Control "${key}" tiene errores:`, controlErrors);
    });
  }

}



