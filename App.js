import React from 'react';
import {Image, StyleSheet, Text, View,  TouchableOpacity,Button } from 'react-native';
import 'react-native-gesture-handler';
// import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {createAppContainer} from 'react-navigation';
import Icon from 'react-native-vector-icons'
import { createStackNavigator } from '@react-navigation/stack';

import { createDrawerNavigator } from '@react-navigation/drawer';

import MainTabScreen from './Screens/MainTabScreen';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import LogoutScreen from './Screens/LogoutScreen';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();


export default function App() {

  let isloggedin = false;

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
         <Stack.Screen name="Home" component={ isloggedin ? MainTabScreen : LoginScreen} />
         <Stack.Screen name="Register" component={RegisterScreen} />
         <Stack.Screen name="Login" component={LoginScreen} />
         <Stack.Screen name="Logout" component={LogoutScreen} />

      </Stack.Navigator>
      
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container : {
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center',

  }
});
