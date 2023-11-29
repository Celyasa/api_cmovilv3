import { Cliente } from './../cliente/entities/cliente.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Usrcmovil } from './entities/usrcmovil.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { AuthService } from '../auth/auth.service';
import { postSubirDataDto } from './dto/postSubirData.dto';
import { transformDescargarDatosDto } from './dto/transformDescargarDatos.dto';
import { log } from 'console';

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

      const versionCmovil = await this._usrcmovilService.find({
        select: ['ucmNuevaVersion'],
        where: {
          ucmCodigo: token.ucmCodigo,
        },
      });

      // ucmModulo 1 es Preventa
      // ucmModulo 4 es Autoventa
      // ucmModulo 2 es Entregador

      let consulta = '';
      let obtenerLQ;
      if (token.ucmModulo == 1) {
        consulta =
          ' and C.CCO_NIVEL_APROB=0 and SYSDATE BETWEEN c.CCO_FECHA AND c.CCO_FECHAFIN';
      } else if (token.ucmModulo == 2) {
        consulta = `
          select ${token.ucmModulo} as ucm_modulo,
            '' as rut_id,
            cco.CCO_FECHA  || ' / ' || AST_GEN.NUMERO_COMPROBANTE(cco.CCO_EMPRESA, cco.CCO_CODIGO) FECHA_LIQUIDACION,
            AST_GEN.NUMERO_COMPROBANTE(cco.CCO_EMPRESA, cco.CCO_CODIGO) LIQUIDACION,
            cco.CCO_FECHA  || ' / ' || AST_GEN.NUMERO_COMPROBANTE(cco.CCO_EMPRESA, cco.CCO_CODIGO) LIQUIDACION_DATE,
            cco.CCO_FECHA,
            cco.CCO_FECHAFIN,
            to_char(cco.cco_codigo) as CCO_CODIGO,
            cco.CCO_EMPRESA as cca_empresa,
            cco.cco_ruta as cca_ruta,
            ${token.ucmAgeCodigo} as age_codigo,
            '${token.ucmNombre}' as age_nombre,
            cco.cco_bodega,
            cco.cco_serie,
            ${token.ucmAgeCodigo} as age_codigo_ent,
            '${token.ucmNombre}' as age_nombre_ent,
            cco.CCO_NIVEL_APROB
            from ccomproba cco
            WHERE cco.CCO_TIPODOC = 24
            AND cco.CCO_ESTADO IN (2,3)
            AND   NVL(cco.CCO_TCLIPRO,0) = 0
            and cco.cco_agente = ${token.ucmAgeCodigo}
            and cco.CCO_NIVEL_APROB=0 and cco.CCO_FECHAFIN = TRUNC(SYSDATE)
            and cco.CCO_EMPRESA=2
            `;
        obtenerLQ = await this._usrcmovilService.query(consulta);
      } else if (token.ucmModulo == 4) {
        consulta =
          ' and C.CCO_NIVEL_APROB=1 and TRUNC(SYSDATE) BETWEEN c.CCO_FECHA AND c.CCO_FECHAFIN ';
      }

      let cliente;
      let listaPrecioClientesAux = [];
      if (token.ucmModulo != 2) {
        // Metodo para sacar LQ datos de Preventa y Autoventa
        obtenerLQ = await this._usrcmovilService.query(
          `select ${token.ucmModulo} as ucm_modulo, c.* 
           FROM CM2_LQ_TOTAL_V c where c.age_codigo =${token.ucmAgeCodigo}` +
            consulta,
        );

        // Metodo para sacar clientes
        let rutas = [];

        for (let index = 0; index < obtenerLQ.length; index++) {
          const element = obtenerLQ[index];
          rutas.push(element.CCA_RUTA);
        }
        if (rutas.length > 0 && rutas != null) {
          cliente = await this._usrcmovilService.query(
            ` select 
            CLI_EMPRESA, CLI_CODIGO, CLI_ID, CLI_NOMBRE, CLI_RUC_CEDULA,
            CLI_DIRECCION,CLI_TELEFONO1,CLI_TELEFONO2, CLI_TELEFONO3, CLI_MAIL,CLI_BLOQUEO,
            CLI_CUPO, CLI_ORDEN, CLI_NOMBRECOM, CLI_LATITUD, CLI_LONGITUD, CLI_SEGMENTACION,
            CLI_AGENTE,TCL_NOMBRE,CCL_NOMBRE,CAT_NOMBRE,POL_NOMBRE,CLI_LISTAPRE,CLI_ILIMITADO,
            PARROQUIA,CIUDAD,CLI_RUTA,IMP_PORCENTAJE,CLI_SOLICITA_DATOS
            from cm2_clientes_total t where t.cli_agente=${token.ucmAgeCodigo} 
            and t.cli_ruta in (${rutas})`,
          );
        } else {
          throw new HttpException('No tiene Ruta', HttpStatus.BAD_REQUEST);
        }

        // Sacar lista de precios del cliente
        cliente.map((cli) => {
          const found = listaPrecioClientesAux.find(
            (element) => element == cli.CLI_LISTAPRE,
          );
          if (!found) {
            listaPrecioClientesAux.push(cli.CLI_LISTAPRE);
          }
        });
      } else {
        // Metodo para entregador para sacar clientes
      }

      //Metodo para sacar la lista de precios
      const listaPrecio = await this._usrcmovilService.query(
        `
        select * from cm2_lista_precios_v where dlp_listapre in (${listaPrecioClientesAux})
        `,
      );

      // Metodo para sacar la categoria de productos
      const proCategoria = await this._usrcmovilService.query(
        `
        select * from procategoria where pct_empresa =2
        `,
      );

      // Metodo para sacar los productos PREVENTA
      let producto;
      if (token.ucmModulo == 1) {
        producto = await this._usrcmovilService.query(
          `
          SELECT 
          P.PRO_EMPRESA,
          0 CCO_CODIGO,
          P.PRO_CODIGO,
          P.PRO_ID,
          P.PRO_NOMBRE,
          '' UMD_ID,
          CASE WHEN ( (SELECT COALESCE(MAX(C.COM_COMPONENTE),0) FROM COMPONE C  WHERE C.COM_PRODUCTO = PRO_CODIGO)= 0) THEN
              0
          ELSE
              1
          END  PRO_COMBO,
          0 UMD_CODIGO,
          0 CIV_CATPRODUCTO,
          0 CCO_AGENTE,
          UC.UCM_CODIGO UGP_USUARIO,
          kp_inventario.invc (P.PRO_EMPRESA,P.PRO_CODIGO,null, AL.ALM_BODEGA, null, sysdate) PRO_STOCK,
          GC.GPR_ID,
          P.PRO_PESO,
          P.PRO_IMPUESTO,
          P.PRO_TPRODUCTO,
          ''TPR_ID1,
          ''TPR_ID,
          0 GPR_TIPO_RENTA
          from PRODUCTO P 
          JOIN GPRODUCTO GP ON(GP.GPR_CODIGO = P.PRO_GPRODUCTO AND GP.GPR_EMPRESA = P.PRO_EMPRESA)
          JOIN USRGRUPROD UG ON (UG.UGP_EMPRESA = GP.GPR_EMPRESA AND UG.UGP_GPRODUCTO = GP.GPR_CODIGO)
          JOIN USRCMOVIL UC ON (UG.UGP_USUARIO = UC.UCM_CODIGO AND UG.UGP_EMPRESA = UC.UCM_EMPRESA )
          JOIN GPRCELYASA GC ON (GC.GPR_CODIGO = P.PRO_GPRCELYASA AND GC.GPR_EMPRESA = P.PRO_EMPRESA)
          JOIN DLISTAPRE DP ON (DP.DLP_PRODUCTO = P.PRO_CODIGO AND DP.DLP_EMPRESA = P.PRO_EMPRESA)
          JOIN ALMACEN AL ON (AL.ALM_CODIGO = UC.UCM_ALM_CODIGO AND AL.ALM_EMPRESA = UC.UCM_EMPRESA)  
          WHERE NVL(P.PRO_INACTIVO,0)=0
          AND NVL(GP.GPR_INACTIVO,0) = 0
          AND NVL(P.PRO_TIPO_COMBO,0) != 2
          AND P.PRO_EMPRESA = 2
          AND P.PRO_GPRCELYASA IS NOT NULL
          AND UC.UCM_VERSION>=24
          AND UC.UCM_MODULO IS NOT NULL
          AND UC.UCM_CODIGO= ${token.ucmCodigo}
          AND DP.DLP_LISTAPRE IN (${listaPrecioClientesAux})
          AND(DP.DLP_ALMACEN = UC.UCM_ALM_CODIGO OR DP.DLP_ALMACEN IS NULL)
          AND NVL(DP.DLP_INACTIVO, 0) = 0
          AND DP.DLP_FECHA_INI <= TRUNC(SYSDATE)
          AND (DP.DLP_FECHA_FIN >= TRUNC(SYSDATE) OR DP.DLP_FECHA_FIN IS NULL)
          group by p.pro_codigo, p.pro_id, p.PRO_NOMBRE, p.PRO_EMPRESA, p.PRO_IMPUESTO, p.PRO_GPRCELYASA,
          GC.GPR_ID,UC.UCM_CODIGO,P.PRO_PESO, P.PRO_IMPUESTO, P.PRO_TPRODUCTO,AL.ALM_BODEGA
          `,
        );
      }

      // Metodo para sacar combos de productos PREVENTA
      const productoCombo = await this._usrcmovilService.query(
        `SELECT * FROM CM2_PRODUCTO_COMBO_PRE_V C WHERE C.UGP_USUARIO =${token.ucmCodigo}`,
      );

      // Metodo para sacar lista de descuentos para PREVENTA
      const listaDescuentos = await this._usrcmovilService.query(
        `SELECT * FROM CM2_LISTADESCUENTO where dld_listapre IN (${listaPrecioClientesAux}) `,
      );

      const tipoVisita = await this._usrcmovilService.query(
        `
          select tvi_codigo, tvi_nombre, tvi_accion, tvi_solidat from v_movil_tipovisita
          where tvi_inactivo = 0 and tvi_tipo = 1
        `,
      );

      const listNegraTelefonos = await this._usrcmovilService.query(
        ` select t.lne_codigo,t.lne_detalle,t.lne_tipo from lista_negra t where t.lne_empresa=2`,
      );

      // const carteraTotal = await this._usrcmovilService.query(
      //   `SELECT * FROM CM2_CARTERA_V C WHERE C.AGE_CODIGO =${token.ucmAgeCodigo}`,
      // );

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
        `select * from CM2_DATOS_CLI_NUEVOS`,
      );

      const ciudadParroquia = await this._usrcmovilService.query(
        `
        SELECT DISTINCT
        ubi.UBI_CODIGO,
        ubi.UBI_NOMBRE,
        ubi.UBI_REPORTA
        FROM
            ubicacion ubi
        WHERE
            ubi_empresa = 2
        CONNECT BY PRIOR ubi_codigo = ubi_reporta
        START WITH ubi_reporta IN (
            SELECT ubi_reporta
            FROM almacen alm
            INNER JOIN ubicacion ubi ON alm.alm_ciudad = ubi.ubi_codigo
                                    AND alm.alm_empresa = ubi.ubi_empresa
            WHERE alm.alm_codigo = ${token.ucmAlmCodigo}
        )
        `,
      );

      const comboMix = await this._usrcmovilService.query(
        `
        select pro_codigo,pro_id,pro_nombre, rut_codigo,rut_id, alm_codigo,alm_nombre,gcm_canal, gcm_principal,gcm_combo
        from sellerm2.v_movil_combosmix where alm_codigo = ${token.ucmAlmCodigo}
        
        `,
      );

      const resultado = {
        cmovilVersion: versionCmovil[0].ucmNuevaVersion,
        lq: obtenerLQ,
        cliente: cliente,
        listaPrecio: listaPrecio,
        productoCategoria: proCategoria,
        producto: producto,
        productoCombo: productoCombo,
        listaDescuento: listaDescuentos,
        tipoVisita: tipoVisita,
        listaNegraTelefono: listNegraTelefonos,
        // carteraTotal: carteraTotal,
        presupuesto: presupuesto,
        pedidoSugerido: pedidoSugerido,
        autualizacionDatosCliente: autualizacionDatosCliente,
        datosCreaCliente: datosCreaCliente,
        ciudadParroquia: ciudadParroquia,
        comboMix: comboMix,
      };

      // const resultado = {
      //   cmovilVersion: versionCmovil[0].ucmNuevaVersion,
      //   lq: [],
      //   cliente: [],
      //   listaPrecio: [],
      //   productoCategoria: [],
      //   producto: [],
      //   productoCombo: [],
      //   listaDescuento: [],
      //   tipoVisita: [],
      //   listaNegraTelefono: [],
      //   // carteraTotal: carteraTotal,
      //   presupuesto: [],
      //   pedidoSugerido: [],
      //   autualizacionDatosCliente: [],
      //   datosCreaCliente: [],
      //   infoCreaCliente: [],
      //   comboMix: [],
      // };

      return plainToInstance(transformDescargarDatosDto, resultado);
      // return resultado;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
  async subirData(postSubirDataDto: postSubirDataDto) {
    try {
      // console.log(postSubirDataDto.cmovilVersion);
      return postSubirDataDto;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
