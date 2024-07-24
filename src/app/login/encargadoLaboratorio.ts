export interface EncargadoLaboratorio {
    id: number;
    nombre: string;
    apellido: string;
    laboratorioAsignado: string;
    tipo: string; // "responsable" o "auxiliar"
    correo: string;
    contraseña: string;
}