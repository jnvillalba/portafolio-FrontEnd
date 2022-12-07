import { persona } from 'src/app/model/persona.model';
import { Component, OnInit } from '@angular/core';
import { PersonaService } from 'src/app/service/persona.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageService } from 'src/app/service/image.service';
import { Storage, ref, list, getDownloadURL } from '@angular/fire/storage';

@Component({
  selector: 'app-edit-about',
  templateUrl: './edit-about.component.html',
  styleUrls: ['./edit-about.component.css'],
})
export class EditAboutComponent implements OnInit {
  persona: persona = null;
  url: string = ""
  urlBanner: string = ""

  constructor(
    private personaService: PersonaService,
    private activateRouter: ActivatedRoute,
    private router: Router,
    public imgService: ImageService
  ) {}

  ngOnInit(): void {
    const id = this.activateRouter.snapshot.params['id'];
    this.personaService.detail(id).subscribe(
      (data) => {
        this.persona = data;
      },
      (err) => {
        alert('Error en editar Persona');
        this.router.navigate(['']);
      }
    );
  }

  onUpdate(): void {
    const id = this.activateRouter.snapshot.params['id'];
    this.persona.img = this.url
    this.persona.imgBanner = this.urlBanner
    this.personaService.update(id, this.persona).subscribe(
      (data) => {
        alert('Persona editada');
        this.router.navigate(['']);
      },
      (err) => {
        alert('Error al editar Persona');
        this.router.navigate(['']);
      }
    );
  }

  uploadImage($event: any) {
    const id = this.activateRouter.snapshot.params['id'];
    const name = "perfil_" + id
    this.imgService.uploadImage($event, name);
    this.getImagen()
  }

  getImagen(){
    const imgsRef = ref(this.imgService.storage,`imagen`) 
    const id = this.activateRouter.snapshot.params['id'];
    list(imgsRef)
    .then(async response => {
      this.url = await getDownloadURL(response.items.find(x => x.name === "perfil_"+id ))
        console.log("edit-profile-URL:" + this.url)
      }
    )
    .catch(error => console.log("No se pudo encontrar la imagen de Perfil"))
  }

  uploadBanner($event: any){
    const name = 'banner_1';
    this.imgService.uploadImage($event, name);
    this.getBanner();
  }

  getBanner() {
    const imgsRef = ref(this.imgService.storage, `imagen`);
    list(imgsRef)
      .then(async (response) => {
        this.urlBanner = await getDownloadURL(
          response.items.find((x) => x.name === 'banner_1')
        );
        console.log('edit-banner-URL:' + this.urlBanner);
      })
      .catch((error) => console.log('No se pudo encontrar la imagen del Banner'));
  }

}
