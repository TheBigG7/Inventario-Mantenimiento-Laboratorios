import { Laboratorio } from "../laboratorios/laboratorio";
import { Periodo } from "../periodo";

export interface EncargadoLaboratorio {
    idPeriodo: number;
    nombre: string;
    apellido: string;
    tipo: string; // "responsable" o "auxiliar"
    correo: string;
    contrasenia: string;
    periodos: Periodo[];
    laboratorio: Laboratorio;
}