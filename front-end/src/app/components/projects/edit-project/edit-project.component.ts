import { Component, OnInit } from '@angular/core';
import { Proyecto } from 'src/app/model/proyecto';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageService } from 'src/app/service/image.service';
import { ProyectoService } from 'src/app/service/proyecto.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {

  proyecto: Proyecto = null;


  constructor(
    private sProyecto: ProyectoService,
    private activateRouter: ActivatedRoute,
    private router: Router,
    public imgService: ImageService
  ) {}

  ngOnInit(): void {
    const id = this.activateRouter.snapshot.params['id']
    this.sProyecto.detail(id).subscribe(
      (data) => {
        this.proyecto = data
      },
      (err) => {
        alert('Error en editar Proyecto');
        this.router.navigate(['']);
      }
    );
  }

  onUpdate(): void {
    const id = this.activateRouter.snapshot.params['id']
    this.proyecto.img = this.imgService.url
    this.sProyecto.update(id, this.proyecto).subscribe(
      (data) => {
        alert('Proyecto editado');
        this.router.navigate(['']);
      },
      (err) => {
        alert('Error en editar Proyecto');
        this.router.navigate(['']);
      }
    );
  }

  uploadImage($event: any) {
    const id = this.activateRouter.snapshot.params['id'];
    const name = "new_logo_proyecto" + id
    this.imgService.uploadImage($event, name);
  }
}

