import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { AuthProvider } from "./context/AuthContext";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />

      </Stack>
    </AuthProvider>
  );
}
