import { Hys } from './../../model/hys';
import { HysService } from './../../service/hys.service';
import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-hys-skills',
  templateUrl: './hys-skills.component.html',
  styleUrls: ['./hys-skills.component.css'],
})
export class HysSkillsComponent implements OnInit {
  skill: Hys[] = [];

  constructor(private skillS: HysService, private tokenService: TokenService) {}
  isLogged = false;

  ngOnInit(): void {
    this.cargarSkills();
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  cargarSkills(): void {
    this.skillS.lista().subscribe((data) => {
      this.skill = data;
    });
  }

  delete(id: number) {
    if (id != undefined) {
      this.skillS.delete(id).subscribe(
        (data) => {
          this.cargarSkills();
        },
        (err) => {
          alert('No se pudo borrar la skill');
        }
      );
    }
  }
}
