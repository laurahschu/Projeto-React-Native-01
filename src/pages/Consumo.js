import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

export default function Consumo() {
  const route = useRoute();
  const navigation = useNavigation();
  const { quilometragem, litros } = route.params;

  const [mediaConsumo, setMediaConsumo] = useState("");
  const [classificacao, setClassificacao] = useState("");
  const [cor, setCor] = useState('white');

  const calcularConsumo = () => {
    if (quilometragem !== "" && litros !== "") {
      const media = quilometragem / litros;
      setMediaConsumo(media.toFixed(2));
      classificarConsumo(media);
    }
  };

  const classificarConsumo = (media) => {
    if (media > 12) {
      setClassificacao("A");
      setCor('#2E865F');
    } else if (media <= 12 && media > 10) {
      setClassificacao("B");
      setCor("#8B9467");
    } else if (media <= 10 && media > 8) {
      setClassificacao("C");
      setCor("#F7DC6F");
    } else if (media <= 8 && media > 4) {
      setClassificacao("D");
      setCor("#FFA07A");
    } else {
      setClassificacao("E");
      setCor("#FF3737");
    }
  };

  const IrParaHome = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <View style={styles.content}>
          <Text style={styles.title}>Seu Consumo:</Text>
          <Text style={[styles.tipo, { color: cor }]}>{classificacao}</Text>
          <Text style={styles.consumo}>{mediaConsumo ? `${mediaConsumo} Km/L` : "-- Km/L"}</Text>
        </View>

        <TouchableOpacity style={styles.buttonBox} onPress={calcularConsumo}>
          <Text style={styles.buttonText}>Calcular Consumo</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonBox} onPress={IrParaHome}>
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20, // Aumentei o padding para melhor espaçamento
    backgroundColor: '#fca9fb'
  },
  box: {
    backgroundColor: '#f9d7fa',
    width: '90%', // Ajustei a largura para caber melhor na tela
    padding: 20, // Adicionei padding interno para espaçamento entre elementos
    borderRadius: 20, // Bordas mais arredondadas para um estilo mais moderno
    borderWidth: 3,
    borderColor: '#70027a',
    shadowOffset: {
      width: 5, // Sombras mais suaves
      height: 7
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 20, // Espaço adicional na parte inferior
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20 // Separação maior entre conteúdo e botões
  },
  title: {
    fontSize: 32, 
    fontWeight: 'bold',
    color: '#70027a',
    marginBottom: 10,
  },
  tipo: {
    fontSize: 80, 
    fontWeight: 'bold',
  },
  consumo: {
    fontSize: 24,
    color: '#70027a',
    marginTop: 10,
    textDecorationLine: 'underline'
  },
  buttonBox: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#70027a',
    borderRadius: 12,
    marginTop: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold'
  }
});
