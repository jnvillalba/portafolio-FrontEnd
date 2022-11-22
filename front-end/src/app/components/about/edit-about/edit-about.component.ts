import { persona } from 'src/app/model/persona.model';
import { Component, OnInit } from '@angular/core';
import { PersonaService } from 'src/app/service/persona.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageService } from 'src/app/service/image.service';

@Component({
  selector: 'app-edit-about',
  templateUrl: './edit-about.component.html',
  styleUrls: ['./edit-about.component.css']
})
export class EditAboutComponent implements OnInit {
  persona: persona = null;

  constructor(
    private personaService: PersonaService,
    private activateRouter: ActivatedRoute,
    private router: Router,
    public imgService : ImageService
  ) { }

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

  onUpdate():void{
    const id = this.activateRouter.snapshot.params['id'];
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

  uploadImage($event: any){
this.imgService.uploadImage($event)
    
  }

}
