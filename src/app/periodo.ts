import { AdministradorService } from "./login/administrador.service"
import { EncargadoLaboratorio } from "./login/encargadoLaboratorio"


export interface Periodo {

    idPeriodo: number
    fechaInicio: string
    fechaFin: string
    administradores: AdministradorService[]
    encargados: EncargadoLaboratorio[]
    laboratorios: [];

}