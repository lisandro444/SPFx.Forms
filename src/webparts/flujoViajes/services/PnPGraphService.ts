import { getGraph } from "./pnpjsConfig";
import { GraphFI } from "@pnp/graph";
import { Logger, LogLevel } from "@pnp/logging";
import { IViaje } from "../models/IViaje";


export class PnPGraphService {
    private _graph: GraphFI;
    private LOG_SOURCE = "🅿PnPjsLogs";
    constructor() {
        this._graph = getGraph();
    }

    public async getCurrentUser(): Promise<IViaje> {
        let currentUser: IViaje;
        try {
            const myInfo = await this._graph.me.select("displayName","mail","department","employeeId","mobilePhone","businessPhones","officeLocation").expand("manager")();
            if (myInfo) {
                return {
                    nombreUsuario: myInfo.displayName,
                    mail: myInfo.mail,
                    codigoOficina: "",
                    departamento: myInfo.department,
                    dni: "",
                    idUsuario: myInfo.employeeId,
                    movil: myInfo.mobilePhone,
                    telefono: myInfo.businessPhones[0],
                    responsable: myInfo.manager,
                    denominacion: "",
                    formacion: "",
                    motivoDesplazamiento: "",
                    localidad: myInfo.officeLocation,
                    fecha: null,
                    origen: "",
                    destino: "",
                    fechaIda: null,
                    fechaVuelta: null,
                    fechaEntrada: null,
                    fechaSalida: null,
                    comentarios: ""
                }
            }
        } catch (error) {
            console.log("Error in getCurrentUser PnPGraphService: " + error);
            Logger.write(`${this.LOG_SOURCE} (getCurrentUser) - ${JSON.stringify(error)} - `, LogLevel.Error);
        }
        return currentUser;
    }
}