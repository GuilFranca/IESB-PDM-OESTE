# 💻 Prática 05: Metas do Semestre (persistência local)

App **MetasSemestre**: o aluno cadastra metas de estudo, marca como concluídas, remove itens e os dados sobrevivem ao fechar o aplicativo.

Pasta do projeto Expo: `praticas/pratica05/MetasSemestre`.

## Como rodar

```bash
cd praticas/pratica05/MetasSemestre
npm install
npx expo start
```

Abra no **Expo Go** (Android/iOS). Pacotes nativos foram instalados com `npx expo install`.

---

## Prints

### Lista vazia

![Lista vazia](prints/lista-vazia.png)

### Com itens

![Lista com metas](prints/com-itens.png)

### Após reabrir o app

Os mesmos itens reaparecem: a lista foi lida do AsyncStorage na montagem.

![Após reabrir o aplicativo](prints/apos-reabrir.png)

---

## Onde estão os `useEffect`

Tudo fica em `MetasSemestre/App.js`, chave `@metas_semestre`.

1. **Carga (montagem)** — `useEffect` com `[]`. Chama `AsyncStorage.getItem`, faz `JSON.parse` e atualiza o estado `metas`. Erros caem em `try/catch` com `Alert`.
2. **Salvamento (sempre que a lista muda)** — `useEffect` com `[metas, carregado]`. Depois da carga inicial, grava com `AsyncStorage.setItem` + `JSON.stringify`. O flag `carregado` evita sobrescrever o storage com `[]` antes da leitura terminar.

```javascript
// CARREGAR — uma vez, quando o App monta
useEffect(() => {
  carregarMetas();
}, []);

// SALVAR — sempre que a lista mudar
useEffect(() => {
  if (!carregado) return;
  salvarMetas();
}, [metas, carregado]);
```

---

## Organização

| Arquivo | Responsabilidade |
| :--- | :--- |
| `App.js` | Estado (`useState`), persistência (`useEffect` + AsyncStorage), cabeçalho e orquestração |
| `components/MetaInput.js` | `TextInput` + `Pressable` de adicionar (`value`, `onChangeText`, `onAdd`) |
| `components/MetaList.js` | `FlatList` das metas (`metas`, `onDelete`, `onToggle`) |

Cada meta é `{ id, texto, criadaEm, concluida }`. O `id` vem de `Date.now().toString()`. Remoção usa `filter` por `id` (array novo, sem `push`/`splice`). Texto vazio dispara `Alert`. Botões usam `Pressable` com `android_ripple`.

### Desafio extra

- Campo `concluida` (boolean) e estilo riscado (`textDecorationLine: 'line-through'`).
- Contador no cabeçalho: `X pendentes / Y concluídas`.
