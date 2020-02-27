import React, { useReducer, useContext } from "react";
import { Alert } from "react-native";

import { TodoContext } from "./todoContext";
import { todoReducer } from "./todoReducer";
import {
  ADD_TODO,
  REMOVE_TODO,
  UPDATE_TODO,
  SHOW_LOADER,
  HIDE_LOADER,
  SHOW_ERROR,
  CLEAR_ERROR,
  FETCH_TODOS
} from "./types";
import { ScreenContext } from "../screen/screenContext";

export const TodoState = ({ children }) => {
  const initialState = {
    todos: [],
    loading: false,
    error: null
  };

  const { changeScreen } = useContext(ScreenContext);
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const addTodo = async title => {
    const response = await fetch(
      "https://rn-todo-application.firebaseio.com/todos.json",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }) // JSON - глобальный метод, который применяется для того, что бы привести все к строке.
      }
    );

    const data = await response.json(); // .json() нужен для того, чтобы распарсить данные
    dispatch({ type: ADD_TODO, title, id: data.name });
  };

  const removeTodo = id => {
    const todo = state.todos.find(t => t.id === id);

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
          onPress: async () => {
            changeScreen(null);
            await fetch(
              `https://rn-todo-application.firebaseio.com/todos/${id}.json`,
              {
                method: "DELETE",
                headers: { "Content-Type": "application/json" }
              }
            );
            dispatch({ type: REMOVE_TODO, id });
          }
        }
      ],
      { cancelable: false }
    );
  };

  const fetchTodos = async () => {
    showLoader();
    clearError();
    try {
      const response = await fetch(
        "https://rn-todo-application.firebaseio.com/todos.json",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        }
      );
      const data = await response.json();
      // console.log("Data GET:", data);
      const todos = Object.keys(data).map(key => ({ ...data[key], id: key }));
      // (data) - это объект, Object.keys - функция
      // Object.keys(data) возвращаем тут массив ключей и через .map преобразовываем массив
      // (key ) - на каждой итерации получаем ключ объекта data
      // ({ }) - фигурные скобки тут нужны для того, чобы {} не считалось телом функции.
      // ...data[key], - это объект вида: { "title": "Ds", } (из БД)
      // id: key - добавляем поле id, который будет приравниватся key

      dispatch({ type: FETCH_TODOS, todos });
    } catch (e) {
      showError("Something went wrong .. Try to restart app!");
      console.log(e);
    } finally {
      hideLoader();
    }
  };

  const updateTodo = async (id, title) => {
    try {
      await fetch(
        `https://rn-todo-application.firebaseio.com/todos/${id}.json`,
        {
          method: "PATCH", // PATCH - изменяет часть элементов. Еще есть PUT, который  изменяет весь объект
          headers: { "Content-Type": "application/json" },
          body: await JSON.stringify({ title })
        }
      );
      dispatch({ type: UPDATE_TODO, id, title });
    } catch {
      showError("Something went wrong .. Try to restart app!");
      console.log(e);
    } finally {
      hideLoader();
    }
  };
  const showLoader = () => dispatch({ type: SHOW_LOADER });

  const hideLoader = () => dispatch({ type: HIDE_LOADER });

  const showError = error => dispatch({ type: SHOW_ERROR, error });

  const clearError = () => dispatch({ type: CLEAR_ERROR });

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        loading: state.loading,
        error: state.error,
        addTodo,
        removeTodo,
        updateTodo,
        fetchTodos
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
