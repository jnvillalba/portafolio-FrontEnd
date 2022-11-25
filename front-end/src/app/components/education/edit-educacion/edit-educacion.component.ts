import { Educacion } from './../../../model/educacion';
import { Component, OnInit } from '@angular/core';
import { EducacionService } from 'src/app/service/educacion.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-educacion',
  templateUrl: './edit-educacion.component.html',
  styleUrls: ['./edit-educacion.component.css'],
})
export class EditEducacionComponent implements OnInit {
  educ: Educacion = null;

  constructor(
    private sEducacion: EducacionService,
    private activateRouter: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.activateRouter.snapshot.params['id'];
    this.sEducacion.detail(id).subscribe(
      (data) => {
        this.educ = data;
      },
      (err) => {
        alert('Error en editar Educacion');
        this.router.navigate(['']);
      }
    );
  }

  onUpdate(): void {
    const id = this.activateRouter.snapshot.params['id'];
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
}