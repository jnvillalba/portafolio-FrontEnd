import { Component, OnInit } from '@angular/core';
import { Proyecto } from 'src/app/model/proyecto';
import { ProyectoService } from 'src/app/service/proyecto.service';
import { TokenService } from './../../service/token.service';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  proyecto: Proyecto[] = [];

  constructor(
    private sProyecto: ProyectoService,
    private sToken: TokenService) { }

    isLogged = false;

    ngOnInit(): void {
      this.cargarProyectos();
      if (this.sToken.getToken()) {
        this.isLogged = true;
      } else {
        this.isLogged = false;
      }
    }

    cargarProyectos(): void {
      this.sProyecto.lista().subscribe((data) => {
        this.proyecto = data;
      });
    }
  
    delete(id?: number) {
      if (id !== undefined) {
        this.sProyecto.delete(id).subscribe(
          (data) => {
            this.cargarProyectos();
          },
          (err) => alert('No se pudo borrar el proyecto')
        );
      }
    }

}
