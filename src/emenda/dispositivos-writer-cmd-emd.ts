import { isArticulacaoAlteracao } from './../model/lexml/hierarquia/hierarquiaUtil';
import { isArticulacao } from './../model/dispositivo/tipo';
import { Dispositivo } from '../model/dispositivo/dispositivo';
import { Genero } from '../model/dispositivo/genero';
import { isAgrupador, isArtigo, isOmissis, isParagrafo } from '../model/dispositivo/tipo';
import { isDispositivoAlteracao, isDispositivoRaiz } from '../model/lexml/hierarquia/hierarquiaUtil';
import { TipoDispositivo } from '../model/lexml/tipo/tipoDispositivo';
import { removeEspacosDuplicados, StringBuilder } from '../util/string-util';
import { generoMasculino } from './../model/dispositivo/genero';
import { DescricaoSituacao } from './../model/dispositivo/situacao';
import { CmdEmdUtil } from './comando-emenda-util';
import { SequenciaRangeDispositivos } from './sequencia-range-dispositivos';

enum ArtigoAntesDispositivo {
  NENHUM,
  DEFINIDO,
  DEFINIDO_COM_PREPOSICAO_A,
}

export class DispositivosWriterCmdEmd {
  private artigoAntesDispositivo = ArtigoAntesDispositivo.NENHUM;

  getTexto(sequencias: SequenciaRangeDispositivos[]): string {
    const sb = new StringBuilder();

    const qtdSequencias = sequencias.length;
    let posSequencia = 1;
    for (const sequencia of sequencias) {
      // Conector (, ou e)
      if (posSequencia > 1) {
        if (posSequencia === qtdSequencias) {
          sb.append(' e ');
        } else {
          sb.append(', ');
        }
      }

      if (sequencia.informarCaputDoDispositivo) {
        sb.append(this.getReferenciaCaputDoDispositivo(sequencia));
      } else {
        // Artigo antes do dispositivo
        sb.append(this.getTextoArtigoAntesSequencia(sequencia));
      }

      // Rótulo do tipo do dispositivo
      sb.append(this.getRotuloTipoDispositivo(sequencia));

      sb.append(' ');

      // Dispositivos
      sb.append(sequencia.getTextoListaDeDispositivos());

      // Pai dos dispositivos
      sb.append(this.getRotuloPaisSequencia(sequencia));

      posSequencia++;
    }

    return removeEspacosDuplicados(sb.toString());
  }

  private getReferenciaCaputDoDispositivo(sequencia: SequenciaRangeDispositivos): string {
    const sb = new StringBuilder();

    const disp = sequencia.getPrimeiroDispositivo();

    if (disp.tipo === TipoDispositivo.caput.tipo) {
      return this.getTextoArtigoAntesSequencia(sequencia);
    }

    const plural = CmdEmdUtil.isSequenciaPlural(sequencia);

    sb.append(this.getTextoArtigoAntesDispositivo(this.artigoAntesDispositivo, generoMasculino, plural));

    sb.append(' caput ');

    if (sequencia.getRange(0).getQuantidadeDispositivos() === 1) {
      sb.append(disp.pronomePossessivoSingular);
    } else {
      sb.append(disp.pronomePossessivoPlural);
    }

    return sb.toString();
  }

  private getTextoArtigoAntesSequencia(sequencia: SequenciaRangeDispositivos): string {
    const disp = sequencia.getPrimeiroDispositivo();
    const plural = CmdEmdUtil.isSequenciaPlural(sequencia);

    return this.getTextoArtigoAntesDispositivo(this.artigoAntesDispositivo, disp, plural);
  }

  private getTextoArtigoAntesDispositivo(tipo: ArtigoAntesDispositivo, genero: Genero, plural: boolean): string {
    switch (tipo) {
      case ArtigoAntesDispositivo.DEFINIDO:
        if (plural) {
          return genero.artigoDefinidoPlural;
        }
        return genero.artigoDefinidoSingular;
      case ArtigoAntesDispositivo.DEFINIDO_COM_PREPOSICAO_A:
        if (plural) {
          return genero.artigoDefinidoPrecedidoPreposicaoAPlural;
        }
        return genero.artigoDefinidoPrecedidoPreposicaoASingular;
      default:
        return '';
    }
  }

  private getRotuloTipoDispositivo(sequencia: SequenciaRangeDispositivos): string {
    const disp = sequencia.getPrimeiroDispositivo();

    return DispositivosWriterCmdEmd.getRotuloTipoDispositivo(disp, CmdEmdUtil.isSequenciaPlural(sequencia));
  }

  static getRotuloTipoDispositivo(disp: Dispositivo, plural: boolean): string {
    // TODO Verificar melhor forma de identificar que não deve ser impresso o rótulo
    // do tipo do dispositivo antes do parágrafo único e do artigo único.
    if (disp.getNumeracaoParaComandoEmenda().indexOf('único') >= 0) {
      return '';
    }

    if (plural) {
      // Plural
      if (isArtigo(disp)) {
        return 'arts.';
      } else if (isParagrafo(disp)) {
        return '§§';
      }

      return String(disp.descricaoPlural).toLocaleLowerCase();
    }

    // Singular
    if (isArtigo(disp)) {
      return 'art.';
    } else if (isParagrafo(disp)) {
      return '§';
    }

    return String(disp.descricao).toLowerCase();
  }

  private getRotuloPaisSequencia(sequencia: SequenciaRangeDispositivos): string {
    const disp = sequencia.getPrimeiroDispositivo();
    const localizarArtigoEmAgrupador = sequencia.localizarArtigoEmAgrupador;

    return this.getRotuloPais(disp, localizarArtigoEmAgrupador);
  }

  private getRotuloPais(disp: Dispositivo, localizarArtigoEmAgrupador: boolean): string {
    const sb = new StringBuilder();

    let pai: Dispositivo | undefined;

    while (!isDispositivoRaiz(disp)) {
      pai = disp.pai;

      if (pai && isArticulacaoAlteracao(pai)) {
        if (disp.tipo === TipoDispositivo.omissis.tipo) {
          const anterior = CmdEmdUtil.getDispositivoAnteriorDireto(disp);
          if (anterior.tipo !== TipoDispositivo.alteracao.tipo) {
            sb.append('após ');
            sb.append(anterior.artigoDefinidoSingular);
            sb.append(anterior.getNumeracaoComRotuloParaComandoEmenda());
            sb.append(this.getRotuloPais(anterior, localizarArtigoEmAgrupador));
            return sb.toString();
          }
        }
        break;
      }

      if (pai && !isDispositivoRaiz(pai as Dispositivo) && (!isAgrupador(pai) || (isArtigo(disp) && localizarArtigoEmAgrupador))) {
        const dispAlteracao = isDispositivoAlteracao(disp);
        const dispositivoNovoForaDeAlteracao = !dispAlteracao && disp.situacao.descricaoSituacao === DescricaoSituacao.DISPOSITIVO_ADICIONADO;
        const dispositivoNovoEmAlteracao = dispAlteracao && !CmdEmdUtil.isTextoOmitido(disp) && disp.situacao.descricaoSituacao === DescricaoSituacao.DISPOSITIVO_ADICIONADO;
        // TODO Tratar diferentes situações na norma vigente
        // && StringUtils
        //         .defaultString(disp.getSituacaoNaNormaVigente())
        //         .equals(Dispositivo.ACRESCIMO);
        if (dispositivoNovoForaDeAlteracao || dispositivoNovoEmAlteracao) {
          sb.append(pai.artigoDefinidoPrecedidoPreposicaoASingular);
        } else if (isOmissis(disp)) {
          const anterior = CmdEmdUtil.getDispositivoAnteriorDireto(disp);
          const posterior = CmdEmdUtil.getDispositivoPosteriorDireto(disp);

          if (anterior === pai && posterior && posterior.pai === pai) {
            // Entre pai e irmão
            const refIrmao = posterior.pronomePossessivoSingular + ' ' + posterior.descricao?.toLowerCase() + ' ' + posterior.getNumeracaoParaComandoEmenda();
            sb.append('antes ' + refIrmao);
            sb.append(pai.pronomePossessivoSingular);
          } else if (!(isArticulacao(anterior) && anterior.pai)) {
            sb.append('após ');
            sb.append(anterior.artigoDefinidoSingular);
            sb.append(anterior.getNumeracaoComRotuloParaComandoEmenda());
            sb.append(this.getRotuloPais(anterior, localizarArtigoEmAgrupador));
            return sb.toString();
          }
        } else {
          sb.append(pai.pronomePossessivoSingular);
        }
        sb.append(pai.getNumeracaoComRotuloParaComandoEmenda());
      } else if (isArtigo(disp) && isDispositivoRaiz(pai as Dispositivo) && localizarArtigoEmAgrupador) {
        const agrupador = CmdEmdUtil.getProximoAgrupador(disp);
        if (agrupador) {
          sb.append(' antes ');
          sb.append(agrupador.pronomePossessivoSingular);
          sb.append(agrupador.getNumeracaoComRotuloParaComandoEmenda());
        }
      }

      if (!pai) break;
      disp = pai;
    }

    return sb.toString();
  }

  setArtigoAntesDispositivo(artigoAntesDispositivo: ArtigoAntesDispositivo): void {
    this.artigoAntesDispositivo = artigoAntesDispositivo;
  }
}
