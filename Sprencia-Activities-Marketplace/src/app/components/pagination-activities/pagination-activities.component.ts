import { Component } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-pagination-activities',
  templateUrl: './pagination-activities.component.html',
  styleUrl: './pagination-activities.component.css'
})
export class PaginationActivitiesComponent {

  // Número de actividades
  @Input() totalActivities: number;
  // Página actual
  @Input () currentPage: any;
  // Número de actividades por pagina.
  @Input () itemsPerPage: number;

  totalPages: number;
  pages: number[];

  constructor() {
    this.totalActivities = 0; 
    this.itemsPerPage = 0;
    this.totalPages = 0;
    this.pages = [];
  }

  ngOnInit(): void {
    // Si hay actividades, el número de página se calcula entre el total de actividades entre el número de páginas que se definan.
    // El método Math.ceil sirve para que si el resultado de totalPages da con decimal redondea al entero más cercano hacia arriba.
    if(this.totalActivities) {
      this.totalPages = Math.ceil(this.totalActivities / this.itemsPerPage);
      // Generar las páginas (ver HTML ngFor*).
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);

      console.log(this.totalActivities); 
      console.log (this.totalPages);
      console.log(this.itemsPerPage);
    }
  }
}
