import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const navigation = useNavigation();
  const [quilometragem, setQuilometragem] = useState("");
  const [litros, setLitros] = useState("");
  const [loading, setLoading] = useState(false);

  const validarEntradas = () => {
    if (!quilometragem || isNaN(quilometragem) || !litros || isNaN(litros)) {
      Alert.alert("Erro", "Por favor, insira valores numéricos válidos para quilometragem e litros.");
      return false;
    }
    return true;
  };

  const IrParaConsumo = () => {
    if (!validarEntradas()) {
      return;
    }

    setLoading(true); 

    setTimeout(() => {
      setLoading(false); 
      navigation.navigate("Consumo", {
        quilometragem: parseFloat(quilometragem), 
        litros: parseFloat(litros), 
      });
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../assets/logo.png')} />

      <Text style={styles.title}>Informe o Consumo de Gasolina:</Text>

      <TextInput 
        value={quilometragem}
        onChangeText={setQuilometragem}
        placeholder="Quilometragem (Km)"
        style={styles.input}
        keyboardType="numeric" 
      />

      <TextInput 
        value={litros}
        onChangeText={setLitros}
        placeholder="Gasolina (Litros)"
        style={styles.input}
        keyboardType="numeric" 
      />

      <TouchableOpacity style={styles.button} onPress={IrParaConsumo} disabled={loading}>
        <Text style={styles.buttonText}>Executar</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator style={styles.loading} size="large" color={"darkred"} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0adf7',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  image: {
    width: 240,
    height: 240,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    fontStyle: 'italic',
    color: '#6d059c',
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#F3F3FF',
    fontWeight: '600',
    paddingLeft: 20,
    borderWidth: 1,
    width: "100%",
    height: 50,
    borderRadius: 12,
    borderColor: 'grey',
    marginVertical: 10,
    color: "#b00ba8",
    fontSize: 16,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.8,
    elevation: 2,
  },
  button: {
    borderWidth: 1,
    padding: 15,
    borderRadius: 15,
    width: "100%",
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#70027a',
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.8,
    elevation: 3,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: '#fff',
  },
  loading: {
    marginTop: 20,
    transform: [{ scale: 1.5 }],
  },
});
