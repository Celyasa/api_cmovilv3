import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Usrcmovil } from './entities/usrcmovil.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { AuthService } from '../auth/auth.service';
import { transformDescargarDatosDto } from './dto/transformDescargarDatos.dto';
import { transformAgenteDto } from './dto/transformAgente.dto';
import { postParamDataMapDto } from './dto/postParamDataMap.dto';
import { transformDataMapPendienteDto } from './dto/transformDataMapPendiente.dto';
import { transformDataMapVisitadoDto } from './dto/transformDataMapVisitado.dto';
import { postSubirDataPedidoDto } from './dto/postSubirDataPedido.dto';
import { postSubirDataNovedadDto } from './dto/postSubirDataNovedad.dto';

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
          ' and C.CCO_NIVEL_APROB=0 --and SYSDATE BETWEEN c.CCO_FECHA AND c.CCO_FECHAFIN';
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
            and cco.CCO_NIVEL_APROB=4 and cco.CCO_FECHAFIN = TRUNC(SYSDATE)
            and cco.CCO_EMPRESA=2

        `;
        // consulta = `
        //   select ${token.ucmModulo} as ucm_modulo,
        //     '' as rut_id,
        //     cco.CCO_FECHA  || ' / ' || AST_GEN.NUMERO_COMPROBANTE(cco.CCO_EMPRESA, cco.CCO_CODIGO) FECHA_LIQUIDACION,
        //     AST_GEN.NUMERO_COMPROBANTE(cco.CCO_EMPRESA, cco.CCO_CODIGO) LIQUIDACION,
        //     cco.CCO_FECHA  || ' / ' || AST_GEN.NUMERO_COMPROBANTE(cco.CCO_EMPRESA, cco.CCO_CODIGO) LIQUIDACION_DATE,
        //     cco.CCO_FECHA,
        //     cco.CCO_FECHAFIN,
        //     to_char(cco.cco_codigo) as CCO_CODIGO,
        //     cco.CCO_EMPRESA as cca_empresa,
        //     cco.cco_ruta as cca_ruta,
        //     ${token.ucmAgeCodigo} as age_codigo,
        //     '${token.ucmNombre}' as age_nombre,
        //     cco.cco_bodega,
        //     cco.cco_serie,
        //     ${token.ucmAgeCodigo} as age_codigo_ent,
        //     '${token.ucmNombre}' as age_nombre_ent,
        //     cco.CCO_NIVEL_APROB
        //     from ccomproba cco
        //     WHERE cco.CCO_TIPODOC = 24
        //     AND cco.CCO_ESTADO IN (2,3)
        //     AND   NVL(cco.CCO_TCLIPRO,0) = 0
        //     and cco.cco_agente = ${token.ucmAgeCodigo}
        //     and cco.CCO_NIVEL_APROB=0 and cco.CCO_FECHAFIN = TRUNC(SYSDATE)
        //     and cco.CCO_EMPRESA=2
        //     `;
        obtenerLQ = await this._usrcmovilService.query(consulta);
      } else if (token.ucmModulo == 4) {
        consulta =
          ' and C.CCO_NIVEL_APROB=1 and TRUNC(SYSDATE) BETWEEN c.CCO_FECHA AND c.CCO_FECHAFIN ';
      }

      let cliente;
      let listaPrecioClientesAux = [];
      const listaPrecioFiltro = new Set<string>();
      let liquidaciones = [];
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
            ` 
            select 
            CLI_EMPRESA, CLI_CODIGO, CLI_ID, CLI_NOMBRE, CLI_RUC_CEDULA,CLI_DIRECCION,
            cli_ref_direccion, CLI_TELEFONO1,CLI_TELEFONO2, CLI_TELEFONO3, CLI_MAIL,CLI_BLOQUEO,
            CLI_CUPO, CLI_ORDEN, CLI_NOMBRECOM, CLI_LATITUD, CLI_LONGITUD, CLI_VENDE_LICOR, CLI_SEGMENTACION,
            CLI_AGENTE,cli_sexo, cli_estado_civil, TCL_NOMBRE,CCL_NOMBRE,CAT_NOMBRE,POL_NOMBRE,CLI_LISTAPRE,CLI_ILIMITADO,
            CLI_PARROQUIA, PARROQUIA,CLI_CIUDAD,CIUDAD,CLI_RUTA,CLI_ORIGEN_INGRESOS,
            --IMP_PORCENTAJE,
            CLI_SOLICITA_DATOS, CLI_POLITICAS, CLI_POLITICAS_PMI, CLI_LISTAPRE_PMI, CLI_CUPO_PMI, CLI_ILIMITADO_PMI,
            CLI_TIPOCLI, '' as CCO_CODIGO,1 as CLI_ENVIO
            from cm2_clientes_total t where t.cli_agente=${token.ucmAgeCodigo} 
            and t.cli_ruta in (${rutas})`,
          );
        } else {
          throw new HttpException(
            'No tiene ruta asignada, comuníquese con liquidación.',
            HttpStatus.BAD_REQUEST,
          );
        }

        // Sacar lista de precios del cliente
        cliente.forEach((cli) => {
          listaPrecioFiltro.add(cli.CLI_LISTAPRE);
          listaPrecioFiltro.add(cli.CLI_LISTAPRE_PMI);
        });
      } else {
        // Metodo para entregador para sacar clientes
        for (let index = 0; index < obtenerLQ.length; index++) {
          const element = obtenerLQ[index];
          liquidaciones.push(element.CCO_CODIGO);
        }
        if (liquidaciones.length > 0 && liquidaciones != null) {
          cliente = await this._usrcmovilService.query(
            ` 
            select distinct cli.CLI_EMPRESA, cli.CLI_CODIGO, cli.CLI_ID, cli.CLI_NOMBRE, cli.CLI_RUC_CEDULA, cli.CLI_DIRECCION, cli.cli_ref_direccion, cli.CLI_TELEFONO1,
            cli.CLI_TELEFONO2, cli.CLI_TELEFONO3, cli.CLI_MAIL, cli.CLI_BLOQUEO, cli.CLI_CUPO, cli.CLI_ORDEN, cli.CLI_NOMBRECOM, 
            cli.CLI_LATITUD, cli.CLI_LONGITUD,CLI.CLI_VENDE_LICOR, cli.CLI_SEGMENTACION, cli.CLI_AGENTE,cli.cli_sexo ,cli.cli_estado_civil,
            tcl.TCL_NOMBRE, 
            ccl.CCL_NOMBRE, 
            cat.CAT_NOMBRE, 
            pol.POL_NOMBRE, 
            cli.CLI_LISTAPRE, cli.CLI_ILIMITADO, 
            cli.CLI_PARROQUIA, ub.ubi_nombre as PARROQUIA, 
            cli.CLI_CIUDAD,
            ubi.ubi_nombre as CIUDAD,
            cli.CLI_ORIGEN_INGRESOS,
            cli.CLI_RUTA, cli.CLI_SOLICITA_DATOS, 
            cli.CLI_POLITICAS, cli.CLI_POLITICAS_PMI, cli.CLI_LISTAPRE_PMI, cli.CLI_CUPO_PMI, cli.CLI_ILIMITADO_PMI, cli.CLI_TIPOCLI
            , TO_CHAR(cco.cco_cie_comproba) cco_codigo, 1 as CLI_ENVIO 
            from ccomproba cco 
            inner join cliente cli on (cli.cli_codigo = cco.cco_codclipro and cli.cli_empresa = cco.cco_empresa)   
            inner join ubicacion ubi on (cli.cli_ciudad = ubi.ubi_codigo and ubi.ubi_empresa = cli.cli_empresa)
            inner join catcliente cat on (cli.cli_categoria = cat.cat_codigo and cat.cat_empresa = cli.cli_empresa)
            inner join tipcliente tcl on (cli.cli_tipocli = tcl.tcl_codigo and tcl.tcl_empresa = cli.cli_empresa)
            inner join ddocumento ddo on (cli.cli_codigo = ddo.ddo_codclipro and cli.cli_empresa = ddo.ddo_empresa and ddo.ddo_cancelado = 0)
            left join ubicacion ub on (cli.cli_parroquia = ub.ubi_codigo and ub.ubi_empresa = cli.cli_empresa)
            left join politica pol on (cli.cli_politicas = pol.pol_codigo and pol.pol_empresa = cli.cli_empresa)
            left join cancliente ccl on (cli.cli_canal = ccl.ccl_codigo and ccl.ccl_empresa = cli.cli_empresa)
            where cco.cco_empresa = 2 and cco.cco_cie_comproba in (${liquidaciones}) and cco.cco_tipodoc = 27 
            union 
            select distinct cli.CLI_EMPRESA, cli.CLI_CODIGO, cli.CLI_ID, cli.CLI_NOMBRE, cli.CLI_RUC_CEDULA, cli.CLI_DIRECCION, cli.cli_ref_direccion,cli.CLI_TELEFONO1,
            cli.CLI_TELEFONO2, cli.CLI_TELEFONO3, cli.CLI_MAIL, cli.CLI_BLOQUEO, cli.CLI_CUPO, cli.CLI_ORDEN, cli.CLI_NOMBRECOM, 
            cli.CLI_LATITUD, cli.CLI_LONGITUD,CLI.CLI_VENDE_LICOR, cli.CLI_SEGMENTACION, cli.CLI_AGENTE, cli.cli_sexo, cli.cli_estado_civil,
            tcl.TCL_NOMBRE, 
            ccl.CCL_NOMBRE, 
            cat.CAT_NOMBRE, 
            pol.POL_NOMBRE, 
            cli.CLI_LISTAPRE, cli.CLI_ILIMITADO, 
            cli.CLI_PARROQUIA,ub.ubi_nombre as PARROQUIA,
            cli.CLI_CIUDAD,
            ubi.ubi_nombre as CIUDAD,
            cli.CLI_ORIGEN_INGRESOS,
            cli.CLI_RUTA, cli.CLI_SOLICITA_DATOS, 
            cli.CLI_POLITICAS, cli.CLI_POLITICAS_PMI, cli.CLI_LISTAPRE_PMI, cli.CLI_CUPO_PMI, cli.CLI_ILIMITADO_PMI, cli.CLI_TIPOCLI
            , TO_CHAR(cco.cdi_lq_codigo) cco_codigo,  1 as CLI_ENVIO  from cartera_distribucion_renew cco 
            inner join cliente cli on (cli.cli_codigo = cco.cdi_cli_codigo and cli.cli_empresa = cco.cdi_empresa)   
            inner join ubicacion ubi on (cli.cli_ciudad = ubi.ubi_codigo and ubi.ubi_empresa = cli.cli_empresa)
            inner join catcliente cat on (cli.cli_categoria = cat.cat_codigo and cat.cat_empresa = cli.cli_empresa)
            inner join tipcliente tcl on (cli.cli_tipocli = tcl.tcl_codigo and tcl.tcl_empresa = cli.cli_empresa)
            inner join ddocumento ddo on (cli.cli_codigo = ddo.ddo_codclipro and cli.cli_empresa = ddo.ddo_empresa and ddo.ddo_cancelado = 0)
            left join ubicacion ub on (cli.cli_parroquia = ub.ubi_codigo and ub.ubi_empresa = cli.cli_empresa)
            left join politica pol on (cli.cli_politicas = pol.pol_codigo and pol.pol_empresa = cli.cli_empresa)
            left join cancliente ccl on (cli.cli_canal = ccl.ccl_codigo and ccl.ccl_empresa = cli.cli_empresa)
            where cco.cdi_empresa = 2 and cco.cdi_lq_codigo in (${liquidaciones})
            
            `,
          );
        } else {
          throw new HttpException(
            'Comuníquese con liquidación.',
            HttpStatus.BAD_REQUEST,
          );
        }

        // cliente = await this._usrcmovilService.query(
        //   `
        //   select
        //   CLI_EMPRESA, CLI_CODIGO, CLI_ID, CLI_NOMBRE, CLI_RUC_CEDULA,
        //   CLI_DIRECCION,CLI_TELEFONO1,CLI_TELEFONO2, CLI_TELEFONO3, CLI_MAIL,CLI_BLOQUEO,
        //   CLI_CUPO, CLI_ORDEN, CLI_NOMBRECOM, CLI_LATITUD, CLI_LONGITUD, CLI_SEGMENTACION,
        //   CLI_AGENTE,TCL_NOMBRE,CCL_NOMBRE,CAT_NOMBRE,POL_NOMBRE,CLI_LISTAPRE,CLI_ILIMITADO,
        //   PARROQUIA,CIUDAD,CLI_RUTA,
        //   --IMP_PORCENTAJE,
        //   CLI_SOLICITA_DATOS, CLI_POLITICAS, CLI_POLITICAS_PMI, CLI_LISTAPRE_PMI, CLI_CUPO_PMI, CLI_ILIMITADO_PMI,
        //   CLI_TIPOCLI
        //   from cm2_clientes_total t where t.cli_agente=${token.ucmAgeCodigo}
        //   and t.cli_ruta in (${rutas})`,
        // );
      }

      listaPrecioClientesAux = Array.from(listaPrecioFiltro);
      listaPrecioClientesAux = listaPrecioClientesAux.filter(
        (value) => value !== null,
      );

      let listaPrecio = [];
      if (token.ucmModulo != 2) {
        //Metodo para sacar la lista de precios
        // const listaPrecio = await this._usrcmovilService.query(
        listaPrecio = await this._usrcmovilService.query(
          `
        select * from cm2_lista_precios_v where dlp_listapre in (${listaPrecioClientesAux})
        `,
        );
      }

      // Metodo para sacar la categoria de productos
      const proCategoria = await this._usrcmovilService.query(
        `
        --select * from procategoria where pct_empresa =2
        SELECT PCT_EMPRESA,PCT_CODIGO,PCT_ID,PCT_NOMBRE
        from procategoria  P 
        where pct_empresa =2
        UNION 
        SELECT 2, 9999, 'CBP', 'COMBOPACK' FROM DUAL
        `,
      );

      // Metodo para sacar los productos PREVENTA
      let producto = [];
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
          0 GPR_TIPO_RENTA,
          P.PRO_CLASIFICACION,
          GC.GPR_GRUPO
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
          GC.GPR_ID,UC.UCM_CODIGO,P.PRO_PESO, P.PRO_IMPUESTO, P.PRO_TPRODUCTO,AL.ALM_BODEGA,P.PRO_CLASIFICACION,GC.GPR_GRUPO
          `,
        );
      }

      // Metodo para sacar todas las politicas de la base
      const politica = await this._usrcmovilService.query(
        `SELECT  ID, POL_EMPRESA, POL_CODIGO, POL_NOMBRE, POL_DESC_MAXIMO,
        POL_PREVENTA,POL_POLITICA,POL_NIVEL,POL_PORC_FINANC,POL_PORC_PRO_PAGO,POL_GRUPO 
        FROM CM2_POLITICA_V `,
      );

      // Metodo para sacar combos de productos PREVENTA
      const productoCombo = await this._usrcmovilService.query(
        `SELECT * FROM CM2_PRODUCTO_COMBO_PRE_V C WHERE C.UGP_USUARIO =${token.ucmCodigo}`,
      );

      let listaDescuentos = [];

      if (token.ucmModulo != 2) {
        // Metodo para sacar lista de descuentos para PREVENTA
        // const listaDescuentos = await this._usrcmovilService.query(
        listaDescuentos = await this._usrcmovilService.query(
          `SELECT * FROM CM2_LISTADESCUENTO where dld_listapre IN (${listaPrecioClientesAux}) `,
        );
      }

      const tipoVisita = await this._usrcmovilService.query(
        `
          select tvi_codigo, tvi_nombre, tvi_accion, nvl(tvi_solidat,0) as tvi_solidat, tvi_subtipo 
          from v_movil_tipovisita
          where tvi_inactivo = 0 and tvi_tipo = ${token.ucmModulo == 2 ? 2 : 1}
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

      // const pedidoSugerido = await this._usrcmovilService.query(
      //   `select CLI_CODIGO,CLI_ID,CLI_NOMBRE,CLI_AGENTE,PRO_CODIGO,PRO_ID,PRO_NOMBRE,CANTIDAD,CLI_RUTA,GPR_ID
      //   from v_movil_ped_sugerido where  cli_agente = ${token.ucmAgeCodigo}`,
      // );

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

      // const comboMix = await this._usrcmovilService.query(
      //   `
      //   select pro_codigo,pro_id,pro_nombre, rut_codigo,rut_id, alm_codigo,alm_nombre,gcm_canal, gcm_principal,gcm_combo
      //   from sellerm2.v_movil_combosmix where alm_codigo = ${token.ucmAlmCodigo}

      //   `,
      // );

      const comboPackCabecera = await this._usrcmovilService.query(
        `
        select
        COP_EMPRESA,COP_CODIGO,COP_ID,COP_NOMBRE,COP_CANTIDADN,
        COP_CANTIDADP,COP_DESCUENTO,COP_PORCENTAJE,COP_INACTIVO,
        COP_CANTIDADD,COP_COMBOVIRTUAL,CTR_ALMACEN,CTR_RUTA,CTR_CANAL, cop_proclasificacion, ctr_cantidad,ctr_tipo_cp,
        cop_porcentaje_n
        from CM2_COMBOPACKC_V WHERE CTR_ALMACEN=${token.ucmAlmCodigo}
        `,
      );
      const comboPackDetalle = await this._usrcmovilService.query(
        `
        select
        COD_EMPRESA, COD_CODIGO, COD_TIPO, COD_COMPONE, COD_INACTIVO, CTR_ALMACEN,COD_GRUPO
        from CM2_COMBOPACKD_V WHERE CTR_ALMACEN=${token.ucmAlmCodigo}
        `,
      );

      const descuentoEscaladoC = await this._usrcmovilService.query(
        `
        select t.LDR_EMPRESA,t.LDR_CODIGO, t.LDR_RANGO,t.LDR_TPRODUCTO,t.LDR_PRODUCTO,t.LDR_TIPO_CLIENTE,t.LDR_ALMACEN,t.LDR_LISTAPRE
        from CM2_COMBO_ESCALABLE_V t
        where (t.LDR_ALMACEN = ${token.ucmAlmCodigo} or t.LDR_ALMACEN is null)
        `,
      );

      // Construir la lista de rangos de las cabeceras
      const rangos = descuentoEscaladoC.map((header) => header.LDR_RANGO);

      const descuentoEscaladoD = await this._usrcmovilService.query(
        `
        select CDS_EMPRESA,CDS_RANGO,CDS_DESCRIPCION,CDS_CANTIDAD_MIN,
        CDS_CANTIDAD_MAX,CDS_PORCENTAJE,CDS_NIVEL
        from CM2_DET_COMBO_ESCALABLE_V
        where CDS_RANGO in (${rangos})
        `,
      );

      let facturaC = [];
      let secuencia = [];
      let tipoPago = [];
      let emisor = [];
      if (token.ucmModulo == 2) {
        facturaC = await this._usrcmovilService.query(
          // `
          // select AST_GEN.NUMERO_COMPROBANTE(cco.CCO_EMPRESA, cco.CCO_CODIGO) factura, cco.cco_fecha, tot.tot_total, ddo.ddo_pago,
          // ddo.ddo_monto, ddo.ddo_fecha_ven, coalesce(sum(dca.dca_monto),0.00) abono, (ddo.ddo_monto - coalesce(sum(dca.dca_monto),0.00)) saldo,
          // (trunc(SYSDATE) - ddo.ddo_fecha_ven) dias,
          // cco.cco_codclipro
          // from ccomproba cco
          // inner join total tot on (cco.cco_codigo = tot.tot_cco_comproba and cco.cco_empresa = tot.tot_empresa)
          // inner join ddocumento ddo on (cco.cco_codigo = ddo.ddo_cco_comproba and cco.cco_empresa = ddo.ddo_empresa)
          // left join dcancelacion dca on (ddo.ddo_cco_comproba = dca.dca_ddo_comproba and ddo.ddo_pago = dca.dca_ddo_pago
          //                             and ddo.ddo_empresa = dca.dca_empresa)
          // where cco.cco_cie_comproba in (${liquidaciones}) and cco.cco_tipodoc = 27
          //       and cco.cco_empresa = 2
          // group by cco.CCO_EMPRESA, cco.CCO_CODIGO, cco.cco_fecha, ddo.ddo_pago, ddo.ddo_monto, ddo.ddo_fecha_ven, tot.tot_total,
          // cco.cco_codclipro order by ddo.ddo_fecha_ven
          // `,
          `
          select AST_GEN.NUMERO_COMPROBANTE(cco.CCO_EMPRESA, cco.CCO_CODIGO) factura, cco.cco_fecha, ROUND(tot.tot_total,2) as tot_total, ddo.ddo_pago, 
          ddo.ddo_monto, ddo.ddo_fecha_ven, ROUND(coalesce(sum(dca.dca_monto),0.00),2) abono, ROUND((ddo.ddo_monto - coalesce(sum(dca.dca_monto),0.00)),2) saldo,
          (trunc(SYSDATE) - ddo.ddo_fecha_ven) dias,
          cco.cco_codclipro, case when pol.pol_dias_plazo = 0 then 'Contado' else 'Credito' end as tipo, to_char(cco.CCO_CODIGO) CCO_CODIGO, ddo.ddo_doctran
          from ccomproba cco 
          inner join total tot on (cco.cco_codigo = tot.tot_cco_comproba and cco.cco_empresa = tot.tot_empresa) 
          inner join ccomfac cfa on (cco.cco_codigo = cfa.cfac_cco_comproba and cco.cco_empresa = cfa.cfac_empresa)
          inner join politica pol on (cfa.cfac_politica = pol.pol_codigo and cfa.cfac_empresa = pol.pol_empresa)
          inner join ddocumento ddo on (cco.cco_codigo = ddo.ddo_cco_comproba and cco.cco_empresa = ddo.ddo_empresa) 
          left join dcancelacion dca on (ddo.ddo_cco_comproba = dca.dca_ddo_comproba and ddo.ddo_pago = dca.dca_ddo_pago 
          and ddo.ddo_empresa = dca.dca_empresa) 
          where cco.cco_cie_comproba  in (${liquidaciones}) and cco.cco_tipodoc = 27 
          and cco.cco_empresa = 2 
          group by cco.CCO_EMPRESA, cco.CCO_CODIGO, cco.cco_fecha, ddo.ddo_pago, ddo.ddo_monto, ddo.ddo_fecha_ven, tot.tot_total, 
          cco.cco_codclipro, pol.pol_dias_plazo,cco.CCO_CODIGO, ddo.ddo_doctran 
          UNION
          SELECT DISTINCT AST_GEN.NUMERO_COMPROBANTE(cco.CCO_EMPRESA, cco.CCO_CODIGO) AS factura, cco.cco_fecha, ROUND(tot.tot_total,2) as tot_total, ddo.ddo_pago, ddo.ddo_monto, ddo.ddo_fecha_ven,  
          ROUND(SUM(COALESCE(dca.dca_monto, 0.00)),2) AS abono, ROUND((ddo.ddo_monto - SUM(COALESCE(dca.dca_monto, 0.00))),2) AS saldo, (TRUNC(SYSDATE) - ddo.ddo_fecha_ven) AS dias, cco.cco_codclipro,
          'Cartera' as tipo, to_char(cco.CCO_CODIGO) CCO_CODIGO, ddo.ddo_doctran 
          FROM (select DISTINCT c.cco_codclipro, c.cco_empresa from ccomproba c where c.cco_cie_comproba in (${liquidaciones}) AND c.cco_empresa = 2 AND 
          c.cco_tipodoc = 27) cc INNER JOIN ddocumento ddo ON (cc.cco_codclipro = ddo.ddo_codclipro AND cc.cco_empresa = ddo.ddo_empresa) INNER JOIN ccomproba cco ON (
          cco.cco_codigo = ddo.ddo_cco_comproba AND cco.cco_empresa = ddo.ddo_empresa) INNER JOIN total tot ON (cco.cco_codigo = tot.tot_cco_comproba AND cco.cco_empresa = 
          tot.tot_empresa) LEFT JOIN dcancelacion dca ON (ddo.ddo_cco_comproba = dca.dca_ddo_comproba AND ddo.ddo_pago = dca.dca_ddo_pago AND ddo.ddo_empresa = 
          dca.dca_empresa) WHERE ddo.ddo_cancelado = 0 AND cco.cco_cie_comproba not in (${liquidaciones}) AND cco.cco_tipodoc = 27 
          GROUP BY cco.CCO_EMPRESA, cco.CCO_CODIGO, cco.cco_fecha, ddo.ddo_pago, ddo.ddo_monto, ddo.ddo_fecha_ven, tot.tot_total, cco.cco_codclipro,
          cco.CCO_CODIGO, ddo.ddo_doctran 
          union
          SELECT DISTINCT AST_GEN.NUMERO_COMPROBANTE(cco.CCO_EMPRESA, cco.CCO_CODIGO) AS factura, cco.cco_fecha, ROUND(tot.tot_total,2) as tot_total, ddo.ddo_pago, ddo.ddo_monto, ddo.ddo_fecha_ven, 
          ROUND(SUM(COALESCE(dca.dca_monto, 0.00)),2) AS abono, ROUND((ddo.ddo_monto - SUM(COALESCE(dca.dca_monto, 0.00))),2) AS saldo, (TRUNC(SYSDATE) - ddo.ddo_fecha_ven) AS dias, cco.cco_codclipro,
          'Cartera' as tipo, to_char(cco.CCO_CODIGO) CCO_CODIGO, ddo.ddo_doctran 
          from cartera_distribucion_renew cc INNER JOIN ddocumento ddo ON (cc.cdi_cli_codigo = ddo.ddo_codclipro AND cc.cdi_empresa = ddo.ddo_empresa and 
          ddo.ddo_cancelado = 0) INNER JOIN ccomproba cco ON (cco.cco_codigo = ddo.ddo_cco_comproba AND cco.cco_empresa = ddo.ddo_empresa) INNER JOIN total tot ON (
          cco.cco_codigo = tot.tot_cco_comproba AND cco.cco_empresa = tot.tot_empresa) LEFT JOIN dcancelacion dca ON (ddo.ddo_cco_comproba = dca.dca_ddo_comproba AND 
          ddo.ddo_pago = dca.dca_ddo_pago AND ddo.ddo_empresa = dca.dca_empresa) where cc.cdi_empresa = 2 and cc.cdi_lq_codigo in (${liquidaciones}) AND 
          cco.cco_cie_comproba not in (${liquidaciones}) AND cco.cco_tipodoc = 27 
          GROUP BY cco.CCO_EMPRESA, cco.CCO_CODIGO, cco.cco_fecha, ddo.ddo_pago, ddo.ddo_monto, 
          ddo.ddo_fecha_ven, tot.tot_total, cco.cco_codclipro,cco.CCO_CODIGO, ddo.ddo_doctran
          ORDER BY ddo_fecha_ven ASC
          `,
        );

        secuencia = await this._usrcmovilService.query(
          `
          select dti.dti_cti_codigo,dti.dti_numero, dti.dti_serie
          from dtipocom dti inner join usrcmovil usr on (usr.ucm_alm_codigo = dti.dti_almacen and usr.ucm_empresa =  dti.dti_empresa)
          inner join agente age on (usr.ucm_age_codigo = age.age_codigo and usr.ucm_empresa = age.age_empresa and dti.dti_serie = age.age_pventa_rcc )
          where dti.dti_cti_codigo = 10001233 and usr.ucm_id = '${token.ucmId}' and usr.ucm_empresa = 2 
          `,
        );

        tipoPago = await this._usrcmovilService.query(
          `
          select tpa.tpa_codigo, tpa.tpa_id, tpa.tpa_nombre, tpa.tpa_detalle, tpa.tpa_contabiliza from tipopago tpa where tpa.tpa_empresa = 2 and tpa.tpa_tclipro = 1 
          and nvl(tpa.tpa_inactivo,0) = 0 and tpa.tpa_cmovil = 1 order by tpa.tpa_nombre
          `,
        );

        emisor = await this._usrcmovilService.query(
          `
          select emi.emi_codigo, emi.emi_nombre from emisor emi
          where emi.emi_empresa =  2 and nvl(emi.emi_inactivo,0) = 0
          order by emi.emi_nombre
          `,
        );
      }

      const resultado = {
        cmovilVersion: versionCmovil[0].ucmNuevaVersion,
        lq: obtenerLQ,
        cliente: cliente,
        politica: politica,
        listaPrecio: listaPrecio,
        productoCategoria: proCategoria,
        producto: producto,
        productoCombo: productoCombo,
        listaDescuento: listaDescuentos,
        tipoVisita: tipoVisita,
        listaNegraTelefono: listNegraTelefonos,
        // carteraTotal: carteraTotal,
        presupuesto: presupuesto,
        // pedidoSugerido: pedidoSugerido,
        autualizacionDatosCliente: autualizacionDatosCliente,
        datosCreaCliente: datosCreaCliente,
        ciudadParroquia: ciudadParroquia,
        // comboMix: comboMix,
        comboPackC: comboPackCabecera,
        comboPackD: comboPackDetalle,
        descuentoEscaladoC: descuentoEscaladoC,
        descuentoEscaladoD: descuentoEscaladoD,
        facturaC: facturaC,
        secuencia: secuencia,
        tipoPago: tipoPago,
        emisor: emisor,
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
  async subirData(postSubirDataDto: [postSubirDataPedidoDto]) {
    try {
      const resultados = [];
      for (const pedido of postSubirDataDto) {
        try {
          // Construir la tabla de detalles
          const detalles = pedido.pedidoD
            .map(
              (detalle) =>
                `pedido_detalle_obj(
                  ${detalle.pedDetId},
                  ${detalle.pedProCodigo},
                  ${detalle.pedProCantidad},
                  ${detalle.pedProPrecio},
                  ${detalle.pedProDescuento},
                  ${detalle.ccoBodega},
                  ${detalle.pedTotal},
                  ${detalle.pedProDscItem},
                  ${detalle.pedProCombo},
                  ${detalle.pedGrabaIva},
                  ${detalle.pedDlpUmedida},
                  ${detalle.pedCantDigitada},
                  ${detalle.pedPDigitado ?? 0},
                  ${detalle.pedDlpListaPre},
                  ${detalle.pedCodPack},
                  ${detalle.pedTipoPack},
                  ${detalle.pedTipoProPack},
                  '${detalle.pedGarantia}',
                  ${detalle.ldrCodigo}
                )`,
            )
            .join(',');

          // Ejecutar la función Oracle
          const result = await this._usrcmovilService.query(
            `
            SELECT AST_CMOVIL.RECIBE_PEDIDOS_F (
              ${pedido.ccaEmpresa},
              TO_DATE(TO_CHAR(TO_TIMESTAMP('${
                pedido.pedFechaFin
              }', 'YYYY-MM-DD"T"HH24:MI:SS.FF'),'DD/MM/YYYY'),'DD/MM/YYYY'),
              ${pedido.ageCodigo},
              ${pedido.pedCliCodigo},
              '${pedido.pedLqCcoCodigo}',
              ${pedido.ccaRuta},
              ${pedido.pedCliPoliticas},
              ${pedido.cliListaPre},
              ${pedido.cliImpPorcentaje},
              PEDIDO_DETALLE_TAB(${detalles}),
              ${pedido.subTotal.toFixed(2)},
              ${pedido.totDesc1.toFixed(2)},
              ${pedido.totDesc2},
              ${pedido.iva.toFixed(2)},
              ${pedido.total.toFixed(2)}
            ) AS resultado
            FROM DUAL
            `,
          );

          // Procesar el resultado
          const pedidoResultado = {
            pedId: pedido.pedId,
            estado: 'success',
            resultado: result[0]?.RESULTADO || null,
          };
          resultados.push(pedidoResultado);
        } catch (error) {
          // Manejo de errores específicos del pedido
          const pedidoError = {
            pedId: pedido.pedId,
            estado: 'error',
            error: error.message || 'Error desconocido',
          };
          resultados.push(pedidoError);
        }
      }
      // Retornar los resultados procesados
      return {
        ok: true,
        resultados,
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async obtenerAgentePorAlmId(almId: number, ucmModulo: number) {
    try {
      // 1 Preventa
      // 2 Entrega
      // 3 Supervisor
      // 4 Autoventa
      const agente = await this._usrcmovilService.query(
        `
        select age_codigo, age_nombre, ucm_modulo, can_nombre, age_almacen
        from w_cmovil_agentes t
        where age_almacen = ${almId} 
        and t.ucm_modulo=${ucmModulo}
        `,
      );
      if (agente.length == 0) {
        throw new HttpException('No existe agente', HttpStatus.BAD_REQUEST);
      }

      return plainToInstance(transformAgenteDto, agente);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async obtenerDatosParaGraficarEnMapaPreventa(
    postParamDataMapDto: postParamDataMapDto,
  ) {
    try {
      let dataPendientesVisitar = '';
      if (postParamDataMapDto.usuModulo == 2) {
        console.log('Entraaa enm iiiiiiiiiiif');

        dataPendientesVisitar = await this._usrcmovilService.query(
          `
          select * from V_MOVIL_PENDIENTE_ENT

          WHERE AGE_CODIGO =${postParamDataMapDto.ageCodigo}
          AND   CCO_ADESTINO = ${postParamDataMapDto.almId} 
          AND   CCO_FECHA = TO_dATE('${postParamDataMapDto.fecha}','DD/MM/YYYY')
          `,
        );
      } else {
        console.log('entra elseeeeeeeeeee');

        dataPendientesVisitar = await this._usrcmovilService.query(
          `
          SELECT *
          FROM W_CMOVIL_PENDIENTES H
          WHERE H.AGE_CODIGO =${postParamDataMapDto.ageCodigo}
          AND   H.CCO_ADESTINO = ${postParamDataMapDto.almId} 
          AND   H.CCO_FECHA = TO_dATE('${postParamDataMapDto.fecha}','DD/MM/YYYY')
          `,
        );
      }

      const dataVisitados = await this._usrcmovilService.query(
        `
        select * from w_cmovil_realizado t
        WHERE T.LOG_COD_AGENTE =${postParamDataMapDto.ageCodigo}
        AND   T.FECHA = TO_dATE('${postParamDataMapDto.fecha}','DD/MM/YYYY')
        order by LOG_FECHA_CREA ASC
        `,
      );

      return {
        datosVisitadosMap: plainToInstance(
          transformDataMapVisitadoDto,
          dataVisitados,
        ),
        datosPendientesMap: plainToInstance(
          transformDataMapPendienteDto,
          dataPendientesVisitar,
        ),
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  // async obtenerClientesVisitados(almId: number) {
  //   try {
  //     const agente = await this._usrcmovilService.query(
  //       `
  //       select age_codigo, age_nombre, ucm_modulo, can_nombre, age_almacen
  //       from w_cmovil_agentes t
  //       where age_almacen = ${almId}
  //       `,
  //     );
  //     if (agente.length == 0) {
  //       throw new HttpException('No existe agente', HttpStatus.BAD_REQUEST);
  //     }

  //     return plainToInstance(transformAgenteDto, agente);
  //   } catch (error) {
  //     throw new HttpException(error, HttpStatus.BAD_REQUEST);
  //   }
  // }

  async subirDataNovedad(postSubirDataNovedadDto: [postSubirDataNovedadDto]) {
    try {
      const resultados = [];
      for (const novedad of postSubirDataNovedadDto) {
        try {
          const insertNovedad = await this._usrcmovilService.query(
            `
            SELECT TO_CHAR(
            AST_CMOVIL.RECIBE_LOG_F(
              ${novedad.ccaEmpresa},
              '${novedad.logCodigo || ''}',
              ${novedad.ucmAlmCodigo},
              TO_TIMESTAMP('${
                novedad.fechaCrea
              }', 'YYYY-MM-DD"T"HH24:MI:SS.FF'),
              ${
                novedad.logFechaTrans
                  ? `TO_DATE('${novedad.logFechaTrans}', 'YYYY-MM-DD"T"HH24:MI:SS')`
                  : 'NULL'
              },
               TO_TIMESTAMP('${
                 novedad.nclFechaIni
               }', 'YYYY-MM-DD"T"HH24:MI:SS.FF'),
              TO_TIMESTAMP('${
                novedad.nclFechaFin
              }','YYYY-MM-DD"T"HH24:MI:SS.FF'),
              ${novedad.logTipoDoc},
              ${novedad.ucmId},
              ${novedad.ageCodigo},
              '${novedad.nclLatitud}',
              '${novedad.nclLongitud}',
              '${novedad.logCodigoLq}',
              ${novedad.cliCodigo},
              ${novedad.cliRuta},
              ${novedad.novTviCodigo},
              ${novedad.logTviTipo},
              ${novedad.novTviAccion},
              ${novedad.novTviSubtipo || 'NULL'},
              '${novedad.nclDescripcion || ''}',
              ${novedad.logEntCob},
              ${novedad.logModulo},
              ${novedad.logEficiencia},
              ${novedad.logEfectividad}
            )
          ) AS RESULTADO
          FROM dual
            `,
          );
          // Procesar el resultado
          const pedidoResultado = {
            nclId: novedad.nclId,
            estado: 'success',
            resultado: insertNovedad[0]?.RESULTADO || null,
          };
          resultados.push(pedidoResultado);
        } catch (error) {
          const novedadError = {
            nclId: novedad.nclId,
            estado: 'error',
            error: error.message || 'Error desconocido',
          };
          resultados.push(novedadError);
        }
      }
      return {
        ok: true,
        resultados,
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async subirImagenServer(file: Express.Multer.File) {
    try {
      if (!file) {
        throw new HttpException(
          'No image file provided!',
          HttpStatus.BAD_REQUEST,
        );
      }

      const resultado = {
        filename: file.originalname,
        path: `/uploads/images/${file.originalname}`,
        status: 'success',
      };

      return {
        status: 'success',
        message: 'Image uploaded successfully!',
        data: resultado,
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
