import { Experiencia } from './../../../model/experiencia';
import { Component, OnInit } from '@angular/core';
import { ExperienciaService } from 'src/app/service/experiencia.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-experiencia',
  templateUrl: './edit-experiencia.component.html',
  styleUrls: ['./edit-experiencia.component.css'],
})

export class EditExperienciaComponent implements OnInit {


  expLab: Experiencia = null;


  constructor(
    private sExperiencia: ExperienciaService,
    private activateRouter: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.activateRouter.snapshot.params['id']
    this.sExperiencia.detail(id).subscribe(
      (data) => {
        this.expLab = data
      },
      (err) => {
        alert('Error en editar experiencia');
        this.router.navigate(['']);
      }
    );
  }

  onUpdate(): void {
    const id = this.activateRouter.snapshot.params['id']
    this.sExperiencia.update(id, this.expLab).subscribe(
      (data) => {
        alert('Experiencia editada');
        this.router.navigate(['']);
      },
      (err) => {
        alert('Error en editar experiencia');
        this.router.navigate(['']);
      }
    );
  }
}
