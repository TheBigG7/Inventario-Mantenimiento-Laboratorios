import { Laboratorio } from "../laboratorios/laboratorio";
import { Periodo } from "../periodo";

export interface AdministradorTIC {
    administradorTIC_id: number;
    nombre: string;
    apellido: string;
    correo: string;
    contrasenia: string;
    rol: string;
    periodos: Periodo[];
    laboratorios: Laboratorio[];
}
