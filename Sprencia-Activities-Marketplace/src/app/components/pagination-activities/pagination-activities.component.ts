import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';

@Component({
  selector: 'app-pagination-activities',
  templateUrl: './pagination-activities.component.html',
  styleUrl: './pagination-activities.component.css'
})
export class PaginationActivitiesComponent {

  // MMM Número de actividades
  @Input() totalActivities: number;
  // MMM Número de actividades por pagina.
  @Input() itemsPerPage: number;
  // MMM Página actual
  @Input() currentPage: number;

  // MMM Cuando se hace click en una página se proyecta al padre el número de página pulsada.
  @Output() onClick: EventEmitter<number>;

  totalPages: number;
  pages: number[];

  constructor() {
    this.totalActivities = 0; 
    this.itemsPerPage = 0;
    this.currentPage = 0; //ADD
    this.totalPages = 0;
    this.pages = [];
    this.onClick = new EventEmitter();
  }

  ngOnInit(): void {
    // MMM Si hay actividades, el número de página se calcula entre el total de actividades entre el número de páginas que se definan.
    // MMM El método Math.ceil sirve para que si el resultado de totalPages da con decimal redondea al entero más cercano hacia arriba.
    if(this.totalActivities) {
      this.totalPages = Math.ceil(this.totalActivities / this.itemsPerPage);

      console.log(this.totalPages);
      // MMM Generar las páginas (ver HTML ngFor*).
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);

      console.log(this.totalActivities); 
      console.log (this.totalPages);
      console.log(this.itemsPerPage);
      console.log(this.currentPage);
      
    }
  }

  // MMM Se hace click en una página del menú de paginación y se emite el número de página al componente padre (activity-component).
  // MMM if(page>this.totalPages) return: evita que el botón de siguiente y anterior avance a otra página si no hay actividades. De lo contrario, cuando llegas a la última página deja avanzar y sale la página vacía. Igual si estamos en la página uno y le damos al botón de anterior, se queda en blanco.
  pageClicked(page: number) {
    if(page>this.totalPages || page==0 ) return
    this.onClick.emit(page);
    console.log(page);
  }
}
