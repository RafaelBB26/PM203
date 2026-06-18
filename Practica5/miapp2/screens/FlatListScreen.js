//ZONA 1: Importaciones de componentes  y Archivos 
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';


//ZONA 2: Main -  Hogar de los componentes 
export default function FlatListScreen() {
  return (
    <View style={styles.container}>

        <Text>------------------ Aqui va la Practica de Aaron -----------------</Text>

      <StatusBar style="auto" />

    </View>
  );
}

//ZONA 3: Estilos y Posicionamiento 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },

});