import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
    View,
    ScrollView,
    Text,
    TextInput,
    Alert,
    Button,
    StyleSheet,
    Platform,
} from "react-native";

if (Platform.OS === "web") {
    Alert.alert = (titular, mensaje, boton) => {
        const list = Array.isArray(mensaje) ? mensaje : boton;
        if (list) {
            if (window.confirm(titular)) list.find((b) => b.onPress)?.onPress();
        } else {
            window.alert(titular + (mensaje ? "\n" + mensaje : ""));
        }
    };
}

export default function TextInputScreen() {
    const [nombre, SetNombre] = useState();
    const [correo, SetCorreo] = useState();
    const [contraseña, SetContraseña] = useState();
    const [numero, SetNumero] = useState();
    const [bio, SetBio] = useState();

    const registro = () => {
        if (!nombre || !correo || !contraseña || !numero) {
            Alert.alert("Faltan datos", "Completa los campos");
            return;
        }

        if (!correo.includes("@") || !correo.includes(".com")) {
            Alert.alert("Correo invalido", "El correo debe contener @ y .com");
            return;
        }

        if (!numero.match(/^[0-9+ ]+$/)) {
            Alert.alert("Número invalido", "El número debe contener solo números");
            SetNumero("");
            return;
        }

        Alert.alert(`Registrar ${nombre}`, [
            {
                text: "No",
                style: "calcel",
            },
            {
                text: "Si",
                onPress: () => {
                    Alert.alert("Exito", `Usuario registrado con exito`);
                },
            },
        ]);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.input}>
                <Text style={styles.Titulo}>Formulario de registro de usuario</Text>
                {/* nombre del usuario */}
                <TextInput
                    style={styles.input}
                    placeholder="Ingrese su nombre"
                    placeholderTextColor="black"
                    autoCapitalize="words"
                    value={nombre}
                    onChangeText={(texto) => SetNombre(texto)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Ingrese tu correo electronico"
                    placeholderTextColor="black"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={correo}
                    onChangeText={(texto) => SetCorreo(texto)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Ingrese tu contraseña minimo 6 caracteres"
                    placeholderTextColor="black"
                    secureTextEntry={true}
                    value={contraseña}
                    onChangeText={(texto) => SetContraseña(texto)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Ingresa tu número de teléfono "
                    placeholderTextColor="black"
                    keyboardType="number-pad"
                    max
                    maxLength={12}
                    value={numero}
                    onChangeText={(texto) => SetNumero(texto)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Sobre ti (opcional)"
                    placeholderTextColor="black"
                    multiline={true}
                    maxLength={20}
                    value={bio}
                    onChangeText={(texto) => SetBio(texto)}
                />

                <Button title="Registrar" color="red" onPress={registro} />

                <StatusBar style="auto" />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: "z#fff",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: 24,
        gap: 12,
    },
    Titulo: {
        padding: 30,
        fontSize: 20,
        alignContent: "stretch",
    },
    input: {
        borderWidth: 3,
        borderColor: "#e6e6e6",
        borderRadius: 3,
        padding: 10,
        fontSize: 15,
        backgroundColor: "#ffffff",
    },
});