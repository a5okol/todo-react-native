import React, { useState, useContext } from "react";
import { View, StyleSheet, Alert } from "react-native";

import { Navbar } from "./components/Navbar";
import { THEME } from "./theme";
import { MainScreen } from "./screens/MainScreen";
import { TodoScreen } from "./screens/TodoScreen";
import { TodoContext } from "./context/todo/todoContext";

export const MainLayout = () => {
  const todoContext = useContext(TodoContext);
  const [todoId, setTodoId] = useState(null);
  const [todos, setTodos] = useState([]); // todos - state, useState - функция, которая позволяет изменить state

  const addTodo = title => {
    // const newTodo = {
    //   id: Date.now().toString(),
    //   title: title
    // }

    // // setTodos(todos.concat([ newTodo ]))
    // setTodos((prevTodos) => {
    //   return [
    //     ...prevTodos, // ...prevTodos - с помощью оператора спред (...) разварачиваем предодущий стейт, получая скланированный предодущий state
    //     newTodo
    //   ]
    // })

    // Более короткий вариант того, что выше:
    setTodos(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        title
      }
    ]);
  };

  const updateTodo = (id, title) => {
    setTodos(prev =>
      prev.map(todo => {
        if (todo.id === id) {
          todo.title = title;
        }
        return todo;
      })
    );
  };

  const removeTodo = id => {
    const todo = todos.find(t => t.id === id);
    Alert.alert(
      "Delete item",
      `Are you sure you want to delete "${todo.title}"?`,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setTodoId(null);
            setTodos(prev => prev.filter(todo => todo.id !== id));
          }
        }
      ],
      { cancelable: false }
    );
  };

  let content = (
    <MainScreen
      todos={todoContext.todos}
      addTodo={addTodo}
      removeTodo={removeTodo}
      openTodo={id => {
        setTodoId(id);
      }}
      // openTodo={setTodoId} // второй вариант
    />
  );

  if (todoId) {
    const selectedTodo = todos.find(todo => todo.id === todoId);
    content = (
      <TodoScreen
        goBack={() => setTodoId(null)}
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
