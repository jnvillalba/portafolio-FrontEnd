import { Observable } from 'rxjs';
import { Experiencia } from './../../../model/experiencia';
import { Component, OnInit } from '@angular/core';
import { ExperienciaService } from 'src/app/service/experiencia.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageService } from 'src/app/service/image.service';
import { Storage, ref, list, getDownloadURL } from '@angular/fire/storage';

@Component({
  selector: 'app-edit-experiencia',
  templateUrl: './edit-experiencia.component.html',
  styleUrls: ['./edit-experiencia.component.css'],
})

export class EditExperienciaComponent implements OnInit {

  expLab: Experiencia = null;
  url: string = ""

  url2: Observable<string>


  constructor(
    private sExperiencia: ExperienciaService,
    private activateRouter: ActivatedRoute,
    private router: Router,
    public imgService: ImageService,
    private storage: Storage
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
    this.expLab.img = this.url
    
    this.sExperiencia.update(id, this.expLab).subscribe(
      (data) => {
        alert('Experiencia editada');
        this.router.navigate(['']);
      },
      (err) => {
        alert('Error en editar Experiencia');
        this.router.navigate(['']);
      }
    );
  }

  uploadImage($event: any) {
    const id = this.activateRouter.snapshot.params['id'];
    const name = "experience_" + id
    this.imgService.uploadImage($event, name);
    setTimeout(() => {
      this.getImagen()
    }, 2000);
  }


  getImagen(){
    const imgsRef = ref(this.storage,`imagen`) 
    const id = this.activateRouter.snapshot.params['id'];
    list(imgsRef)
    .then(async response => {
      this.url = await getDownloadURL(response.items.find(x => x.name === "experience_"+id ))
        console.log("edit-exp-URL:" + this.url)
      }
    )
    .catch(error => console.log("No se pudo encontrar la imagen de la experiencia:"+ id))
  }
}
