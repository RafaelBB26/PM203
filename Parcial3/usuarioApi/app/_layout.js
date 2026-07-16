import { Stack } from "expo-router";
import { UsuariosProvider } from "../context/UsuariosContext";

export default function RootLayout() {
    return (
        <UsuariosProvider>
            <Stack screenOptions={{ headerShown: false }} />
        </UsuariosProvider>
    );

};
