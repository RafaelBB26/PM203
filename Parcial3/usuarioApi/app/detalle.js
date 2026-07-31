import { useState } from 'react';
import { Alert, Modal, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useUsuarios } from '../context/UsuariosContext';

export default function DetallesUsuario() {
  const { id, nombre, edad } = useLocalSearchParams();
  const [, setUsuarios] = useUsuarios();
  const [modalVisible, setModalVisible] = useState(false);
  const [eliminando, setEliminando] = useState(false);

  const eliminarUsuario = async () => {
    try {
      setEliminando(true);

      const respuesta = await fetch(`http://192.168.100.74:5001/v1/usuarios/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: 'Basic YWRtaW46MTIzNA==',
        },
      });

      if (!respuesta.ok) {
        throw new Error('No fue posible eliminar el usuario');
      }

      setUsuarios((usuarios) =>
        usuarios.filter((usuario) => String(usuario.id) !== String(id))
      );
      setModalVisible(false);
      Alert.alert('Éxito', 'El usuario fue eliminado correctamente.');
      router.replace('/consulta');
    } catch (error) {
      Alert.alert('Error', 'No fue posible eliminar el usuario.');
      console.log('Error al eliminar usuario:', error);
    } finally {
      setEliminando(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Detalles del usuario</Text>

      <View style={styles.tarjeta}>

        <Text style={styles.etiqueta}>Nombre</Text>
        <Text style={styles.valor}>{nombre}</Text>

        <View style={styles.linea} />

        <Text style={styles.etiqueta}>Edad</Text>
        <Text style={styles.valor}>{edad} años</Text>
      </View>

      <Pressable
        style={styles.botonActualizar}
        onPress={() => router.push({
          pathname: '/actualizar',
          params: { id, nombre, edad },
        })}
      >
        <Text style={styles.textoBoton}>Actualizar</Text>
      </Pressable>

      <Pressable
        style={styles.botonEliminar}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textoBoton}>Eliminar</Text>
      </Pressable>

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => !eliminando && setModalVisible(false)}
      >
        <View style={styles.fondoModal}>
          <View style={styles.contenidoModal}>
            <Text style={styles.tituloModal}>¿Eliminar usuario?</Text>
            <Text style={styles.mensajeModal}>
              Esta acción eliminará a {nombre} y no se puede deshacer.
            </Text>

            <View style={styles.botonesModal}>
              <Pressable
                style={styles.botonCancelar}
                onPress={() => setModalVisible(false)}
                disabled={eliminando}
              >
                <Text style={styles.textoCancelar}>Cancelar</Text>
              </Pressable>

              <Pressable
                style={[styles.botonConfirmar, eliminando && styles.botonDesactivado]}
                onPress={eliminarUsuario}
                disabled={eliminando}
              >
                <Text style={styles.textoBoton}>
                  {eliminando ? 'Eliminando...' : 'Sí, eliminar'}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 20,
  },
  titulo: {
    color: '#1F2937',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  tarjeta: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    elevation: 4,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
  etiqueta: {
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  valor: {
    color: '#1F2937',
    fontSize: 20,
    marginTop: 4,
  },
  linea: {
    backgroundColor: '#E5E7EB',
    height: 1,
    marginVertical: 16,
  },
  botonActualizar: {
    alignSelf: 'center',
    backgroundColor: '#2563EB',
    borderRadius: 8,
    marginTop: 24,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  botonEliminar: {
    alignSelf: 'center',
    backgroundColor: '#DC2626',
    borderRadius: 8,
    marginTop: 12,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  textoBoton: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  fondoModal: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  contenidoModal: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 24,
    width: '100%',
  },
  tituloModal: {
    color: '#1F2937',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  mensajeModal: {
    color: '#4B5563',
    fontSize: 16,
    lineHeight: 23,
    textAlign: 'center',
  },
  botonesModal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  botonCancelar: {
    borderColor: '#9CA3AF',
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 11,
  },
  textoCancelar: {
    color: '#4B5563',
    fontSize: 15,
    fontWeight: '600',
  },
  botonConfirmar: {
    backgroundColor: '#DC2626',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 11,
  },
  botonDesactivado: {
    backgroundColor: '#FCA5A5',
  },
});
