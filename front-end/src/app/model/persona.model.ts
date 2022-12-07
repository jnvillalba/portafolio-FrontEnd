export class persona {
  id?: number;
  nombre: string;
  apellido: string;
  descripcion: string;
  img: string;
  imgBanner: string;

  constructor(
    nombre: string,
    apellido: string,
    descripcion: string,
    img: string,
    imgBanner: string
  ) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.descripcion = descripcion;
    this.img = img;
    this.imgBanner = imgBanner;
  }
}
