import React from 'react';
import { Image, StyleSheet, Text,TextInput, View,  TouchableOpacity,Button } from 'react-native';
import logo from '../assets/snapchat.png';
import * as ImagePicker from 'expo-image-picker';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';



class LoginScreen extends React.Component{

      constructor(props){
        super(props);
        this.state = {
          email : null,
          password : null,
          error : null,
        }
      }

      connexion = () => {
        console.log(this.state);
        if(this.state.email !== null && this.state.password !== null){
            let email = this.state.email;
            let password = this.state.password;
            let body = {
                email,
                password,
            }
            console.log("body :",body);



            axios.post('http://snapi.epitech.eu/connection', body).then(response => {
                    console.log(response)
                    if(response.status == 200){
                        // this.props.navigation.navigate('Login');
                        this.setState({ token : response.data.data.token});
                        this.setState({ email : response.data.data.email});
                        this.storeData(response.data.data.token);
                        this.storeEmail(response.data.data.email);
                        // window.location.reload(false);
                        this.props.navigation.navigate('App');
                      } else {
                        console.log(response);
                        this.setState({ error : response.data});
                    }
                }).catch(error => {
                    console.log(error.response.data);
                    this.setState({ error : JSON.stringify(error.response.data.data)});
                })
        } else {
            this.setState({ error : 'Veuillez remplir tout les champs'});
        }
    }

    storeData = async (value) => {
      try {
        await AsyncStorage.setItem('@storage_Key', value)
      } catch (e) {
        // saving error
      }
    }
    storeEmail = async (value) => {
      try {
        await AsyncStorage.setItem('@storage_Email', value)
      } catch (e) {
        // saving error
      }
    }

    render(){
      return (
          <View style={styles.container}>
              <Image source={logo} style={styles.logo} /> 
              <Text >Si vous avez deja un compte</Text>
              <Text>Votre adresse mail</Text>
              <TextInput
                  style={{ backgroundColor:"white", borderColor: 'gray', borderWidth: 1, paddingLeft: 70,paddingRight: 70}}
                  onChangeText={(text) => this.setState({ email : text})}
                  placeholder="Votre adresse mail"
                  textContentType="emailAddress"
                  autoCapitalize="none"
                  value={this.state.email}
                  autoCompleteType="email"
                  keyboardType="email-address"
                />
                <Text>Votre mot de passe</Text>
                <TextInput
                  style={{ backgroundColor:"white", borderColor: 'gray', borderWidth: 1, paddingLeft: 70,paddingRight: 70}}
                  onChangeText={(text) => this.setState({ password : text})}
                  autoCapitalize="none"
                  placeholder="Votre mot de passe"
                  textContentType="password"
                  value={this.state.password}
                  autoCompleteType="password"
                />
              <TextInput style={styles.error}>{this.state.error ? this.state.error : null}</TextInput>
              <TouchableOpacity onPress={this.connexion}  style={styles.buttonLogin}>
                <Text style={styles.buttonText}>Se connecter</Text>
              </TouchableOpacity>
              <Text >Si vous n'avez pas de compte</Text>

              <TouchableOpacity style={styles.buttonRegister} onPress={() => {this.props.navigation.navigate('Register')}}  >
                <Text style={styles.buttonText}>S'inscrire</Text>
              </TouchableOpacity>
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
  error : {
    fontSize: 17,
    color: 'rgb(255, 0, 0)',
  },
});


export default LoginScreen;