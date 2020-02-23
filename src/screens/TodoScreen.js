import React from 'react'
import { StyleSheet, View, Text, Button} from 'react-native'
import { THEME } from '../theme'
 
export const TodoScreen = props => {
    return (
    <View>
        <Text>{ props.todo.title }</Text>
        <View style={styles.buttons}>
            <View style={styles.button}>
                <Button title='Back' color={THEME.GREY_COLOR} onPress={props.goBack} />
            </View>
            <View style={styles.button}>
                <Button title='Delete' color={THEME.DANGER_COLOR}onPress={props.goBack} />
            </View>
        </View>
    </View>
    )}

const styles = StyleSheet.create({
    buttons: {
        flexDirection: 'row',
        justifyContent:  'space-between',
        marginTop: 20,
    },
    button: {
        width: '40%'
    }
    
})