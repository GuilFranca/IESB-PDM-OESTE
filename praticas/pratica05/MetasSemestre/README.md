# MetasSemestre

App de metas acadêmicas em React Native (Expo). Cadastre metas de estudo, marque como concluídas, remova itens e mantenha os dados no aparelho com AsyncStorage.

## Como rodar

```bash
npm install
npx expo start
```

## Persistência

Em `App.js`:

- **Carga:** `useEffect` com `[]` lê a chave `@metas_semestre`.
- **Salvamento:** `useEffect` dependente de `metas` grava a lista sempre que ela muda (depois da carga inicial).
