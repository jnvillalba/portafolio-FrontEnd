import { ActivatedRoute, Router } from '@angular/router';
import { ImageService } from 'src/app/service/image.service';
import { Component, OnInit } from '@angular/core';
import { ExperienciaService } from 'src/app/service/experiencia.service';
import { Experiencia } from 'src/app/model/experiencia';

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
    private activateRouter: ActivatedRoute,
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
    const id = this.activateRouter.snapshot.params['id'];
    const name = 'experience_' + id;
    this.imgService.uploadImage($event, name);
  }
}
