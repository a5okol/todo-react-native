import React from "react";
import { StyleSheet, View, FlatList, Image, Text } from "react-native";
import { AddTodo } from "../components/AddTodo";
import { Todo } from "../components/Todo";

export const MainScreen = props => {
  let content = (
    <FlatList // скрол с подгрузкой (более оптимизированный вариант скролинга)
      keyExtractor={item => item.id.toString()}
      data={props.todos}
      renderItem={({ item }) => (
        <Todo todo={item} onRemove={props.removeTodo} onOpen={props.openTodo} />
      )}
      keyExtractor={item => item.id.toString()}
    />
  );

  if (props.todos.length === 0) {
    content = (
      <View style={styles.imgWrap}>
        <Image
          style={styles.image}
          source={require("../../assets/clipboard.png")}
        />
        <Text style={styles.textWrap}>Enter your first note</Text>
      </View>
    );
  }

  return (
    <View>
      <AddTodo onSubmit={props.addTodo} />
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  imgWrap: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    height: "80%"
  },
  textWrap: {
    color: "grey",
    // color: "#fff",
    alignItems: "flex-start",
    justifyContent: "flex-start"
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 8,
    // resizeMode: 'contain'
  }
});
