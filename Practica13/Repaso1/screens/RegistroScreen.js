import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  ScrollView,
  Switch
} from 'react-native';

export default function RegistroScreen() {

  const [nombre, setNombre] = useState("");
  const [carrera, setCarrera] = useState("");
  const [semestre, setSemestre] = useState("");

  const [taller, setTaller] = useState(false);
  const [constancia, setConstancia] = useState(false);
  const [deporte, setDeporte] = useState(false);

  const Registro = () => {

    if (!nombre || !carrera || !semestre) {
      Alert.alert(
        "Faltan datos",
        "Completa todos los campos."
      );
      return;
    }

    if (!/^[0-9]+$/.test(semestre)) {
      Alert.alert(
        "Número inválido",
        "El semestre debe contener solo números."
      );
      setSemestre("");
      return;
    }

    Alert.alert(
      "Registro enviado",
      `Nombre: ${nombre}
Carrera: ${carrera}
Semestre: ${semestre}
Taller: ${taller ? "Sí" : "No"}
Constancia: ${constancia ? "Sí" : "No"}
Deportes: ${deporte ? "Sí" : "No"}`
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>

      <ScrollView style={styles.container}>

        <Text style={styles.titulo}>
          Registro de Evento Universitario
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Nombre completo"
          value={nombre}
          onChangeText={setNombre}
        />

        <TextInput
          style={styles.input}
          placeholder="Carrera"
          value={carrera}
          onChangeText={setCarrera}
        />

        <TextInput
          style={styles.input}
          placeholder="Semestre"
          keyboardType="numeric"
          value={semestre}
          onChangeText={setSemestre}
        />

        <Text style={styles.subtitulo}>
          Opciones
        </Text>

        <View style={styles.switchContainer}>
          <Text>¿Asistirá al taller?</Text>
          <Switch
            value={taller}
            onValueChange={setTaller}
          />
        </View>

        <View style={styles.switchContainer}>
          <Text>¿Requiere constancia?</Text>
          <Switch
            value={constancia}
            onValueChange={setConstancia}
          />
        </View>

        <View style={styles.switchContainer}>
          <Text>¿Participará en actividades deportivas?</Text>
          <Switch
            value={deporte}
            onValueChange={setDeporte}
          />
        </View>

        <Button
          title="Enviar Registro"
          onPress={Registro}
        />

      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFFFFF",
  },

  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 25,
  },

  subtitulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    marginTop: 15,
  },

  input: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },

  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  }

});