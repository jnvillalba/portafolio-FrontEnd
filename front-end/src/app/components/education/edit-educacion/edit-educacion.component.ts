import { Educacion } from './../../../model/educacion';
import { Component, OnInit } from '@angular/core';
import { EducacionService } from 'src/app/service/educacion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageService } from 'src/app/service/image.service';
import { ref, list, getDownloadURL } from '@angular/fire/storage';

@Component({
  selector: 'app-edit-educacion',
  templateUrl: './edit-educacion.component.html',
  styleUrls: ['./edit-educacion.component.css'],
})
export class EditEducacionComponent implements OnInit {
  educ: Educacion = null;
  url: string = '';

  constructor(
    private sEducacion: EducacionService,
    private activateRouter: ActivatedRoute,
    private router: Router,
    private imgService: ImageService
  ) {}

  ngOnInit(): void {
    const id = this.activateRouter.snapshot.params['id'];
    this.sEducacion.detail(id).subscribe(
      (data) => {
        this.educ = data;
        this.getImagen();
      },
      (err) => {
        alert('Error en editar Educacion');
        this.router.navigate(['']);
      }
    );
  }

  onUpdate(): void {
    const id = this.activateRouter.snapshot.params['id'];
    this.educ.img = this.url;
    this.sEducacion.update(id, this.educ).subscribe(
      (data) => {
        alert('Educacion editada');
        this.router.navigate(['']);
      },
      (err) => {
        alert('Error al editar Educacion');
        this.router.navigate(['']);
      }
    );
  }

  uploadImage($event: any) {
    this.url = null;
    const name = 'education_' + this.educ.nombreE;
    this.imgService.uploadImage($event, name);
    setTimeout(() => {
      this.getImagen();
    }, 2000);
  }

  getImagen() {
    const imgsRef = ref(this.imgService.storage, `imagen`);
    list(imgsRef)
      .then(async (response) => {
        this.url = await getDownloadURL(
          response.items.find(
            (x) => x.name === 'education_' + this.educ.nombreE
          )
        );
        this.educ.nombreE;
      })
      .catch((error) =>
        console.log(
          error +
            'No se pudo encontrar la imagen de la educacion:' +
            this.educ.nombreE
        )
      );
  }
}
