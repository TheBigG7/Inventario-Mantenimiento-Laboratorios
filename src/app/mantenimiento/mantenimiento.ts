import { Equipo } from "../equipos/equipo";
import { Repuestos } from "../repuestos/repuestos";

export interface Mantenimiento {
    id: number;
    equipo: Equipo;
    repuesto: Repuestos[];
    fechaMant: Date;
    nombreEncargado: string;
}