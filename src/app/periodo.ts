import { Laboratorio } from "./laboratorios/laboratorio"
import { AdministradorTIC } from "./login/administradorTIC"
import { EncargadoLaboratorio } from "./login/encargadoLaboratorio"
import { CredencialSuperAcceso } from "./super-acceso/CredencialSuperAcceso"


export interface Periodo {

    idPeriodo: number
    fechaInicio: string
    fechaFin: string
    laboratorios: Laboratorio[];
    administradoresTICs: AdministradorTIC[]
    encargadoLaboratorio: EncargadoLaboratorio[]
    credencial: CredencialSuperAcceso
}