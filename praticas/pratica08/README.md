# Pratica 08 — Gerenciador de Despesas

Evolucao da pratica 07: as telas passam a listar despesas (dados dummy), mostrar o total do periodo e cadastrar descricao, valor e data.

Pasta do app: `praticas/pratica08/gerenciador-despesas`.

## Como rodar

```bash
cd praticas/pratica08/gerenciador-despesas
npm install
npx expo start
```

## O que tem no app

- Abas **Recentes** (ultimos 7 dias) e **Todas**
- Resumo do periodo + lista (`FlatList`)
- Botao `+` abre **Gerenciar Despesa** (descricao, valor e data)
- `DateTimePicker` no campo de data

## Arquivos principais

| Arquivo | Papel |
| :--- | :--- |
| `App.js` | Stack + tabs (navegacao da pratica 07) |
| `data/despesas.js` | Lista dummy compartilhada |
| `components/despesa/DespesaSaida.js` | Sumario + lista |
| `components/despesa/DespesaSumario.js` | Total do periodo |
| `components/despesa/DespesaLista.js` | FlatList |
| `components/despesa/DespesaItem.js` | Item da despesa |
| `screens/DespesasRecentes.js` | Filtro dos ultimos 7 dias |
| `screens/TodasDespesas.js` | Todas as despesas |
| `screens/GerenciarDespesa.js` | Formulario |
