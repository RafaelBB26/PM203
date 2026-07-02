//ZONA 1: Importaciones de componentes  y Archivos 
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image , Button} from 'react-native';
import React,{ useState } from 'react';
import TarjetasScreen from './TarjetasScreen';
import SafeAreaScreen from './SafeAreaScreen';
import PressableScreen from './PressableScreen';
import TextInputScreen from './TextInput Screen';
import FlatListScreen from './FlatListScreen';
import ActivityIndicatorScreen from './ActivityIndicatorScreen';
import ImageBackgroundScreen from './ImageBackgroundScreen';
import ModalScreen from './ModalScreen';


//ZONA 2: Main -  Hogar de los componentes 
export default function MenuScreen() {
    const [screen, setScreen] = useState('menu');

    switch(screen){ 
        case  'tarjetas':
            return <TarjetasScreen/>;
        case 'safeArea':
            return <SafeAreaScreen/>;
        case 'pressable':
            return <PressableScreen/>;
        case 'textInput':
            return <TextInputScreen/>;
        case 'flatList':
            return <FlatListScreen/>;
        case 'activityIndicator':
            return <ActivityIndicatorScreen/>;
        case 'imageBackground':
            return <ImageBackgroundScreen/>;
        case 'modal':
            return <ModalScreen/>;
        case 'menu':
            default:
                return (
                    <View style={styles.container}>

                        <Text>------------------ Menu de Practicas: -----------------</Text>

                        <Button onPress={ () => setScreen('tarjetas')} title ='Practica: Tarjetas'/>

                        <Button onPress={ () => setScreen('safeArea')} title ='Practica: Safe Area'/>

                        <Button onPress={ () => setScreen('pressable')} title ='Practica: Pressable'/>
                            
                        <Button onPress={ () => setScreen('textInput')} title ='Practica: Text Input'/>

                        <Button onPress={ () => setScreen('flatList')} title ='Practica: Flat List'/>
                            
                        <Button onPress={ () => setScreen('activityIndicator')} title ='Practica: Activity Indicator'/>

                        <Button onPress={ () => setScreen('imageBackground')} title ='Practica: Imagen Background'/>
                            
                        <Button onPress={ () => setScreen('modal')} title ='Practica: Modal'/>             

                        <StatusBar style="auto" />

                    </View>
                );
    }  
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