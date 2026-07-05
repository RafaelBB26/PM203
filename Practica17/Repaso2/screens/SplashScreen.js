import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Text
} from "react-native";

export default function SplashScreen() {

  return (

    <SafeAreaView style={styles.container}>

      <View style={styles.contenido}>

        <Image
          source={require("../assets/libro.png")}
          style={styles.logo}
        />

        <Text style={styles.titulo}>
          Registro de Libros Leídos
        </Text>

        <Text style={styles.subtitulo}>
          Bienvenido
        </Text>

      </View>

    </SafeAreaView>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },

  contenido: {
    justifyContent: "center",
    alignItems: "center",
  },

  logo: {
    width: 180,
    height: 180,
    resizeMode: "contain",
    marginBottom: 20,
  },

  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },

  subtitulo: {
    fontSize: 18,
    color: "gray",
  },

});