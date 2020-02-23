import React, {useState} from 'react'
import {View, Text, StyleSheet, TextInput, Button, Alert} from 'react-native'


export const AddTodo = props => {
    const[ value, setValue ] = useState('')

    const pressHandler = () => {
        if (value.trim()) {
            props.onSubmit(value)
            setValue('')
        } else {
            Alert.alert('Input can\'t be empty!')
        }
    }

    return (
    <View style={styles.addtodo}>
        <TextInput 
            style={styles.input}
            onChangeText={text => setValue(text)}
            // можно еще так: onChangeText={setValue}
            value={value}
            placeholder='Enter the task you want to do'
            // autoCorrect={false} // убираем авто-имправление
            // autoCapitalize='none' // убираем заглавную с большой
        />
        <Button title='Добавить' onPress={pressHandler} />
    </View>
    )
}

const styles = StyleSheet.create({
    addtodo: {
        flexDirection:'row',
        justifyContent: 'space-between',
        // justifyContent: 'space-around'
        alignItems: 'center',
        marginBottom: 10,
    },
    input: {
        width: '70%',
        borderStyle: "solid",
        borderBottomWidth: 2,
        borderColor: '#ef4706',
        backgroundColor: 'gainsboro',
        borderRadius: 2,
        padding: 10,
    }
})