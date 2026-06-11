//Perfil usando Desestructuración

import {Text, View, Button} from 'react-native';
import  React,{useState} from 'react';

    export const Perfil = ({nombre, carrera, materia, cuatrimestre}) =>{
        const [Mostrar, setMostrar] = useState(false);

        return(
            <View>
                <Text>{nombre}</Text>

                {/* Renderizado Condicional */}
                {Mostrar && 
                <> 
                <Text>{carrera}</Text>
                <Text>{materia}</Text>
                <Text>{cuatrimestre}</Text>
                 </>
                }

                <Button title  = "Mostrar perfil" onPress={() => setMostrar(!Mostrar)}/>
            </View>
        )
}

/* 
import {Text, View} from 'react-native';

export const Perfil = (props) => {
    return(
        <View>
            <Text>{props.nombre}</Text>
            <Text>{props.carrera}</Text>
            <Text>{props.materia}</Text>
            <Text>{props.cuatrimestre}</Text>
        </View>
    )
} */