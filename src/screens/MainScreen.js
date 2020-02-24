import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  Text,
  Dimensions
} from "react-native";
import { AddTodo } from "../components/AddTodo";
import { Todo } from "../components/Todo";
import { THEME } from "../theme";

export const MainScreen = props => {
  const [deviceWidth, setdeviceWidth] = useState(
    Dimensions.get("window").width - THEME.PADDING_HORIZONTAL * 2
  );

  useEffect(() => {
    const update = () => {
      const width =
        Dimensions.get("window").width - THEME.PADDING_HORIZONTAL * 2;
      setdeviceWidth(width);
    };

    Dimensions.addEventListener("change", update);

    return () => {
      Dimensions.removeEventListener("change", update);
    }
  });

  let content = (
    <View style={{ width: deviceWidth }}>
      <FlatList // скрол с подгрузкой (более оптимизированный вариант скролинга)
        keyExtractor={item => item.id.toString()}
        data={props.todos}
        renderItem={({ item }) => (
          <Todo
            todo={item}
            onRemove={props.removeTodo}
            onOpen={props.openTodo}
          />
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
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
    alignItems: "flex-start",
    justifyContent: "flex-start"
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 8
    // resizeMode: 'contain'
  }
});
