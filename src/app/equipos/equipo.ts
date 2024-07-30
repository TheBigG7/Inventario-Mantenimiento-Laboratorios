import { Laboratorio } from "../laboratorios/laboratorio";

export interface Equipo {
    idEquipo: number;
    numEquipo: number;
    procesador: string;
    ram: string;
    capacidadDisco: string;
    serieDisco: string;
    modeloDisco: string;
    estado: string;
    appInstall: string;
    prioridad: string;
    laboratorio: Laboratorio | null;
}
