import * as React from 'react';
import styles from './FlujoViajes.module.scss';
import { IFlujoViajesProps } from './IFlujoViajesProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { SPFI } from '@pnp/sp';
import { GraphFI } from '@pnp/graph';
import { getGraph, getSP } from '../services/pnpjsConfig';
import SolicitudViaje from './SolicitudViaje/SolicitudViaje';


export default class FlujoViajes extends React.Component<IFlujoViajesProps, {}> {

  private LOG_SOURCE = "🅿PnPjsExample";
  private LIBRARY_NAME = "Documents";
  private _sp: SPFI;
  private _graph: GraphFI;

  constructor(props: IFlujoViajesProps) {
    super(props);
    // set initial state
    this.state = {
      items: [],
      errors: []
    };
    this._sp = getSP();
    this._graph = getGraph();
  }

  public render(): React.ReactElement<IFlujoViajesProps> {
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName
    } = this.props;


    return (
      <div>
        <SolicitudViaje nombreUsuario={''} idUsuario={''} mail={''} departamento={''} codigoOficina={''} telefono={''} movil={''} dni={''} responable={''}></SolicitudViaje>
      </div>
    );
  }
}
