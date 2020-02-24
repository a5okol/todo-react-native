import React, { useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import * as Font from "expo-font";
import { AppLoading } from "expo";

import { Navbar } from "./src/components/Navbar";
import { MainScreen } from "./src/screens/MainScreen";
import { TodoScreen } from "./src/screens/TodoScreen";
import { THEME } from "./src/theme";

async function loadApplication() {
  await Font.loadAsync({
    "roboto-regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "roboto-bold": require("./assets/fonts/Roboto-Bold.ttf")
  });
}

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [todoId, setTodoId] = useState(null);
  const [todos, setTodos] = useState([
    // { id: "1", title: "Пахать очень плодотворно" },
  ]); // todos - state, useState - функция, которая позволяет изменить state

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadApplication}
        onError={err => console.log(err)}
        onFinish={() => setIsReady(true)}
      />
    );
  }

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
      todos={todos}
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

      {/* 

      <View style={styles.container}>
        <Text style={{color: '#fff'}}>This is</Text>
      </View>
      <View style={styles.seconBlock}>
        <Text>New App</Text>
      </View> 

      */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // тут мы говорим, чтобы блок занимал всю доступную ширину экрана
    backgroundColor: "white",
    paddingHorizontal: THEME.PADDING_HORIZONTAL,
    paddingVertical: 20
  },
  seconBlock: {
    backgroundColor: "yellow",
    flex: 1,
    flexDirection: "column",
    // borderRadius: 3,
    // marginTop: 10,
    // width: 100,
    // height: 30,
    alignItems: "center",
    color: "#fff",
    justifyContent: "center",
    alignItems: "flex-start",
    justifyContent: "flex-end"
  }
});
