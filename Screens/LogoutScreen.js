import React from 'react';
import {Image, StyleSheet, Text,TextInput, View,  TouchableOpacity,Button } from 'react-native';
import logo from '../assets/snapchat.png';
import * as ImagePicker from 'expo-image-picker';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AsyncStorage from '@react-native-community/async-storage';


class LogoutScreen extends React.Component {

    constructor(props){
        super(props);
        this.state = {

        }
    }

    logout = ()  => {
        this.props.navigation.navigate('LogoutScreen')
    }

    

    render(){
      return (
          <View style={styles.container}>
            <Image source={logo} style={styles.logo} />
            <Button title="Se Deconnecter" onPress={this.logout}></Button>
            </View>
        );
      }
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
  buttonLogin: {
    backgroundColor: "green",
    padding: 20,
    borderRadius: 5,
  },
  buttonRegister: {
    backgroundColor: "blue",
    padding: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
});


export default LogoutScreen;