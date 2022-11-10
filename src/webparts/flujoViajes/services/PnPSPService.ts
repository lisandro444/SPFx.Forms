import { spfi, SPFI } from "@pnp/sp/presets/all";
import { getSP } from "./pnpjsConfig";
import { Caching } from "@pnp/queryable";
import { IViajeEntity } from "../models/IViajeEntity";
import { Logger, LogLevel } from "@pnp/logging";
import { IViaje } from "../models/IViaje";


export class PnPSPService {
    private _sp: SPFI;
    private LOG_SOURCE = "🅿PnPjsLogs";
    constructor() {
        this._sp = getSP();
    }

    public async addViaje(viaje: IViaje) {
        //Creating a new sp object to include caching behavior. This way our original object is unchanged.
        const spCache = spfi(this._sp).using(Caching({ store: "session" }));
        const loginName = "i:0#.f|membership|" + viaje.responsable.mail;
        const user = await spCache.web.ensureUser(loginName);
        await spCache.web.lists
            .getByTitle("Viaje")
            .items
            .add({
                NombredeUsuario: viaje.nombreUsuario,
                IDdeUsuario: viaje.idUsuario,
                Mail: viaje.mail,
                Departamento: viaje.departamento,
                CodigodeOficina: viaje.codigoOficina,
                Tel_x00e9_fono: viaje.telefono,
                Mov_x00ed_l: viaje.movil,
                DNI: viaje.dni,
                ResponsableId: user.data.Id,
                //Evento
                Denominaci_x00f3_n: viaje.denominacion,
                Formaci_x00f3_n_x002f_Reuni_x00f: viaje.formacion,
                Motivodesplazamiento: viaje.motivoDesplazamiento,
                Localidad: viaje.localidad,
                Fecha: viaje.fecha,
                //Solicitud
                Origen: viaje.origen,
                Destino: viaje.destino,
                Fechaida: viaje.fechaIda,
                Fechavuelta: viaje.fechaVuelta,
                Fechaentrada: viaje.fechaEntrada,
                Fechasalida: viaje.fechaSalida
            });
    }
}