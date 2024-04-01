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
    // Se recupera el array de actividades.
    this.activities = await this.activitiesService.getAll();
    console.log (this.activities);

    // MMM Se calcula el número de actividades en BBDD. El cálculo de la longitud hace falta para configurar la paginación de actividades. El dato se pasa como input a pagination-activities-component.
    // MMM Hay que ponerlo en este punto del código al ser asincrónica la petición HTTP GET de actividades. Se necesita que totalActivities se actualice solo después de que getAll() se haya completado. 
    // En el componente hijo: pagination-activities se pone un ngIf, para que se cargue sólo cuando el valor sea distinto a 0. Si no ha terminado de recuperar las actividades y calcular la longitud, el valor de totalActivities es 0, al ser peticiones asincrónicas.
    // El componente de paginación se carga solo cuando totalActivities tenga valor, ya tenga la longitud, y ésta sea distinta a 0 (si no hay actividades no sale la paginación). 
    // Si no se hace así totalActivities sale como un array vacío (0).
    this.totalActivities = this.activities.length;
    console.log(this.totalActivities);
    console.log(this.currentPage);

    // Nos quedamos sólo con las que saldrán en una página.
    this.paginatedData();   
  }

  // Sólo las actividades que se muestran en la página actual.
  paginatedData(): void {
    const start = (this.currentPage - 1) * (this.itemsPerPage);
    const end = start + this.itemsPerPage;
    this.activitiesOnlyOnePage = this.activities.slice(start, end);
    console.log(this.currentPage);
    console.log(this.activitiesOnlyOnePage);
  }
  
  // Recibe el ouput del hijo (pagination-activities) con el número de página que se ha clicado, y la página pulsada se convierte en la página actual. 
  changePage(page: number): void {
    this.currentPage = page;
    console.log(page);
    typeof(page);
    this.paginatedData();
    //alert("Página seleccionada en el componente padre" + page);
    //alert("Página seleccionada en el componente padre" + this.currentPage);
  }
    
}
