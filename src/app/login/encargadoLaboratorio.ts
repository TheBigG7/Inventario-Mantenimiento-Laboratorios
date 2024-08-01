import { Laboratorio } from "../laboratorios/laboratorio";
import { Periodo } from "../periodo";

export interface EncargadoLaboratorio {
    idEncargado: number;
    nombre: string;
    apellido: string;
    tipo: string; // "responsable" o "auxiliar"
    correo: string;
    contrasenia: string;
    rol: string;
    periodos: Periodo[];
    laboratorio: Laboratorio;
}