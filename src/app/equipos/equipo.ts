import { Laboratorio } from "../laboratorios/laboratorio";

export interface Equipo {
    idEquipo: number;
    num_equipo: number;
    procesador: string;
    ram: string;
    capacidad_disco: string;
    serie_disco: string;
    modelo_disco: string;
    estado: string;
    app_install: string;
    prioridad: string;
    laboratorio: Laboratorio | null;
}
