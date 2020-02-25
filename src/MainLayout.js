import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";

import { Navbar } from "./components/Navbar";
import { THEME } from "./theme";
import { MainScreen } from "./screens/MainScreen";
import { TodoScreen } from "./screens/TodoScreen";
import { ScreenContext } from "./context/screen/screenContext";

export const MainLayout = () => {
  const { todoId } = useContext(ScreenContext);

  return (
    <View style={styles.wrapper}>
      <Navbar title="Todo Application" />
      <View style={styles.container}>
        {todoId ? <TodoScreen /> : <MainScreen />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // тут мы говорим, чтобы блок занимал всю доступную ширину экрана
    backgroundColor: "#f1f1f1",
    paddingHorizontal: THEME.PADDING_HORIZONTAL,
    paddingVertical: 20,
    // alignItems: "center",
    // justifyContent: "center",
  },
  wrapper: {
    flex: 1
  }
});
