import { Educacion } from './../../model/educacion';
import { Component, OnInit } from '@angular/core';
import { EducacionService } from 'src/app/service/educacion.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css'],
})
export class EducationComponent implements OnInit {
  educacion: Educacion[] = [];

  constructor(
    private sEducacion: EducacionService,
    private sToken: TokenService
  ) {}

  isLogged = false;

  ngOnInit(): void {
    this.cargarEducacion();
    if (this.sToken.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  cargarEducacion(): void {
    this.sEducacion.lista().subscribe((data) => {
      this.educacion = data;
    });
  }

  delete(id?: number) {
    if (id !== undefined) {
      this.sEducacion.delete(id).subscribe(
        (data) => {
          this.cargarEducacion();
        },
        (err) => alert('No se pudo borrar la educacion')
      );
    }
  }
}
