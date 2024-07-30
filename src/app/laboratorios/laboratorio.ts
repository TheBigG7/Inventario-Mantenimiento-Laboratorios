import { Equipo } from "../equipos/equipo";
import { AdministradorTIC } from "../login/administradorTIC";
import { EncargadoLaboratorio } from "../login/encargadoLaboratorio";
import { Periodo } from "../periodo";

export interface Laboratorio {
    idLaboratorio: string
    num_maquinas: number
    proyector: string
    equipos: Equipo
    administradores: AdministradorTIC[]
    periodos: Periodo[]
    encargados: EncargadoLaboratorio[]
}
