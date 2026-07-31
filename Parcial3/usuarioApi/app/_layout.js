import { Stack } from "expo-router";
import { UsuariosProvider } from "../context/UsuariosContext";

export default function RootLayout() {
    return (
        <UsuariosProvider>
            <Stack initialRouteName="(tabs)">
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen
                    name="detalle"
                    options={{ title: "Detalles del usuario" }}
                />
                <Stack.Screen
                    name="actualizar"
                    options={{ title: "Actualizar usuario" }}
                />
            </Stack>
        </UsuariosProvider>
    );

};
