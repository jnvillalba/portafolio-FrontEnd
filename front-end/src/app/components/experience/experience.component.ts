import { Experiencia } from './../../model/experiencia';
import { TokenService } from './../../service/token.service';
import { ExperienciaService } from './../../service/experiencia.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css'],
})
export class ExperienceComponent implements OnInit {
  experiencia: Experiencia[] = [];

  constructor(
    private sExperiencia: ExperienciaService,
    private sToken: TokenService
  ) {}

  isLogged = false;

  ngOnInit(): void {
    this.cargarExperiencia();
    if (this.sToken.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  cargarExperiencia(): void {
    this.sExperiencia.lista().subscribe((data) => {
      this.experiencia = data;
    });
  }

  delete(id?: number) {
    if (id !== undefined) {
      this.sExperiencia.delete(id).subscribe(
        (data) => {
          this.cargarExperiencia();
        },
        (err) => alert('No se pudo borrar la experiencia')
      );
    }
  }
}
