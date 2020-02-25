import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { THEME } from "../theme";
import { AppText } from "./ui/AppText";

export const Navbar = props => {
  return (
    <View
      style={{
        ...styles.navbar,
        ...Platform.select({
          ios: styles.navbarIOS,
          android: styles.navbarAndroid
        })
      }}
    >
      <AppText style={styles.text}>{props.title}</AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    height: 70,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 10
  },
  navbarAndroid: {
    borderBottomColor: THEME.MAIN_COLOR,
    borderBottomWidth: 1
  },
  navbarIOS: {
    backgroundColor: THEME.MAIN_COLOR
  },
  text: {
    color: Platform.OS === "ios" ? THEME.SECOND_MAIN_COLOR :  THEME.MAIN_COLOR,
    fontWeight: "600",
    fontSize: 20,
    shadowColor: "#000",
    shadowRadius: 2,
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 2 },
    elevation: 7 // shadow for android
  }
});
