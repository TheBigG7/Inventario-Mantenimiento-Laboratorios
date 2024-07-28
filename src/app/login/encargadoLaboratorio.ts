import { Laboratorio } from "../laboratorios/laboratorio";

export interface EncargadoLaboratorio {
    encargadoLaboratorio_id: number;
    nombre: string;
    apellido: string;
    tipo: string; // "responsable" o "auxiliar"
    correo: string;
    contrasenia: string;

    laboratorioAsignado: Laboratorio;
    periodoos: [];
}