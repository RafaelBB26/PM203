//ZONA 1: Importaciones de componentes  y Archivos 
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import {Saludo} from './Components/Saludo';
import { Saludo2 } from './Components/Saludo2';
import { Perfil } from './Components/Perfil';


//ZONA 2: Main -  Hogar de los componentes 
export default function App() {
  return (
    <View style={styles.container}>

      <Text>------------------ perfil -----------------</Text>
      <View style ={styles.container}>
      

      <Perfil estiloExt={styles.tarjetaRoja}nombre="Rafael Baltazar Bonifacio" carrera="Ingeniería en Sistemas Computacionales" materia="Programación Móvil" cuatrimestre="9"> </Perfil>
      <Perfil 
      estiloExt={styles.tarjetaVerda}
      nombre="Rafael Baltazar Bonifacio" 
      carrera="Ingeniería en Sistemas Computacionales" 
      materia="Programación Móvil" 
      cuatrimestre="9"/>

      <Perfil estiloExt={styles.tarjetaRoja}nombre="Rafael Baltazar Bonifacio" carrera="Ingeniería en Sistemas Computacionales" materia="Programación Móvil" cuatrimestre="9"> </Perfil>

      </View>
      <StatusBar style="auto" />
    </View>
  );
}

//ZONA 3: Estilos y Posicionamiento 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },

  tarjetaRoja:{ backgroundColor: '#FF6B6B'},
  tarjetaVerda:{backgroundColor: '#6BCB77'},
});