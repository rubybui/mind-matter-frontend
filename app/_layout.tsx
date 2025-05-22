import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { AuthProvider } from "@/app/context/AuthContext";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="signin" options={{ title: "Sign In" }} />
        <Stack.Screen name="register" options={{ title: "Register" }} />
        <Stack.Screen name="about" options={{ title: "About Us" }} />
      </Stack>
    </AuthProvider>
  );
}
