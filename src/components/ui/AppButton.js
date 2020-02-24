import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { AppText } from "./AppText";
import { THEME } from "../../theme";

export const AppButton = ({ children, onPress, color = THEME.MAIN_COLOR, style }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View
        style={{ ...styles.button, backgroundColor: color, ...style }}
      >
        <AppText style={styles.text}>{children}</AppText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    color: "white",
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    color: "white"
  }
});