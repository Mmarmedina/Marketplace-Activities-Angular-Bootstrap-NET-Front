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
  // MMM Página actual  (sombrear página actual, gestionar avanzar y retroceder).
  @Input() currentPage: number;

  // MMM Cuando se hace click en una página se proyecta al padre el número de página pulsada.
  @Output() onClick: EventEmitter<number>;

  totalPages: number;
  pages: number[];

  constructor() {
    this.totalActivities = 0; 
    this.itemsPerPage = 0;
    this.currentPage = 1;
    this.totalPages = 0;
    this.pages = [];
    this.onClick = new EventEmitter();
  }

  ngOnInit(): void {
    // MMM Si hay actividades, el número de página se calcula entre el total de actividades entre el número de páginas que se definan.
    // MMM El método Math.ceil sirve para que si el resultado de totalPages da con decimal redondea al entero más cercano hacia arriba.
    if(this.totalActivities) {
      this.totalPages = Math.ceil(this.totalActivities / this.itemsPerPage);
      
      // MMM Después de saber el número de páginas que necesitamos, se crea un array de tipo enteros, que se recorrerá con un ngFor* para generar las páginas (ver HTML ngFor*).
      // MMM { length: this.totalPages }: se utiliza para especificar la longitud del nuevo array. Si el valor de this.totalPages es 10, por ejemplo, es que necesitamos 10 páginas, y el array deberá tener 10 índices.
      // MMM (_, i) => i + 1: es un callback que se utiliza para transformar cada elemento del array creado. En este caso, el primer parámetro _ es el valor del elemento (que en este caso no se usa, por eso se usa _ para indicar que es un parámetro no utilizado), y i es el índice del elemento en el array. La expresión i + 1 simplemente devuelve el índice más uno, lo que significa que los números en el array resultante comenzarán desde 1 y aumentarán de uno en uno.
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);      
    }
  }

  // MMM Se hace click en una página del menú de paginación y se emite el número de página al componente padre (activity-component).
  // MMM if(page>this.totalPages) return: evita que el botón de siguiente y anterior avance a otra página si no hay actividades. De lo contrario, cuando llegas a la última página deja avanzar y sale la página vacía. Igual si estamos en la página uno y le damos al botón de anterior, se queda en blanco.
  pageClicked(page: number) {
    if(page > this.totalPages || page == 0 ) return
    this.onClick.emit(page);
  }
}
