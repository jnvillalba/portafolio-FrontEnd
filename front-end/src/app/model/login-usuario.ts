export class LoginUsuario {
    nombreUsuario!: String;
    password!: String;

    constructors(nuevoNombreUsuario: String, nuevaPassword: String) {
        this.nombreUsuario = nuevoNombreUsuario;
        this.password = nuevaPassword;
    }

}
