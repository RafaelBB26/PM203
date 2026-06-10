import {Button, Image,Text, View} from 'react-native';

export const Saludo2 = () => {
    return(
        <View>

        <Image source ={ require ('../assets/wave.png')}/>
        <Text> Soy un componente Compuesto</Text>
        <Button title="Hola 203"> </Button>

        </View>

    );    
}