import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { PaperProvider } from "react-native-paper";
import Flashcard from "./components/Flashcard";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import { LinearGradient } from "expo-linear-gradient";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import StackNavigator from "./components/navigation/StackNavigator";
import { theme } from "./theme/theme";
import Animated, { Extrapolation } from "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";
try {
  // console.log(Animated.Extrapolate.CLAMP);
} catch (error) {
  console.warn(error); //  [TypeError: Cannot read property 'CLAMP' of undefined]
}
Animated.Extrapolate = Extrapolation;
// console.log(Animated.Extrapolate.CLAMP); // 'clamp'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <PaperProvider theme={theme}>
            <StackNavigator />
          </PaperProvider>
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
});
