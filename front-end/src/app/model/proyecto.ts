export class Proyecto {
    id?          : number
    nombreP      : string
    descripcionP : string
    fecha        : string 
    link         : string 
    img          : string 
    repo         : string

    constructor(nombreP: string, descripcionP: string, fecha: string,
        link: string, img: string, repo: string){
        this.nombreP = nombreP
        this.descripcionP = descripcionP
        this.fecha = fecha
        this.link = link
        this.img = img
        this.repo = repo
    }
}

