import React, { useState, useContext } from "react";
import { View, StyleSheet, Alert } from "react-native";

import { Navbar } from "./components/Navbar";
import { THEME } from "./theme";
import { MainScreen } from "./screens/MainScreen";
import { TodoScreen } from "./screens/TodoScreen";
import { TodoContext } from "./context/todo/todoContext";
import { ScreenContext } from "./context/screen/screenContext";

export const MainLayout = () => {
  const {todos, addTodo, removeTodo, updateTodo} = useContext(TodoContext);
  const {todoId, changeScreen} = useContext(ScreenContext)

//   const removeTodo = id => {
//     const todo = todos.find(t => t.id === id);
//     Alert.alert(
//       "Delete item",
//       `Are you sure you want to delete "${todo.title}"?`,
//       [
//         {
//           text: "Cancel",
//           style: "cancel"
//         },
//         {
//           text: "Delete",
//           style: "destructive",
//           onPress: () => {
//             setTodoId(null);
//             setTodos(prev => prev.filter(todo => todo.id !== id));
//           }
//         }
//       ],
//       { cancelable: false }
//     );
//   };

  let content = (
    <MainScreen
      todos={todos}
      addTodo={addTodo}
      removeTodo={removeTodo}
      openTodo={changeScreen} 
      // openTodo={id => {
      //   setTodoId(id);
      // }} // второй вариант
    />
  );

  if (todoId) {
    const selectedTodo = todos.find(todo => todo.id === todoId);
    content = (
      <TodoScreen
        goBack={() => changeScreen(null)}
        todo={selectedTodo}
        onRemove={removeTodo}
        onSave={updateTodo}
      />
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Navbar title="Todo Application" />
      <View style={styles.container}>{content}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // тут мы говорим, чтобы блок занимал всю доступную ширину экрана
    backgroundColor: "white",
    paddingHorizontal: THEME.PADDING_HORIZONTAL,
    paddingVertical: 20
  }
});
