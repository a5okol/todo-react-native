import React from 'react'
import { Stylesheet, View, FlatList } from 'react-native'
import { AddTodo } from '../components/AddTodo'
import { Todo } from '../components/Todo'


export const MainScreen = props => {
    return (
    <View>
        <AddTodo onSubmit={props.addTodo}/>

            {/* 

            <ScrollView>
            { todos.map(todo => (
                <Todo todo={todo} key={todo.id} />
            ))}
            </ScrollView> 

            */}

            <FlatList // скрол с подгрузкой (более оптимизированный вариант скролинга)
                keyExtractor={item => item.id.toString()}
                data={props.todos}
                renderItem={({ item }) => (
                    <Todo 
                        todo={ item }  
                        onRemove={props.removeTodo} 
                        onOpen={props.openTodo} 
                        />)}
                        keyExtractor={item => item.id.toString()}
            />

    </View>
)}

// const styles = Stylesheet.create({})