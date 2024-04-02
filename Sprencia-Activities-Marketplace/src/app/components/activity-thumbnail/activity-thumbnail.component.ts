import { Component, Input } from '@angular/core';
import { Activity } from '../../interfaces/activity.interface';
import { ActivitiesService } from '../../services/activities.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-activity-thumbnail',
  templateUrl: './activity-thumbnail.component.html',
  styleUrl: './activity-thumbnail.component.css'
})

export class ActivityThumbnailComponent {

  @Input () activity: Activity;

  constructor(
    private activitiesService: ActivitiesService,
    private router: Router) {
      this.activity = {
        id: 0,
        title: "",
        description: "",
        price: 0,
        schedule: [],
        review: []
      }
  };

async onDeleteClick(): Promise<void> {
  // MMM Mostrar mensaje de confirmación antes de eliminar.
  const result = await Swal.fire({
    title: "¿Estás seguro de que quieres eliminar la actividad?",
    text: "Esta acción es irreversible",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "¡Sí, bórrala!"
  });

  // MMM Si el usuario confirma la eliminación se hace la petición delete.
  if (result.isConfirmed) {
    try {
      // MMM Eliminar la actividad
      await this.activitiesService.delete(this.activity.id);
      
      // MMM Mostrar mensaje de que la actividad ha sido eliminada.
      Swal.fire({
        title: "Eliminada",
        text: "La actividad ha sido borrada",
        icon: "success"
      });

      // MMM Redirigir a la página de inicio
      this.router.navigate(['/home']);
    } catch (error) {
      // MMM Mensaje si falla el proceso de eliminar.
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "La actividad no se ha podido eliminar. Inténtalo de nuevo.",
        // footer: '<a href="#">Why do I have this issue?</a>'
      });
    }// MMM Si le da a cancelar redirige a home.
    } else {
      this.router.navigate(['/home']);
    }
  }
}
  
    


  
  





