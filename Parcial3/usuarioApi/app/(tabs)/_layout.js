import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "inicio", href: null }} />
      <Tabs.Screen
        name="alta"
        options={{
          title: "formularios",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-add" size={20} color={"red"} />
          ),
        }}
      />
      <Tabs.Screen
        name="consulta"
        options={{
          title: "listado",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={20} color={"green"} />
          ),
        }}
      />
    </Tabs>
  );
}
