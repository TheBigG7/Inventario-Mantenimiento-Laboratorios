import { Periodo } from "../periodo";

export interface CredencialSuperAcceso {
    idCredencial: number;
    credencial: string;
    contrasenia: string;
    periodos: Periodo[];
  }