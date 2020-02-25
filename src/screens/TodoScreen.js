import React, { useState, useContext } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { AntDesign, Foundation, Feather } from "@expo/vector-icons";

import { THEME } from "../theme";
import { AppCard } from "../components/ui/AppCard";
import { EditModal } from "../components/EditModal";
import { AppText } from "../components/ui/AppText";
import { AppButton } from "../components/ui/AppButton";
import { TodoContext } from "../context/todo/todoContext";
import { ScreenContext } from "../context/screen/screenContext";

export const TodoScreen = () => {
  const { todos, updateTodo, removeTodo } = useContext(TodoContext);
  const { todoId, changeScreen } = useContext(ScreenContext);
  const [modal, setModal] = useState(false);

  const todo = todos.find(t => t.id === todoId);

  const saveHandler = title => {
    updateTodo(todo.id, title);
    setModal(false);
  };

  return (
    <View>
      <EditModal
        value={todo.title}
        visible={modal}
        onCancel={() => setModal(false)}
        onSave={saveHandler}
      />

      <AppCard styles={styles.card}>
        <AppText style={styles.title}>{todo.title}</AppText>
        <AppButton
          onPress={() => setModal(true)}
          style={{ backgroundColor: "white" }}
        >
          <Feather style={styles.editButtom} name="edit" size={25} />
        </AppButton>
      </AppCard>
      <View style={styles.buttons}>
        <View style={styles.button}>
          <AntDesign.Button
            name="back"
            style={styles.backButtom}
            color={THEME.GREY_COLOR}
            onPress={() => changeScreen(null)}
          >
            Back
          </AntDesign.Button>
        </View>
        <View style={styles.button}>
          <Foundation.Button
            name="page-delete"
            style={styles.backButtom}
            color={THEME.DANGER_COLOR}
            onPress={() => removeTodo(todo.id)}
          >
            Delete
          </Foundation.Button>
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
    padding: 15
  },
  editButtom: {
    color: THEME.MAIN_COLOR
  },
  button: {
    width: Dimensions.get("window").width / 3,
    width: Dimensions.get("window").width > 400 ? 150 : 100,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontSize: 22,
    width: "84%"
  },
  backButtom: {
    backgroundColor: "white",
    color: THEME.GREY_COLOR
  }
});
