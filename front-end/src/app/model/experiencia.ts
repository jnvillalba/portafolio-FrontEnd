export class Experiencia {
    id?          : number
    nombreE      : string
    descripcionE : string
    puesto       : string 
    periodo      : string 
    img          : string 

    constructor(nombreE: string, descripcionE: string , puesto: string,
                periodo: string, img: string){

        this.nombreE = nombreE
        this.descripcionE = descripcionE
        this.puesto = puesto
        this.periodo = periodo
        this.img = img
    }



}
