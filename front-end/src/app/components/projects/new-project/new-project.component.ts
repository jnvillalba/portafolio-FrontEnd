import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Proyecto } from 'src/app/model/proyecto';
import { ImageService } from 'src/app/service/image.service';
import { ProyectoService } from 'src/app/service/proyecto.service';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit {

  nombreP: string = '';
  descripcionP: string = '';
  fecha       : string = '';
  link      : string = '';
  img          : string = '';

  constructor(
    private sProyecto: ProyectoService,
    private activateRouter: ActivatedRoute,
    private router: Router,
    public imgService: ImageService
  ) {}

  ngOnInit(): void {}

  onCreate(): void {
    const exp = new Proyecto(this.nombreP, this.descripcionP, this.fecha,
      this.link, this.img);
    this.sProyecto.save(exp).subscribe(
      (data) => {
        alert('Proyecto añadido');
        this.router.navigate(['']);
      },
      (err) => {
        alert('Error en añadir Proyecto');
        this.router.navigate(['']);
      }
    );
  }

  uploadImage($event: any) {
    const id = this.activateRouter.snapshot.params['id'];
    const name = "logo_proyecto" + id
    this.imgService.uploadImage($event, name);
  }
}
