import DespesaSaida from '../components/despesa/DespesaSaida';
import { DUMMY_DESPESAS } from '../data/despesas';

function DespesasRecentes() {
  function filtrarUltimos7Dias(despesas) {
    const hoje = new Date();
    const seteDiasAtras = new Date();
    seteDiasAtras.setDate(hoje.getDate() - 7);

    return despesas.filter((despesa) => {
      return despesa.data >= seteDiasAtras && despesa.data <= hoje;
    });
  }

  return (
    <DespesaSaida
      despesas={filtrarUltimos7Dias(DUMMY_DESPESAS)}
      periodo="Ultimos 7 dias"
    />
  );
}

export default DespesasRecentes;
