import React from 'react';
import {Image, StyleSheet, Text,TextInput, View,  TouchableOpacity,Button } from 'react-native';
import logo from '../assets/snapchat.png';
import * as ImagePicker from 'expo-image-picker';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';



export default function LoginScreen ({ navigation}) {

 

      return (
          <View style={styles.container}>
              <Image source={logo} style={styles.logo} /> 
              <Text >Si vous avez deja un compte</Text>
              <Text>Votre adresse mail</Text>
              <TextInput
                style={{ backgroundColor:"white", borderColor: 'gray', borderWidth: 1, paddingLeft: 70,paddingRight: 70}}
                onChangeText={(text) => console.log(text)}
                placeholder="Votre adresse mail"
                textContentType="emailAddress"

              />
              <Text>Votre mot de passe</Text>
              <TextInput
                style={{ backgroundColor:"white", borderColor: 'gray', borderWidth: 1, paddingLeft: 70,paddingRight: 70}}
                onChangeText={(text) => console.log(text)}

                placeholder="Votre mot de passe"
                textContentType="password"
              />
              <TouchableOpacity style={styles.buttonLogin}>
                <Text style={styles.buttonText}>Se connecter</Text>
              </TouchableOpacity>
              <Text >Si vous n'avez pas de compte</Text>

              <TouchableOpacity style={styles.buttonRegister} onPress={() => {navigation.navigate('Register')}}  >
                <Text style={styles.buttonText}>S'inscrire</Text>
              </TouchableOpacity>
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


// export default LoginScreen;