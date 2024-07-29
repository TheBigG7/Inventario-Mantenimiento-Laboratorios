import { Laboratorio } from "./laboratorios/laboratorio"
import { AdministradorTIC } from "./login/administradorTIC"
import { EncargadoLaboratorio } from "./login/encargadoLaboratorio"


export interface Periodo {

    idPeriodo: number
    fechaInicio: string
    fechaFin: string
    administradoresTICs: AdministradorTIC[]
    encargadoLaboratorio: EncargadoLaboratorio[]
    laboratorios: Laboratorio[];

}