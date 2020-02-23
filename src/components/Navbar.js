import React from 'react'
import {View, Text, StyleSheet, TextInput} from 'react-native'
import { THEME } from '../theme'


export const Navbar = (props) => {
    return (
    <View style={styles.navbar}>
        <Text style={styles.text}>{props.title}</Text>
        {/* <TextInput/> */}
    </View>
    )
}

const styles = StyleSheet.create({
    navbar: {
        height: 70,
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: THEME.MAIN_COLOR,
        paddingBottom: 10,
    },
    text: {
        color: 'white',
        fontWeight: '600',
        fontSize: 20,
    }
})