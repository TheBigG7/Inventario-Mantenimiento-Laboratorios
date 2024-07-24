export interface AdministradorTIC {
    id: number;
    nombre: string;
    apellido: string;
    fechaInicio: string;// LocalDate en Java se convertirá a string en TypeScript, ya que en TypeScript las fechas suelen manejarse como strings en formato ISO 8601.
    fechaFin: string;
    correo: string;
    contraseña: string;
}
