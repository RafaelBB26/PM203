//ZONA 1: Importaciones de componentes  y Archivos 
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import {Saludo} from './Components/Saludo';
import { Saludo2 } from './Components/Saludo2';

//ZONA 2: Main -  Hogar de los componentes 
export default function App() {
  return (
    <View style={styles.container}>
      
            <Text>------------------ Coponente Nativo-----------------</Text>

      <Image source ={ require ('../assets/wave.png')}/>

      <Text>Hola Mundo React Native</Text>

      <Text>------------------ Coponentes Propio Simple-----------------</Text>
      <Saludo> </Saludo>

      <Text>------------------ Coponentes Propio Compuesto ------------------ </Text>
      <Saludo2> </Saludo2>

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
  },
});
