import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Educacion } from 'src/app/model/educacion';
import { EducacionService } from 'src/app/service/educacion.service';
import { ImageService } from 'src/app/service/image.service';
import {ref, list, getDownloadURL } from '@angular/fire/storage';

@Component({
  selector: 'app-new-educacion',
  templateUrl: './new-educacion.component.html',
  styleUrls: ['./new-educacion.component.css']
})
export class NewEducacionComponent implements OnInit {

  nombreE: string = '';
  descripcionE: string = '';
  titulo       : string = '';
  periodo      : string = '';
  img          : string = '';

  constructor(
    private sEducacion: EducacionService,
    private activateRouter: ActivatedRoute,
    private router: Router,
    public imgService: ImageService
  ) {}

  ngOnInit(): void {}

  onCreate(): void {
    const exp = new Educacion(this.nombreE, this.descripcionE, this.titulo,
      this.periodo, this.img);
    this.sEducacion.save(exp).subscribe(
      (data) => {
        alert('Educacion añadida');
        this.router.navigate(['']);
      },
      (err) => {
        alert('Error en añadir Educacion');
        this.router.navigate(['']);
      }
    );
  }

  uploadImage($event: any) {
    this.img = null
    const id = this.activateRouter.snapshot.params['id'];
    const name = "education_" + id
    this.imgService.uploadImage($event, name);
    this.getImagen()
  }

  getImagen(){
    const imgsRef = ref(this.imgService.storage,`imagen`) 
    const id = this.activateRouter.snapshot.params['id'];
    list(imgsRef)
    .then(async response => {
      this.img = await getDownloadURL(response.items.find(x => x.name === "education_"+id ))
        console.log("edit-educ-URL:" + this.img)
      }
    )
    .catch(error => console.log("No se pudo encontrar la imagen de la educacion:"+ id))
  }
}
