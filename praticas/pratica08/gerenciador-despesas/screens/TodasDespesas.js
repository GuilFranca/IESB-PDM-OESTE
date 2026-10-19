import DespesaSaida from '../components/despesa/DespesaSaida';
import { DUMMY_DESPESAS } from '../data/despesas';

function TodasDespesas() {
  return <DespesaSaida despesas={DUMMY_DESPESAS} periodo="Total" />;
}

export default TodasDespesas;
