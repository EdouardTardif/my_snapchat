import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import {createAppContainer} from 'react-navigation';


import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';
import PhotoScreen from './PhotoScreen';
import SnapsScreen from './SnapsScreen';
import RegisterScreen from './RegisterScreen';

const Tab = createMaterialBottomTabNavigator();

function MainTabScreen() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#e91e63"
      style={{ backgroundColor: 'yellow' }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Login"
        component={LoginScreen}
        options={{
          tabBarLabel: 'Login',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bell" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
      name="Photo"
      component={PhotoScreen}
      options={{
        tabBarLabel: 'Photos',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="camera" color={color} size={26} />
        ),
      }}
        />
        <Tab.Screen
        name="Snaps"
        component={SnapsScreen}
        options={{
        tabBarLabel: 'Snaps',
        tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bell" color={color} size={26} />
        ),
        }}
    />
    <Tab.Screen name="Register" component={RegisterScreen} />
    </Tab.Navigator>
  );
}

export default MainTabScreen;