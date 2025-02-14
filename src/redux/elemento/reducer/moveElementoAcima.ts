import { buildListaDispositivos, createElemento, getDispositivoFromElemento, getElementos, listaDispositivosRenumerados } from '../../../model/elemento/elementoUtil';
import { isAcaoPermitida } from '../../../model/lexml/acao/acaoUtil';
import { MoverElementoAcima } from '../../../model/lexml/acao/moverElementoAcimaAction';
import { validaDispositivo } from '../../../model/lexml/dispositivo/dispositivoValidator';
import { getDispositivoAnterior, getDispositivoAnteriorMesmoTipoInclusiveOmissis } from '../../../model/lexml/hierarquia/hierarquiaUtil';
import { TipoDispositivo } from '../../../model/lexml/tipo/tipoDispositivo';
import { TipoMensagem } from '../../../model/lexml/util/mensagem';
import { State, StateType } from '../../state';
import { Eventos } from '../evento/eventos';
import { ajustaReferencia, resetUuidTodaArvore } from '../util/reducerUtil';
import { buildPast, retornaEstadoAtualComMensagem } from '../util/stateReducerUtil';

export const moveElementoAcima = (state: any, action: any): State => {
  const atual = getDispositivoFromElemento(state.articulacao, action.atual, true);

  if (atual === undefined) {
    state.ui = [];
    return state;
  }

  if (!isAcaoPermitida(atual, MoverElementoAcima)) {
    return retornaEstadoAtualComMensagem(state, { tipo: TipoMensagem.ERROR, descricao: 'Não é possível excluir um dispositivo original mas apenas suprimi-lo.' });
  }

  const anterior = getDispositivoAnteriorMesmoTipoInclusiveOmissis(atual);

  if (anterior === undefined) {
    return state;
  }

  const removidos = [...getElementos(anterior), ...getElementos(atual)];
  const renumerados = listaDispositivosRenumerados(atual);

  const pai = atual.pai!;
  const pos = pai.indexOf(anterior);

  resetUuidTodaArvore(anterior);
  resetUuidTodaArvore(atual);

  pai.removeFilho(anterior);
  pai.removeFilho(atual);

  pai.addFilhoOnPosition(atual, pos);
  pai.addFilhoOnPosition(anterior, pos + 1);

  pai.renumeraFilhos();

  const referencia = pos === 0 ? (atual.pai?.tipo === TipoDispositivo.caput.tipo ? pai.pai! : pai) : getDispositivoAnterior(atual);

  const eventos = new Eventos();
  eventos.setReferencia(createElemento(ajustaReferencia(referencia!, atual)));
  eventos.add(
    StateType.ElementoIncluido,
    buildListaDispositivos(atual, [])
      .concat(buildListaDispositivos(anterior, []))
      .map(v => {
        v.mensagens = validaDispositivo(v);
        return createElemento(v);
      })
  );
  eventos.add(StateType.ElementoRemovido, removidos);
  eventos.add(
    StateType.ElementoRenumerado,
    renumerados.map(r => createElemento(r))
  );

  return {
    articulacao: state.articulacao,
    tipoDocumento: state.tipoDocumento,
    past: buildPast(state, eventos.build()),
    present: eventos.build(),
    future: state.future,
    ui: {
      events: eventos.build(),
    },
  };
};
