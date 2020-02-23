import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { THEME } from "../theme";
import { AppCard } from "../components/ui/AppCard";

export const TodoScreen = ({ todo, onRemove, goBack }) => {
  return (
    <View>
      <AppCard styles={styles.card}>
        <Text style={styles.title}>{todo.title}</Text>
        <Button title="Edit" />
      </AppCard>
      <View style={styles.buttons}>
        <View style={styles.button}>
          <Button title="Back" color={THEME.GREY_COLOR} onPress={goBack} />
        </View>
        <View style={styles.button}>
          <Button
            title="Delete"
            color={THEME.DANGER_COLOR}
            onPress={() => onRemove(todo.id)}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20
  },
  card: {
    // marginBottom: 15,
    padding: 22
  },
  button: {
    width: "40%"
  },
  title: {
    fontSize: 22
  }
});
