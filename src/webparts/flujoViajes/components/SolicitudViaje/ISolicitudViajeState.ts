export interface ISolicitudViajeState {
   nombreUsuario: string;
   idUsuario: string;
   mail: string;
   departamento: string;
   codigoOficina: string;
   telefono: string;
   movil: string;
   dni: string;
   responsable: any;

   denominacion: string;
   formacion: string;
   motivoDesplazamiento: string;
   localidad: string;
   fecha: Date;

   origen: string;
   destino: string;
   fechaIda: Date;
   fechaVuelta: Date;
   fechaEntrada: Date;
   fechaSalida: Date;
   comentarios: string;

   //behaviors props
   added: boolean;
}