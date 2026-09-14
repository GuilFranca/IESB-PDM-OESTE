import { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import MetaInput from './components/MetaInput';
import MetaList from './components/MetaList';

const STORAGE_KEY = '@metas_semestre';

export default function App() {
  const [texto, setTexto] = useState('');
  const [metas, setMetas] = useState([]);
  const [carregado, setCarregado] = useState(false);

  const pendentes = metas.filter((meta) => !meta.concluida).length;
  const concluidas = metas.filter((meta) => meta.concluida).length;

  // Carrega as metas persistidas na montagem do app.
  useEffect(() => {
    async function carregarMetas() {
      try {
        const bruto = await AsyncStorage.getItem(STORAGE_KEY);
        if (bruto) {
          const parsed = JSON.parse(bruto);
          setMetas(Array.isArray(parsed) ? parsed : []);
        }
      } catch (erro) {
        Alert.alert(
          'Não foi possível carregar',
          'Houve um problema ao ler as metas salvas neste aparelho.'
        );
      } finally {
        setCarregado(true);
      }
    }

    carregarMetas();
  }, []);

  // Salva a lista sempre que ela mudar (depois da carga inicial).
  useEffect(() => {
    if (!carregado) {
      return;
    }

    async function salvarMetas() {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(metas));
      } catch (erro) {
        Alert.alert(
          'Não foi possível salvar',
          'Suas metas estão na tela, mas não puderam ser gravadas no aparelho.'
        );
      }
    }

    salvarMetas();
  }, [metas, carregado]);

  function handleAdd() {
    const textoLimpo = texto.trim();

    if (!textoLimpo) {
      Alert.alert('Campo vazio', 'Digite uma meta antes de adicionar.');
      return;
    }

    const novaMeta = {
      id: Date.now().toString(),
      texto: textoLimpo,
      criadaEm: new Date().toISOString(),
      concluida: false,
    };

    setMetas((listaAtual) => [novaMeta, ...listaAtual]);
    setTexto('');
  }

  function handleDelete(id) {
    setMetas((listaAtual) => listaAtual.filter((meta) => meta.id !== id));
  }

  function handleToggle(id) {
    setMetas((listaAtual) =>
      listaAtual.map((meta) =>
        meta.id === id ? { ...meta, concluida: !meta.concluida } : meta
      )
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safe}>
        <StatusBar barStyle="dark-content" />

        <View style={styles.header}>
          <Image source={require('./assets/icon.png')} style={styles.logo} />
          <View style={styles.headerText}>
            <Text style={styles.title}>Metas do Semestre</Text>
            <Text style={styles.counter}>
              {pendentes} pendentes / {concluidas} concluídas
            </Text>
          </View>
        </View>

        <View style={styles.content}>
          <MetaInput
            value={texto}
            onChangeText={setTexto}
            onAdd={handleAdd}
          />
          <MetaList
            metas={metas}
            onDelete={handleDelete}
            onToggle={handleToggle}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#EEF3F8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
    gap: 12,
  },
  logo: {
    width: 52,
    height: 52,
    borderRadius: 14,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#123A56',
  },
  counter: {
    marginTop: 4,
    fontSize: 14,
    color: '#0E7C7B',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
