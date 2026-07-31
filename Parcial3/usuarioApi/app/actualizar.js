import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useUsuarios } from '../context/UsuariosContext';

export default function ActualizarUsuario() {
  const { id, nombre: nombreInicial, edad: edadInicial } = useLocalSearchParams();
  const [, setUsuarios] = useUsuarios();
  const [nombre, setNombre] = useState(nombreInicial || '');
  const [edad, setEdad] = useState(edadInicial || '');
  const [guardando, setGuardando] = useState(false);

  const guardarCambios = async () => {
    const nombreLimpio = nombre.trim();
    const edadNumero = Number(edad);

    if (!nombreLimpio || !edad || Number.isNaN(edadNumero)) {
      Alert.alert('Datos inválidos', 'Escribe un nombre y una edad válida.');
      return;
    }

    try {
      setGuardando(true);

      const respuesta = await fetch(`http://192.168.100.74:5001/v1/usuarios/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic YWRtaW46MTIzNA==',
        },
        body: JSON.stringify({ nombre: nombreLimpio, edad: edadNumero }),
      });

      if (!respuesta.ok) {
        throw new Error('No fue posible actualizar el usuario');
      }

      setUsuarios((usuarios) =>
        usuarios.map((usuario) =>
          String(usuario.id) === String(id)
            ? { ...usuario, nombre: nombreLimpio, edad: edadNumero }
            : usuario
        )
      );

      Alert.alert('Éxito', 'Los cambios se guardaron correctamente.');
      router.replace({
        pathname: '/detalle',
        params: { id, nombre: nombreLimpio, edad: String(edadNumero) },
      });
    } catch (error) {
      Alert.alert('Error', 'No fue posible guardar los cambios.');
      console.log('Error al actualizar usuario:', error);
    } finally {
      setGuardando(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tarjeta}>
        <Text style={styles.titulo}>Actualizar usuario</Text>

        <Text style={styles.etiqueta}>Nombre</Text>
        <TextInput
          style={styles.input}
          value={nombre}
          onChangeText={setNombre}
          placeholder="Nombre del usuario"
        />

        <Text style={styles.etiqueta}>Edad</Text>
        <TextInput
          style={styles.input}
          value={edad}
          onChangeText={setEdad}
          keyboardType="numeric"
          placeholder="Edad"
        />

        <Pressable
          style={[styles.boton, guardando && styles.botonDesactivado]}
          onPress={guardarCambios}
          disabled={guardando}
        >
          {guardando ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.textoBoton}>Guardar cambios</Text>
          )}
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  tarjeta: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    elevation: 5,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    width: '100%',
  },
  titulo: {
    color: '#1F2937',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
  },
  etiqueta: {
    color: '#4B5563',
    fontSize: 16,
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderColor: '#D1D5DB',
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 16,
    height: 50,
    marginBottom: 18,
    paddingHorizontal: 15,
  },
  boton: {
    alignItems: 'center',
    backgroundColor: '#2563EB',
    borderRadius: 10,
    marginTop: 8,
    paddingVertical: 15,
  },
  botonDesactivado: {
    backgroundColor: '#93C5FD',
  },
  textoBoton: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },
});
