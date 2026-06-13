//Perfil usando Desestructuración

import {Text, View, Button, StyleSheet} from 'react-native';
import  React,{useState} from 'react';

    export const Perfil = ({nombre, carrera, materia, cuatrimestre}) =>{
        const [Mostrar, setMostrar] = useState(false);

        return(
            <View style={styles.tarjeta}>
                <Text style ={styles.nombre}>{nombre}</Text>

                {/* Renderizado Condicional */}
                {Mostrar && 
                <> 
                <Text style ={styles.carrera} >{carrera}</Text>
                <Text style ={styles.otroTexto} >{materia}</Text>
                <Text style ={styles.otroTexto} >{cuatrimestre}</Text>
                 </>
                }

                <Button title  = "Mostrar perfil" onPress={() => setMostrar(!Mostrar)}/>
            </View>
        )
}
const styles = StyleSheet.create({
    nombre:{
        fontSize: 24,
        fontWeight: 600,
        textTrransform: 'uppercase',

    },
    carrera:{
        fontSize: 18,
        color: 'blue',
        fontFamily: 'Roboto',
    },
    otroTexto:{
        fontSize: 12,
        fontFamily: 'courier',
        fontStyle: 'italic',
    },
    tarjeta:{
        borderWidth: 2,
        padding:25,
        margin: 15,
    },

})
