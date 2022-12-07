import { Hys } from './../../../model/hys';
import { HysService } from './../../../service/hys.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageService } from 'src/app/service/image.service';

@Component({
  selector: 'app-new-skill',
  templateUrl: './new-skill.component.html',
  styleUrls: ['./new-skill.component.css'],
})
export class NewSkillComponent implements OnInit {
  nombre: string;
  porcentaje: number;
  img: string;

  constructor(
    private skillS: HysService,
    private router: Router,
    private activateRouter: ActivatedRoute,
    public imgService: ImageService
  ) {}

  ngOnInit(): void {}

  onCreate(): void {
    const skill = new Hys(this.nombre, this.porcentaje, this.img);
    this.skillS.save(skill).subscribe(
      (data) => {
        alert('Skill creada correctamente');
        this.router.navigate(['']);
      },
      (err) => {
        alert('Fallo al añadir la skill');
        this.router.navigate(['']);
      }
    );
  }

  uploadImage($event: any) {
    const id = this.activateRouter.snapshot.params['id'];
    const name = 'hys_' + id;
    this.imgService.uploadImage($event, name);
  }
}
