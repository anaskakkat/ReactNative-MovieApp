import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/HomeScreen";
import MovieScreen from "./src/screens/MovieScreen";
import "react-native-gesture-handler";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen"; // Import expo-splash-screen

const Stack = createStackNavigator();

export default function App() {
  const [fontLoaded] = useFonts({
    Regular: require("./assets/fonts/NunitoSans_10pt-Regular.ttf"),
    Bold: require("./assets/fonts/NunitoSans_7pt-Bold.ttf"),
    Black: require("./assets/fonts/NunitoSans_10pt-Black.ttf"),
    ExtraBold: require("./assets/fonts/NunitoSans_10pt_Expanded-ExtraBold.ttf"),
  });

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Prevent the splash screen from auto-hiding
        await SplashScreen.preventAutoHideAsync();

        // Simulate a font loading or initialization process
        if (fontLoaded) {
          setAppIsReady(true);
        }
      } catch (e) {
        console.warn(e);
      }
    }

    prepare();
  }, [fontLoaded]);

  const onLayoutRootView = async () => {
    if (appIsReady) {
      // Hide the splash screen when the app is ready
      await SplashScreen.hideAsync();
    }
  };

  if (!appIsReady) {
    return null; // You can return a fallback component here
  }

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <Stack.Navigator>
        <Stack.Screen
          name="home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="movie"
          component={MovieScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
