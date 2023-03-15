import { Component, OnInit } from '@angular/core';
import { Proyecto } from 'src/app/model/proyecto';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageService } from 'src/app/service/image.service';
import { ProyectoService } from 'src/app/service/proyecto.service';
import { ref, list, getDownloadURL } from '@angular/fire/storage';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css'],
})
export class EditProjectComponent implements OnInit {
  proyecto: Proyecto = null;
  url: string = '';

  constructor(
    private sProyecto: ProyectoService,
    private activateRouter: ActivatedRoute,
    private router: Router,
    public imgService: ImageService
  ) {}

  ngOnInit(): void {
    const id = this.activateRouter.snapshot.params['id'];
    if (id) {
      this.sProyecto.detail(id).subscribe(
        (data) => {
          this.proyecto = data;
          this.getImagen();
        },
        (err) => {
          alert('Error en editar Proyecto');
          this.router.navigate(['']);
        }
      );
    } else {
      alert('ID de proyecto no válido');
      this.router.navigate(['']);
    }
  }

  onUpdate(): void {
    const id = this.activateRouter.snapshot.params['id'];
    this.proyecto.img = this.url;
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
    this.url = null;
    const name = 'proyecto_' + this.proyecto.nombreP;
    this.imgService.uploadImage($event, name);
    setTimeout(() => {
      this.getImagen();
    }, 3000);
  }

  getImagen() {
    const imgsRef = ref(this.imgService.storage, `imagen`);
    list(imgsRef)
      .then(async (response) => {
        this.url = await getDownloadURL(
          response.items.find(
            (x) => x.name === 'proyecto_' + this.proyecto.nombreP
          )
        );
      })
      .catch((error) =>
        console.log(
          error +
            'No se pudo encontrar la imagen del proyecto de id: ' +
            this.proyecto.nombreP
        )
      );
  }
}
