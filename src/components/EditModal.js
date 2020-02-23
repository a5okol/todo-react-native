import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Modal,
  Alert
} from "react-native";
import { THEME } from "../theme";

export const EditModal = ({ visible, onCancel, value, onSave }) => {
  const [title, setTitlse] = useState(value);

  const saveHandler = () => {
    if (title.trim().length < 3) {
      Alert.alert(
        'Error! ',
        `You need to enter more than 3 symbols. Now is ${
          title.trim().length
        } symbol.`
      );
    } else {
      onSave(title);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={styles.wrap}>
        <TextInput
          value={title}
          onChangeText={setTitlse}
          style={styles.input}
          placeholder="Input new value"
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={500}
        />
        <View style={styles.buttons}>
          <Button
            title="Cancel"
            onPress={onCancel}
            color={THEME.DANGER_COLOR}
          />
          <Button title="Save" onPress={saveHandler} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  input: {
    padding: 10,
    borderBottomColor: THEME.MAIN_COLOR,
    borderBottomWidth: 2,
    width: "80%"
  },
  buttons: {
    width: "100%",
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-around"
  }
});
