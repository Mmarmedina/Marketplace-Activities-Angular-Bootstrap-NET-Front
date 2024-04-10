import { Component } from '@angular/core';
import { ActivitiesService } from '../../services/activities.service';
import { Activity } from '../../interfaces/activity.interface';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.css'
})

export class ActivitiesComponent {
  activities: Activity[];
  totalActivities: number;
  itemsPerPage: number;
  currentPage: number;
  activitiesOnlyOnePage: Activity[];

  constructor(private activitiesService: ActivitiesService) {
    this.activities = [];
    this.totalActivities = 0;
    this.itemsPerPage = 4;
    this.currentPage = 1;
    this.activitiesOnlyOnePage = [];
  }

  ngOnInit() {
    this.getAllAndPaginate();    
  }

  async getAllAndPaginate(): Promise<void> {
    // MMM Se recupera el array de actividades.
    this.activities = await this.activitiesService.getAll();

    // MMM Nos quedamos sólo con las que saldrán en una página.
    this.paginatedData();   
  }

  // MMM Que salgan sólo las actividades que se muestran en la página actual.
  paginatedData(): void {
    // MMM CALCULAR LA LONGITUD DEL ARRAY DE ACTIVIDADES.
    // Se calcula el número de actividades en BBDD. El cálculo de la longitud hace falta para configurar la paginación de actividades. El dato se pasa como input a pagination-activities-component.
    // Hay que ponerlo en este punto del código al ser asincrónica la petición HTTP GET de actividades. Se necesita que totalActivities se actualice solo después de que getAll() se haya completado. 
    // En el componente hijo: pagination-activities se pone un ngIf, para que se cargue sólo cuando el valor sea distinto a 0. Si no ha terminado de recuperar las actividades y calcular la longitud, el valor de totalActivities es 0, al ser peticiones asincrónicas.
    // El componente de paginación se carga solo cuando totalActivities tenga valor, ya tenga la longitud, y ésta sea distinta a 0 (si no hay actividades no sale la paginación). 
    // Si no se hace así totalActivities sale como un array vacío (0).    
    
    
    // MMM Esta línea calcula el número total de actividades en el array activities y lo asigna a la variable totalActivities. Esto es esencial para configurar la paginación, ya que necesitamos saber cuántas actividades hay en total para calcular el número total de páginas.
    this.totalActivities = this.activities.length;
    
    // MMM Calcula el índice de inicio para las actividades que se mostrarán en la página actual. Esto se hace restando 1 del número de página actual (ya que las páginas comienzan desde 1) y multiplicando por el número de actividades por página.
    const start = (this.currentPage - 1) * (this.itemsPerPage);

    // MMM Calcula el índice de finalización para las actividades que se mostrarán en la página actual. Esto se hace sumando el índice de inicio al número de actividades por página.
    const end = start + this.itemsPerPage;

    // MMM Se Utiliza el método slice() para extraer solo las actividades de la página actual. Este nuevo array se almacena en la variable activitiesOnlyOnePage, que contiene las actividades que se mostrarán en la página actual.
    this.activitiesOnlyOnePage = this.activities.slice(start, end);
  }
  
  // MMM El componente activity (padre), recibe el ouput del hijo (pagination-activities) con el número de página que se ha clicado, y la página pulsada se convierte en la página actual. 
  changePage(page: number): void {
    this.currentPage = page;
    this.paginatedData();
  }    
}
