import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Usrcmovil } from './entities/usrcmovil.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UsrcmovilService {
  constructor(
    @InjectRepository(Usrcmovil)
    private readonly _usrcmovilService: Repository<Usrcmovil>,
    private readonly _authService: AuthService,
  ) {}

  async descargarData(headers) {
    try {
      const token = await this._authService.decodeToken(headers);

      //   ucmCodigo = 2690017073;

      //   s

      const versionCmovil = await this._usrcmovilService.query(
        `select ucm_nuevaversion from USRCMOVIL where ucm_codigo =${token.ucmCodigo}`,
      );
      const obtenerLQ = await this._usrcmovilService.query(
        `select * from cm2_lq_v l where l.USR_CODIGO =${token.ucmCodigo}`,
      );

      const productoCombo = await this._usrcmovilService.query(
        `SELECT * FROM CM2_PRODUCTO_COMBO_PRE_V C WHERE C.UGP_USUARIO =${token.ucmCodigo}`,
      );

      const listaDescuentos = await this._usrcmovilService.query(
        `SELECT * FROM CM2_LISTADESCUENTO`,
      );

      const tipoVisita = await this._usrcmovilService.query(
        `select tvi_codigo, tvi_nombre, tvi_accion, tvi_solidat from v_movil_tipovisita where tvi_inactivo = 0 and tvi_tipo = 1`,
      );

      const listNegraTelefonos = await this._usrcmovilService.query(
        `select t.lne_codigo,t.lne_detalle,t.lne_tipo from lista_negra t where t.lne_empresa=2`,
      );

      const carteraTotal = await this._usrcmovilService.query(
        `SELECT * FROM CM2_CARTERA_V C WHERE C.AGE_CODIGO =${token.ucmAgeCodigo}`,
      );
      const presupuesto = await this._usrcmovilService.query(
        `select pre_ruta, pre_gprcelyasa_id, pre_unidad, pre_presupuesto from v_movil_presupuesto`,
      );

      const pedidoSugerido = await this._usrcmovilService.query(
        `select CLI_CODIGO,CLI_ID,CLI_NOMBRE,CLI_AGENTE,PRO_CODIGO,PRO_ID,PRO_NOMBRE,CANTIDAD,CLI_RUTA,GPR_ID
        from v_movil_ped_sugerido where  cli_agente = ${token.ucmAgeCodigo}`,
      );

      const autualizacionDatosCliente = await this._usrcmovilService.query(
        `select cli_codigo from solicita_Actualizacion`,
      );

      const datosCreaCliente = await this._usrcmovilService.query(
        `select tpc_codigo, tpc_act_tipocampo, tpc_opcion from tipo_campo_actdat where tpc_empresa=2`,
      );

      const infoCreaCliente = await this._usrcmovilService.query(
        `select tpc_codigo, tpc_act_tipocampo, tpc_opcion from tipo_campo_actdat where tpc_empresa=2`,
      );

      const comboMix = await this._usrcmovilService.query(
        `
        select pro_codigo,pro_id,pro_nombre,rut_codigo,rut_id, alm_codigo,alm_nombre,gcm_canal, gcm_principal,gcm_combo
        from sellerm2.v_movil_combosmix where alm_codigo = 265
        `,
      );

      return {
        cmovilVersion: versionCmovil,
        lq: obtenerLQ,
        productoCombo: productoCombo,
        listaDescuento: listaDescuentos,
        tipoVisita: tipoVisita,
        listaNegraTelefono: listNegraTelefonos,
        carteraTotal: carteraTotal,
        presupuesto: presupuesto,
        pedidoSugerido: pedidoSugerido,
        autualizacionDatosCliente: autualizacionDatosCliente,
        datosCreaCliente: datosCreaCliente,
        infoCreaCliente: infoCreaCliente,
        comboMix: comboMix,
      };

      // if (obtenerProductos.length > 0) {
      //     return plainToInstance(getProductoAutoventaDto, obtenerProductos);
      // } else {
      //     throw new HttpException('No existe productos', HttpStatus.BAD_REQUEST);
      // }
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
