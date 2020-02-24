import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Alert,
  Image,
  TouchableOpacity,
  Keyboard
} from "react-native";
import { THEME } from "../theme";

export const AddTodo = props => {
  const [value, setValue] = useState("");

  const pressHandler = () => {
    if (value.trim()) {
      props.onSubmit(value);
      setValue("");
      Keyboard.dismiss() // скрываем клавиатуру после добавления заметки
    } else {
      Alert.alert("Input can't be empty!");
    }
  };

  return (
    <View style={styles.addtodo}>
      <TextInput
        style={styles.input}
        onChangeText={text => setValue(text)}
        // можно еще так: onChangeText={setValue}
        value={value}
        placeholder="Enter the task you want to do"
        // autoCorrect={false} // убираем авто-имправление
        // autoCapitalize='none' // убираем заглавную с большой
      />

      <View style={styles.addButtom}>
        <TouchableOpacity activeOpacity={0.7} onPress={pressHandler}>
          <Image
            source={require("../../assets/add.png")}
            style={styles.addImageButtom}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  addtodo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
    marginTop: -10
  },
  input: {
    width: "75%",
    borderStyle: "solid",
    borderBottomWidth: 2,
    borderColor: THEME.MAIN_COLOR,
    backgroundColor: "#ececec",
    borderRadius: 2,
    padding: 10,
    height: 55,
    shadowColor: "#000",
    shadowRadius: 1,
    shadowOpacity: 0.2,
    shadowOffset: { width: 1, height: 1 },
    elevation: 2 // shadow for android
  },
  //   addButtom: {
  //     // backgroundColor: THEME.MAIN_COLOR,
  //     width: "20%",
  //     // marginLeft: -30,
  //     height: 40
  //     // color: "#000",
  //     // fontSize: 222,
  //     // borderColor: THEME.MAIN_COLOR,
  //     // borderRadius: 4
  //   },
  addImageButtom: {
    width: 100,
    // marginTop: -10,
    height: 90,
    resizeMode: "contain"
  }
});
