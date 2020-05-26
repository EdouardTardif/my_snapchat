import React from 'react';
import {Image,TextInput, StyleSheet, Text, View,  TouchableOpacity,Button } from 'react-native';




export default function Login() {


    
    

    return (
        <View style={styles.container}>
        <Text  style={styles.instructions}> 
            Login
        </Text>
        <TextInput type="email" placeholder={"Votre identifiant"}></TextInput>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  instructions: {
    color: '#888',
    fontSize: 18,
    marginHorizontal: 15,
  },
  button: {
    backgroundColor: "blue",
    padding: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  }, 
});
