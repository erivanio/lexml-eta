import { ElementoAction } from '.';
import { Referencia } from '../../elemento';

export const ELEMENTO_SELECIONADO = 'ELEMENTO_SELECIONADO';

class ElementoSelecionado implements ElementoAction {
  descricao: string;
  tipo?: string;

  constructor() {
    this.descricao = 'Elemento selecionado';
  }

  execute(atual: Referencia): any {
    return {
      type: ELEMENTO_SELECIONADO,
      atual,
    };
  }
}
export const elementoSelecionadoAction = new ElementoSelecionado();
