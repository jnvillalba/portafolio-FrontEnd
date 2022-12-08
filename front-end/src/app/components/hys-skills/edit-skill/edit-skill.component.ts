import { HysService } from './../../../service/hys.service';
import { Component, OnInit } from '@angular/core';
import { Hys } from 'src/app/model/hys';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageService } from 'src/app/service/image.service';
import { ref, list, getDownloadURL } from '@angular/fire/storage';

@Component({
  selector: 'app-edit-skill',
  templateUrl: './edit-skill.component.html',
  styleUrls: ['./edit-skill.component.css'],
})
export class EditSkillComponent implements OnInit {
  skill: Hys = null;
  url: string = ""

  constructor(
    private skillS: HysService,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    public imgService: ImageService,
  ) {}

  ngOnInit(): void {
    this.getImagen()
    const id = this.activatedRouter.snapshot.params['id'];
    this.skillS.detail(id).subscribe(
      (data) => {
        this.skill = data;
      },
      (err) => {
        alert('Error al modificar');
        this.router.navigate(['']);
      }
    );
  }

  onUpdate() {
    const id = this.activatedRouter.snapshot.params['id'];
    this.skill.img = this.url

    this.skillS.update(id, this.skill).subscribe(
      (data) => {
        this.router.navigate(['']);
      },
      (err) => {
        alert('Error al modificar la skill');
        this.router.navigate(['']);
      }
    );
  }


  uploadImage($event: any) {
    this.url = null
    const id = this.activatedRouter.snapshot.params['id'];
    const name = "hys_" + id
    this.imgService.uploadImage($event, name);
    setTimeout(() => {
      this.getImagen()
    }, 2000);
  }


  getImagen(){
    const imgsRef = ref(this.imgService.storage,`imagen`) 
    const id = this.activatedRouter.snapshot.params['id'];
    
    list(imgsRef)
    .then(async response => {
      this.url = await getDownloadURL(response.items.find(x => x.name === "hys_"+id ))
        console.log("edit-exp-URL:" + this.url)
      }
    )
    .catch(error => console.log("No se pudo encontrar la imagen de la skill de id:"+id))
  }
}
