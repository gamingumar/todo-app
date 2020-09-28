/*
 * File: App.js
 * Project: https://github.com/gamingumar/todo-app
 * File Created: Monday, 28th September 2020 4:00:00 am
 * Author: Umar Aamer (umaraamer@gmail.com)
 * -----
 * Last Modified: Monday, 28th September 2020 4:59:30 am
 * -----
 * Copyright 2020 - 2020 WhileGeek, https://umar.tech
 */


import * as React from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { Card, List, TextInput } from 'react-native-paper';

export default function App() {
  const [text, setText] = React.useState('');

  const [todos, setTodos] = React.useState([]);

  const _onSubmit = () => {
    let newTodo = {
      value: text,
      done: false,
    };
    let newTodos = [...todos];
    newTodos.push(newTodo);

    setText('');

    setTodos(newTodos);
  };

  const _onDone = (index) => {
    let newTodos = [...todos];
    newTodos[index].done = true;
    setTodos(newTodos)
  };

  const _onDelete = (index) => {
    let newTodos = [...todos];
    newTodos.splice(index, 1);

    setTodos(newTodos)
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="What you want to do?"
        value={text}
        onChangeText={(text) => setText(text)}
        onSubmitEditing={_onSubmit}
      />
      <ScrollView>
        <Text style={styles.heading}>Todos</Text>

        <List.Section>
          {todos.map((todo, i) => {
            if (!todo.done) {
              return (
                <List.Item
                  title={todo.value}
                  left={() => <List.Icon icon="check" />}
                  titleStyle={styles.todo}
                  onPress={() => _onDone(i)}
                  key={i}
                />
              );
            }
          })}
        </List.Section>

        <Text style={styles.heading}>Completed</Text>

        <List.Section>
          {todos.map((todo, i) => {
            if (todo.done) {
              return (
                <List.Item
                  title={todo.value}
                  left={() => <List.Icon icon="close" />}
                  titleStyle={styles.done}
                  onPress={() => _onDelete(i)}
                  key={i}
                />
              );
            }
          })}
        </List.Section>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  heading: {
    margin: 18,
    fontSize: 30,
    fontWeight: 'bold',
  },
  todo: {},
  done: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
});
