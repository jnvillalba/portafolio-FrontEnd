import { Hys } from './../../../model/hys';
import { HysService } from './../../../service/hys.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageService } from 'src/app/service/image.service';
import { ref, list, getDownloadURL } from '@angular/fire/storage';

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
    this.img = null
    const id = this.activateRouter.snapshot.params['id'];
    const name = 'hys_' + this.nombre;
    this.imgService.uploadImage($event, name);
    setTimeout(() => {
      this.getImagen();
    }, 2000);
  }

  getImagen() {
    const imgsRef = ref(this.imgService.storage, `imagen`);
    const id = this.activateRouter.snapshot.params['id'];
    list(imgsRef)
      .then(async (response) => {
        this.img = await getDownloadURL(
          response.items.find((x) => x.name === 'hys_' + id)
        );
        console.log('edit-educ-URL:' + this.nombre);
      })
      .catch((error) =>
        console.log('No se pudo encontrar la imagen de la skill de id:' + this.nombre)
      );
  }
}
