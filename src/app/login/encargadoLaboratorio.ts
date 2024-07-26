export interface EncargadoLaboratorio {
    encargadoLaboratorio_id: number;
    nombre: string;
    apellido: string;
    laboratorioAsignado: string;
    tipo: string; // "responsable" o "auxiliar"
    correo: string;
    contrasenia: string;
}