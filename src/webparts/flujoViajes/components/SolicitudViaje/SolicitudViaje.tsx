import * as React from 'react';
import styles from './SolicitudViaje.module.scss';
import { ISolicitudViajeProps } from './ISolicitudViajeProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { createTheme, DatePicker, defaultDatePickerStrings, ITheme, Label, MessageBar, MessageBarType, Separator, Stack, TextField } from '@fluentui/react';
import { PnPGraphService } from '../../services/PnPGraphService';
import { ISolicitudViajeState } from './ISolicitudViajeState';
import { PrimaryButton } from 'office-ui-fabric-react';
import { PnPSPService } from '../../services/PnPSPService';
import { IViaje } from '../../models/IViaje';
// import { IUser } from '@pnp/graph/users';



export default class SolicitudViaje extends React.Component<ISolicitudViajeProps, ISolicitudViajeState> {
  private _pnpGraphService;
  private _pnpPnPService;

  constructor(props: ISolicitudViajeProps) {
    super(props);
    this._pnpGraphService = new PnPGraphService();
    this._pnpPnPService = new PnPSPService();

    this.state = {
      nombreUsuario: "",
      idUsuario: "",
      mail: "",
      departamento: "",
      codigoOficina: "",
      telefono: "",
      movil: "",
      dni: "",
      responsable: null,

      denominacion: "",
      formacion: "",
      motivoDesplazamiento: "",
      localidad: "",
      fecha: null,

      origen: "",
      destino: "",
      fechaIda: null,
      fechaVuelta: null,
      fechaEntrada: null,
      fechaSalida: null,
      comentarios: null,

      //behaivors props
      added: false
    };
  }
  public async componentDidMount(): Promise<void> {
    try {
      await this._pnpGraphService.getCurrentUser().then(myInfo => {
        if (myInfo) {
          this.setState({
            nombreUsuario: myInfo.nombreUsuario,
            idUsuario: myInfo.idUsuario,
            mail: myInfo.mail,
            departamento: myInfo.departamento,
            telefono: myInfo.telefono,
            movil: myInfo.movil,
            responsable: myInfo.responsable,
            localidad: myInfo.localidad
          })
        }
      });

    } catch (error) {
      console.log("Error in componentDidMount - ListComplete Component: " + error);
      //Logger.write(`${this.LOG_SOURCE} (getAllItems) - ${JSON.stringify(error)} - `, LogLevel.Error);
      //return null;
    }

  }

  onTextFieldChange = (e: any) => {
    let value = e.target.value;
    let name = e.target.name;
    this.setState({ ...this.state, [name]: value })
  }



  public render(): React.ReactElement<ISolicitudViajeProps> {
    const currentViaje = this.state;

    const formatDate = (date?: Date): string => {
      if (!date) return '';
      const month = date.getMonth() + 1; // + 1 because 0 indicates the first Month of the Year.
      const day = date.getDate();
      const year = date.getFullYear();

      return `${day}/${month}/${year}`;
    }
    return (
      <div>
        <Separator>Datos de Usuario</Separator>
        <Stack>
          <Stack>
            <Label required>Nombre de Usuario</Label>
            <TextField disabled value={currentViaje?.nombreUsuario} />
          </Stack>
          <Stack >
            <Label required>ID de Usuario</Label>
            <TextField disabled value={currentViaje?.idUsuario} />
          </Stack>
          <Stack>
            <Label required>Mail</Label>
            <TextField disabled value={currentViaje?.mail} />
          </Stack>
          <Stack>
            <Label required>Departamento</Label>
            <TextField disabled value={currentViaje?.departamento} />
          </Stack>
          <Stack>
            <Label required>Codigo de Oficina</Label>
            <TextField value={currentViaje.codigoOficina} name="codigoOficina" onChange={this.onTextFieldChange} placeholder="Ingrese su Codigo de Oficina aquí" />
          </Stack>
          <Stack>
            <Label required>Teléfono</Label>
            <TextField disabled value={currentViaje?.telefono} />
          </Stack>
          <Stack>
            <Label required>Móvil</Label>
            <TextField disabled value={currentViaje?.movil} />
          </Stack>
          <Stack>
            <Label required>DNI</Label>
            <TextField value={currentViaje.dni} name="dni" onChange={this.onTextFieldChange} placeholder="Ingrese su DNI aquí" />
          </Stack>
          <Stack>
            <Label required>Responsable</Label>
            <TextField disabled value={currentViaje?.responsable?.displayName} />
          </Stack>
        </Stack>
        <Separator>Evento</Separator>
        <Stack>
          <Stack>
            <Label required>Denominación</Label>
            <TextField value={currentViaje.denominacion} name="denominacion" onChange={this.onTextFieldChange} placeholder="Ingrese su denominación aquí" />
          </Stack>
          <Stack>
            <Label required>Formación/Reunión</Label>
            <TextField value={currentViaje.formacion} name="formacion" onChange={this.onTextFieldChange} placeholder="Ingrese su Formación/Reunión aquí" />
          </Stack>
          <Stack>
            <Label required>Motivo desplazamiento</Label>
            <TextField value={currentViaje.motivoDesplazamiento} name="motivoDesplazamiento" onChange={this.onTextFieldChange} placeholder="Ingrese su Motivo de Desplazamiento aquí" />
          </Stack>
          <Stack>
            <Label required>Localidad</Label>
            <TextField disabled value={currentViaje?.localidad} />
          </Stack>
          <Stack>
            <Label required>Fecha</Label>
            <DatePicker
              placeholder="Select a date..."
              ariaLabel="Select a date"
              // DatePicker uses English strings by default. For localized apps, you must override this prop.
              strings={defaultDatePickerStrings}
              onSelectDate={(date) => { this.setState({ fecha: date }) }}
              value={this.state.fecha}
              formatDate={formatDate}
            />
          </Stack>
        </Stack>
        <Separator>Solicitud AVE</Separator>
        <Stack>
          <Stack>
            <Label required>Origen</Label>
            <TextField value={currentViaje.origen} name="origen" onChange={this.onTextFieldChange} placeholder="Ingrese su Origen aquí" />
          </Stack>
          <Stack>
            <Label required>Destino</Label>
            <TextField value={currentViaje.destino} name="destino" onChange={this.onTextFieldChange} placeholder="Ingrese su Destino aquí" />
          </Stack>
          <Stack>
            <Label required>Fecha ida</Label>
            <DatePicker
              placeholder="Select a date..."
              ariaLabel="Select a date"
              // DatePicker uses English strings by default. For localized apps, you must override this prop.
              strings={defaultDatePickerStrings}
              onSelectDate={(date) => { this.setState({ fechaIda: date }) }}
              value={this.state.fechaIda}
              formatDate={formatDate}
            />
          </Stack>
          <Stack>
            <Label required>Fecha vuelta</Label>
            <DatePicker
              placeholder="Select a date..."
              ariaLabel="Select a date"
              // DatePicker uses English strings by default. For localized apps, you must override this prop.
              strings={defaultDatePickerStrings}
              onSelectDate={(date) => { this.setState({ fechaVuelta: date }) }}
              value={this.state.fechaVuelta}
              formatDate={formatDate}
            />
          </Stack>
          <Stack>
            <Separator>Solicitud Hotel</Separator>
            <Stack>
              <Label required>Fecha entrada</Label>
              <DatePicker
                placeholder="Select a date..."
                ariaLabel="Select a date"
                // DatePicker uses English strings by default. For localized apps, you must override this prop.
                strings={defaultDatePickerStrings}
                onSelectDate={(date) => { this.setState({ fechaEntrada: date }) }}
                value={this.state.fechaEntrada}
                formatDate={formatDate}
              />
            </Stack>
            <Stack>
              <Label required>Fecha salida</Label>
              <DatePicker
                placeholder="Select a date..."
                ariaLabel="Select a date"
                // DatePicker uses English strings by default. For localized apps, you must override this prop.
                strings={defaultDatePickerStrings}
                onSelectDate={(date) => { this.setState({ fechaSalida: date }) }}
                value={this.state.fechaSalida}
                formatDate={formatDate}
              />
            </Stack>
          </Stack>
        </Stack>
        <Stack>
          <PrimaryButton text="Agregar Viaje" onClick={() => this.addViaje(currentViaje)} />
          {this.state.added && this.SuccessMessage()}
        </Stack>
      </div>
    );
  }
  private async addViaje(newViaje: IViaje) {
    await this._pnpPnPService.addViaje(newViaje);
    this.setState({ added: true });
  }
  SuccessMessage = () => (
    <MessageBar
      messageBarType={MessageBarType.success}
      isMultiline={false}
    >
      El Viaje fue agregador correctamente!!!
    </MessageBar>
  );
}
