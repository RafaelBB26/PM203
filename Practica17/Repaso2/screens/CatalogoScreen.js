import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  ImageBackground,
  ActivityIndicator,
  Alert,
} from "react-native";

export default function CatalogoScreen() {

  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [genero, setGenero] = useState("");

  const [libros, setLibros] = useState([]);

  const [cargando, setCargando] = useState(false);

  const agregarLibro = () => {

    if (!titulo || !autor || !genero) {
      Alert.alert(
        "Campos vacíos",
        "Completa todos los campos."
      );
      return;
    }

    setCargando(true);

    setTimeout(() => {

      const nuevoLibro = {
        id: Date.now().toString(),
        titulo,
        autor,
        genero,
      };

      setLibros([...libros, nuevoLibro]);

      setTitulo("");
      setAutor("");
      setGenero("");

      setCargando(false);

      Alert.alert(
        "Registro exitoso",
        "Libro agregado correctamente."
      );

    }, 4000);

  };

  return (

    <SafeAreaView style={styles.container}>

      <ImageBackground
        source={require("../assets/FondoP.png")}
        style={styles.fondo}
        resizeMode="cover"
        imageStyle={{ opacity: 0.9 }}

      >

        <View style={styles.header}>
            <View style={styles.fondoTitulo}>
                <Text style={styles.titulo}>
                    Registro de{"\n"}Libros Leídos
                </Text>
            </View>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Título del libro"
          value={titulo}
          onChangeText={setTitulo}
        />

        <TextInput
          style={styles.input}
          placeholder="Autor"
          value={autor}
          onChangeText={setAutor}
        />

        <TextInput
          style={styles.input}
          placeholder="Género"
          value={genero}
          onChangeText={setGenero}
        />

                <Pressable
          style={styles.boton}
          onPress={agregarLibro}
        >
          <Text style={styles.textoBoton}>
            Agregar Libro
          </Text>
        </Pressable>

        {cargando && (
          <View style={styles.cargando}>

            <ActivityIndicator
              size="large"
              color="#1976D2"
            />

            <Text style={styles.textoCargando}>
              Guardando libro...
            </Text>

          </View>
        )}

        <View style={{ flex: 1 }}>
            <View style={styles.fondoSubtitulo}>
                <Text style={styles.subtitulo}>
                    Libros Registrados
                </Text>
            </View>

          <FlatList
            
            data={libros}

            ListEmptyComponent={
              <Text style={styles.vacio}>
                No hay libros registrados.
              </Text>
            }

            keyExtractor={(item) => item.id}

            renderItem={({ item }) => (

              <View style={styles.tarjeta}>

                <Text style={styles.nombreLibro}>
                  {item.titulo}
                </Text>

                <Text style={styles.datosLibro}>
                  Autor: {item.autor}
                </Text>

                <Text style={styles.datosLibro}>
                  Género: {item.genero}
                </Text>

              </View>

            )}

          />

        </View>

      </ImageBackground>

    </SafeAreaView>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  fondo: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },

  header: {
  alignItems: "center",
  marginTop: 25,
  marginBottom: 20,
},

titulo: {
  fontSize: 24,
  fontWeight: "bold",
  color: "#FFFFFF",
  textAlign: "center",

  textShadowColor: "#000",
  textShadowOffset: {
    width: 2,
    height: 2,
  },
  textShadowRadius: 5,
},

  boton: {
    backgroundColor: "#1976D2",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },

  textoBoton: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },

  cargando: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },

  textoCargando: {
    marginTop: 10,
    fontSize: 16,
    color: "#1976D2",
    fontWeight: "bold",
  },

vacio: {
  color: "#FFFFFF",
  fontSize: 18,
  textAlign: "center",
  marginTop: 30,
  fontWeight: "bold",

  textShadowColor: "#000",
  textShadowOffset: {
    width: 1,
    height: 1,
  },
  textShadowRadius: 4,
},

  tarjeta: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 5,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },

  nombreLibro: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 5,
  },

  datosLibro: {
    fontSize: 16,
    color: "#333333",
    marginBottom: 3,
  },

subtitulo: {
  color: "#FFFFFF",
  fontSize: 20,
  fontWeight: "bold",
  marginBottom: 8,

  textShadowColor: "#000",
  textShadowOffset: {
    width: 2,
    height: 2,
  },
  textShadowRadius: 5,
},

input: {
  backgroundColor: "#FFFFFF",
  borderWidth: 1,
  borderColor: "#DDDDDD",
  borderRadius: 10,
  padding: 12,
  fontSize: 16,
  marginBottom: 15,

  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.15,
  shadowRadius: 3,
  elevation: 3,
},

fondoTitulo: {
  backgroundColor: "rgba(0,0,0,0.45)",
  padding: 10,
  borderRadius: 10,
},

fondoSubtitulo: {
  backgroundColor: "rgba(0,0,0,0.45)",
  padding: 8,
  borderRadius: 10,
  marginBottom: 10,
  alignSelf: "center",
},

});
