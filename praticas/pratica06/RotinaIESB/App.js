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
import CompromissoInput from './components/CompromissoInput';
import CompromissoList from './components/CompromissoList';
import {
  alertaMensagem,
  alertaTitulo,
  botaoAdicionar,
  erroCarregar,
  erroSalvar,
  listaVazia,
  placeholderCompromisso,
  tituloApp,
  tituloLista,
} from './labels';

const STORAGE_KEY = '@rotina_iesb_compromissos';

export default function App() {
  const [texto, setTexto] = useState('');
  const [categoria, setCategoria] = useState('aula');
  const [filtro, setFiltro] = useState('todos');
  const [compromissos, setCompromissos] = useState([]);
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    async function carregarCompromissos() {
      try {
        const bruto = await AsyncStorage.getItem(STORAGE_KEY);
        if (bruto) {
          const parsed = JSON.parse(bruto);
          setCompromissos(Array.isArray(parsed) ? parsed : []);
        }
      } catch (erro) {
        Alert.alert('Erro ao carregar', erroCarregar);
      } finally {
        setCarregado(true);
      }
    }

    carregarCompromissos();
  }, []);

  useEffect(() => {
    if (!carregado) {
      return;
    }

    async function salvarCompromissos() {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(compromissos));
      } catch (erro) {
        Alert.alert('Erro ao salvar', erroSalvar);
      }
    }

    salvarCompromissos();
  }, [compromissos, carregado]);

  function handleAdd() {
    const textoLimpo = texto.trim();

    if (!textoLimpo) {
      Alert.alert(alertaTitulo, alertaMensagem);
      return;
    }

    const novo = {
      id: Date.now().toString(),
      texto: textoLimpo,
      criadoEm: new Date().toISOString(),
      categoria,
      concluido: false,
    };

    setCompromissos((listaAtual) => [novo, ...listaAtual]);
    setTexto('');
  }

  function handleDelete(id) {
    setCompromissos((listaAtual) => listaAtual.filter((item) => item.id !== id));
  }

  function handleToggle(id) {
    setCompromissos((listaAtual) =>
      listaAtual.map((item) =>
        item.id === id ? { ...item, concluido: !item.concluido } : item
      )
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />

        <View style={styles.header}>
          <Image source={require('./assets/logo.png')} style={styles.logo} />
          <View style={styles.headerTexto}>
            <Text style={styles.titulo}>{tituloApp}</Text>
            <Text style={styles.subtitulo}>Organizador da rotina acadêmica</Text>
          </View>
        </View>

        <View style={styles.conteudo}>
          <CompromissoInput
            value={texto}
            onChangeText={setTexto}
            onAdd={handleAdd}
            categoria={categoria}
            onChangeCategoria={setCategoria}
            labels={{
              placeholderCompromisso,
              botaoAdicionar,
            }}
          />
          <CompromissoList
            itens={compromissos}
            onDelete={handleDelete}
            onToggle={handleToggle}
            tituloLista={tituloLista}
            listaVazia={listaVazia}
            filtro={filtro}
            onChangeFiltro={setFiltro}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
  },
  logo: {
    width: 52,
    height: 52,
    borderRadius: 14,
    marginRight: 12,
  },
  headerTexto: {
    flex: 1,
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1A365D',
  },
  subtitulo: {
    marginTop: 4,
    fontSize: 13,
    color: '#6B7C8D',
    fontWeight: '500',
  },
  conteudo: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
