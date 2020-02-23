import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

export const Todo = props => {

    // const longPressHandler = () => {
    //     onRemove (todo.id)
    // }

    return (
    <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => props.onOpen(props.todo.id)}

        // onLongPress={() => props.onRemove(props.todo.id)} // 1. Найболее распространный вариант вызова функции
        // onLongPress={longPressHandler} // 2. Менее популярный вариант.
        onLongPress={props.onRemove.bind(null, props.todo.id)} // 3. Метод bind вернет нам функцию
    >
        <View style={styles.todo}>
            <Text>{props.todo.title}</Text>
        </View>
    </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    todo: {
        flexDirection:'row',
        alignItems: 'center',
        padding: 15,
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 5,
        marginBottom: 5,
    },
    
})