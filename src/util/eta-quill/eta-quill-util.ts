import { Elemento } from '../../model/elemento';
import { Mensagem } from '../../model/lexml/util/mensagem';
import { EtaBlotConteudo } from './eta-blot-conteudo';
import { EtaBlotEspaco } from './eta-blot-espaco';
import { EtaBlotMensagem } from './eta-blot-mensagem';
import { EtaBlotRotulo } from './eta-blot-rotulo';
import { EtaContainerTable } from './eta-container-table';
import { EtaContainerTdDireito } from './eta-container-td-direito';
import { EtaContainerTdEsquerdo } from './eta-container-td-esquerdo';
import { EtaContainerTr } from './eta-container-tr';

export class EtaQuillUtil {
  static criarContainerLinha(elemento: Elemento): EtaContainerTable {
    const etaTable: EtaContainerTable = new EtaContainerTable(elemento);
    const etaTrContainer: EtaContainerTr = new EtaContainerTr(elemento.editavel);
    const etaTdTexto: EtaContainerTdEsquerdo = new EtaContainerTdEsquerdo(elemento.editavel);
    const etaTdEspaco: EtaContainerTdDireito = new EtaContainerTdDireito();

    new EtaBlotRotulo(elemento).insertInto(etaTdTexto);
    new EtaBlotConteudo(elemento).insertInto(etaTdTexto);
    new EtaBlotEspaco().insertInto(etaTdEspaco);

    etaTdTexto.insertInto(etaTrContainer);
    etaTdEspaco.insertInto(etaTrContainer);

    etaTrContainer.insertInto(etaTable);

    return etaTable;
  }

  static criarContainerMensagens(elemento: Elemento): EtaContainerTr {
    const etaTrContainer: EtaContainerTr = new EtaContainerTr(false);
    const etaTdMensagens: EtaContainerTdEsquerdo = new EtaContainerTdEsquerdo(false);
    const etaTdEspaco: EtaContainerTdDireito = new EtaContainerTdDireito();

    if (elemento.mensagens && elemento.mensagens.length > 0) {
      elemento.mensagens.forEach((mensagem: Mensagem): void => {
        new EtaBlotMensagem(mensagem).insertInto(etaTdMensagens);
      });
    }
    new EtaBlotEspaco().insertInto(etaTdEspaco);

    etaTdMensagens.insertInto(etaTrContainer);
    etaTdEspaco.insertInto(etaTrContainer);

    return etaTrContainer;
  }
}
