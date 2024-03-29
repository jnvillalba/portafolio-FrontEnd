import { ActivatedRoute, Router } from '@angular/router';
import { ImageService } from 'src/app/service/image.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ExperienciaService } from 'src/app/service/experiencia.service';
import { Experiencia } from 'src/app/model/experiencia';
import { ref, list, getDownloadURL } from '@angular/fire/storage';

@Component({
  selector: 'app-new-experiencia',
  templateUrl: './new-experiencia.component.html',
  styleUrls: ['./new-experiencia.component.css'],
})
export class NewExperienciaComponent implements OnInit {
  nombreE: string = '';
  descripcionE: string = '';
  puesto: string = '';
  periodo: string = '';
  img: string = '';

  constructor(
    private sExperiencia: ExperienciaService,
    private router: Router,
    public imgService: ImageService
  ) {}

  ngOnInit(): void {}

  onCreate(): void {
    const exp = new Experiencia(
      this.nombreE,
      this.descripcionE,
      this.puesto,
      this.periodo,
      this.img
    );
    this.sExperiencia.save(exp).subscribe(
      (data) => {
        alert('Experiencia añadida');
        this.router.navigate(['']);
      },
      (err) => {
        alert('Error en añadir experiencia');
        this.router.navigate(['']);
      }
    );
  }

  uploadImage($event: any) {
    this.img = null;
    const name = 'experience_' + this.nombreE;
    this.imgService.uploadImage($event, name);
    setTimeout(() => {
      this.getImagen();
    }, 3000);
  }

  getImagen() {
    const imgsRef = ref(this.imgService.storage, `imagen`);
    const name = 'experience_' + this.nombreE;
    list(imgsRef)
      .then(async (response) => {
        this.img = await getDownloadURL(
          response.items.find((x) => x.name === name)
        );
      })
      .catch((error) =>
        console.log(
          'No se pudo encontrar la imagen de la experiencia:' + this.nombreE
        )
      );
  }
}
