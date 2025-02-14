import { Articulacao, Dispositivo } from '../../../model/dispositivo/dispositivo';
import { isArticulacao } from '../../../model/dispositivo/tipo';
import { buildListaElementosRenumerados, createElemento, getDispositivoFromElemento, getElementos } from '../../../model/elemento/elementoUtil';
import { normalizaSeForOmissis } from '../../../model/lexml/conteudo/conteudoUtil';
import { criaDispositivo } from '../../../model/lexml/dispositivo/dispositivoLexmlFactory';
import {
  getAgrupadorAcimaByTipo,
  getAgrupadoresAcimaByTipo,
  getDispositivoAnterior,
  getDispositivoAnteriorMesmoTipo,
  hasAgrupadoresAcimaByTipo,
  hasAgrupadoresAnterioresByTipo,
  irmaosMesmoTipo,
  isArticulacaoAlteracao,
  isDispositivoAlteracao,
} from '../../../model/lexml/hierarquia/hierarquiaUtil';
import { State, StateType } from '../../state';
import { Eventos } from '../evento/eventos';
import { ajustaReferencia, copiaDispositivosParaOutroPai, isDesdobramentoAgrupadorAtual, textoFoiModificado } from '../util/reducerUtil';
import { buildPast } from '../util/stateReducerUtil';

export const agrupaElemento = (state: any, action: any): State => {
  const atual = getDispositivoFromElemento(state.articulacao, action.atual, true);

  if (atual === undefined) {
    return state;
  }

  const dispositivoAnterior = getDispositivoAnterior(atual);
  const pos = atual.pai!.indexOf(atual);
  const removidos = atual
    .pai!.filhos.filter((f: Dispositivo, index: number) => index >= pos && f.tipo !== action.novo.tipo)
    .map(d => getElementos(d))
    .flat();

  if (textoFoiModificado(atual, action)) {
    atual.texto = !isDispositivoAlteracao(atual) ? action.atual.conteudo?.texto : normalizaSeForOmissis(action.atual.conteudo?.texto ?? '');
  }

  let novo;
  let ref: any = undefined;

  if (isDesdobramentoAgrupadorAtual(atual, action.novo.tipo)) {
    novo = criaDispositivo(atual.pai!.pai!, action.novo.tipo, undefined, atual.pai!.pai!.indexOf(atual.pai!) + 1);
    ref = getDispositivoAnteriorMesmoTipo(novo);
  } else if ((!isDispositivoAlteracao(atual) && hasAgrupadoresAcimaByTipo(atual, action.novo.tipo)) || hasAgrupadoresAnterioresByTipo(atual, action.novo.tipo)) {
    ref = getAgrupadoresAcimaByTipo(atual, action.novo.tipo) ?? getAgrupadorAcimaByTipo(atual, action.novo.tipo);
    novo = criaDispositivo(ref!.pai!, action.novo.tipo, ref);
  } else {
    novo = criaDispositivo(atual.pai!, action.novo.tipo, undefined, atual.pai!.indexOf(atual));
    ref = dispositivoAnterior ?? atual.pai!;
  }
  novo.texto = action.novo.conteudo?.texto;
  const dispositivos = atual.pai!.filhos.filter((f: Dispositivo, index: number) => index >= pos && f.tipo !== action.novo.tipo);
  copiaDispositivosParaOutroPai(novo, dispositivos);
  novo.renumeraFilhos();
  novo.pai!.renumeraFilhos();

  const renumerados = [...buildListaElementosRenumerados(novo)].concat(
    novo.filhos
      .filter((f: Dispositivo, index: number) => index >= pos && f.tipo !== atual.tipo)
      .map((d: Dispositivo) => getElementos(d))
      .flat()
  );

  const irmaoAnterior = getDispositivoAnteriorMesmoTipo(novo);

  if (irmaoAnterior && irmaosMesmoTipo(novo).length === 2) {
    renumerados.unshift(createElemento(irmaoAnterior));
  }

  const eventos = new Eventos();
  eventos.setReferencia(createElemento(ajustaReferencia(ref!.pai && isArticulacao(ref!) && isArticulacaoAlteracao(ref as Articulacao) ? ref!.pai : ref!, novo)));
  eventos.add(StateType.ElementoIncluido, getElementos(novo));
  eventos.add(StateType.ElementoRemovido, removidos);

  eventos.add(StateType.ElementoRenumerado, renumerados);

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
