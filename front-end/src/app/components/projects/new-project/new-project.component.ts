import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Proyecto } from 'src/app/model/proyecto';
import { ImageService } from 'src/app/service/image.service';
import { ProyectoService } from 'src/app/service/proyecto.service';
import { ref, list, getDownloadURL } from '@angular/fire/storage';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css'],
})
export class NewProjectComponent implements OnInit {
  nombreP: string = '';
  descripcionP: string = '';
  fecha: string = '';
  link: string = '';
  img: string = '';

  constructor(
    private sProyecto: ProyectoService,
    private activateRouter: ActivatedRoute,
    private router: Router,
    public imgService: ImageService
  ) {}

  ngOnInit(): void {}

  onCreate(): void {
    const exp = new Proyecto(
      this.nombreP,
      this.descripcionP,
      this.fecha,
      this.link,
      this.img
    );
    this.sProyecto.save(exp).subscribe(
      (data) => {
        alert('Proyecto creado correctamente');
        this.router.navigate(['']);
      },
      (err) => {
        alert('Error en crear Proyecto');
        this.router.navigate(['']);
      }
    );
  }

  uploadImage($event: any) {
    const id = this.activateRouter.snapshot.params['id'];
    this.img = null
    const name = 'proyecto_' + this.nombreP;
    this.imgService.uploadImage($event, name);
    setTimeout(() => {
      this.getImagen()
    }, 3000);
  }

  getImagen() {
    const imgsRef = ref(this.imgService.storage, `imagen`);
    const id = this.activateRouter.snapshot.params['id'];
    list(imgsRef)
      .then(async (response) => {
        this.img = await getDownloadURL(
          response.items.find((x) => x.name === 'proyecto_' + this.nombreP)
        );
        console.log('edit-proy-URL:' + this.img);
      })
      .catch((error) =>
        console.log('No se pudo encontrar la imagen del proyecto de id:' + this.nombreP)
      );
  }
}
