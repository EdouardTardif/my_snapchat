import React, { Component } from 'react';
import {Image,TextInput, StyleSheet, Alert,Text, View,  TouchableOpacity,Button } from 'react-native';
import 'react-native-gesture-handler';
// import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {createAppContainer} from 'react-navigation';
import Icon from 'react-native-vector-icons'
import { createStackNavigator } from '@react-navigation/stack';

import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-community/async-storage';
import logo from './assets/snapchat.png';
import MainTabScreen from './Screens/MainTabScreen';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
// import LogoutScreen from './Screens/LogoutScreen';
import { render } from 'react-dom';
import axios from 'axios';
// const Drawer = createDrawerNavigator();
// const Stack = createStackNavigator();


// class App extends React.Component {

//   constructor(props){
//     super(props);
//     this.state = {
//       token : null,
//       isloggedin : null,
//     }
//   }

 
//   getItems = async () => {
//     try {
//       // console.log(this.state);
//       const value = await AsyncStorage.getItem('@storage_Key');
//       console.log('token ici -->'+value);
//       if(value !== null) {
//         console.log('token ici -->'+value);
//         this.setState({ token : value, isloggedin : true});
        
//       } else {
//         this.setState({ token : null, isloggedin : false});

//       }
//       console.log(this.state);
//     } catch(e) {
//       this.setState({ token : null, isloggedin : false});
//     }
//   }

//   componentDidMount(){
//     this.getItems();
//     console.log(this.state);
//   }
//   render(){
//     return (
//       <NavigationContainer>
//         <Stack.Navigator initialRouteName="Home">
//           {this.state.isloggedin !== null ? this.state.isloggedin == true ? <Stack.Screen   options={{ headerShown: false }} name="Home" component={ MainTabScreen} /> : <Stack.Screen name="Home" component={ LoginScreen} /> : <Stack.Screen name="Home" component={ LoginScreen} />}
//           <Stack.Screen name="Register" component={RegisterScreen} />
//           <Stack.Screen name="Login" component={LoginScreen} />
//           <Stack.Screen name="Logout" component={LogoutScreen} />
//         </Stack.Navigator>
        
//       </NavigationContainer>
//     );
//   }
// }


const AuthContext = React.createContext();
function SplashScreen() {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}

function HomeScreen() {
  const { signOut } = React.useContext(AuthContext);

  return (
    <View>
      <Text>Signed in!</Text>
      <Button title="Sign out" onPress={signOut} />
    </View>
  );
}

function SignInScreen({ navigation }) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { signIn } = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
              <Image source={logo} style={styles.logo} /> 
              <Text >Si vous avez deja un compte</Text>
              <Text>Votre adresse mail</Text>
              <TextInput
                  style={{ backgroundColor:"white", borderColor: 'gray', borderWidth: 1, paddingLeft: 70,paddingRight: 70}}
                  value={username}
                  onChangeText={setUsername}
                  placeholder="Votre adresse mail"
                  textContentType="emailAddress"
                  autoCapitalize="none"
                  autoCompleteType="email"
                  keyboardType="email-address"
                />
                <Text>Votre mot de passe</Text>
                <TextInput
                  style={{ backgroundColor:"white", borderColor: 'gray', borderWidth: 1, paddingLeft: 70,paddingRight: 70}}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  autoCapitalize="none"
                  placeholder="Votre mot de passe"
                  textContentType="password"
                  autoCompleteType="password"
                />
              <TouchableOpacity title="Sign in" onPress={() => signIn({ username, password })} style={styles.buttonLogin}>
                <Text style={styles.buttonText}>Se connecter</Text>
              </TouchableOpacity>
              <Text >Si vous n'avez pas de compte</Text>

              <TouchableOpacity style={styles.buttonRegister} onPress={() => {navigation.navigate('SignUp')}}  >
                <Text style={styles.buttonText}>S'inscrire</Text>
              </TouchableOpacity>
          </View>
  );
}

function SignUpScreen( { navigation }) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { signUp } = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
              <Image source={logo} style={styles.logo} /> 
              <Text>Votre adresse mail</Text>
              <TextInput
                  style={{ backgroundColor:"white", borderColor: 'gray', borderWidth: 1, paddingLeft: 70,paddingRight: 70}}
                  value={username}
                  onChangeText={setUsername}
                  placeholder="Votre adresse mail"
                  textContentType="emailAddress"
                  autoCapitalize="none"
                  autoCompleteType="email"
                  keyboardType="email-address"
                />
                <Text>Votre mot de passe</Text>
                <TextInput
                  style={{ backgroundColor:"white", borderColor: 'gray', borderWidth: 1, paddingLeft: 70,paddingRight: 70}}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  autoCapitalize="none"
                  placeholder="Votre mot de passe"
                  textContentType="password"
                  autoCompleteType="password"
                />
              <TouchableOpacity title="Sign in" onPress={() => signUp({ username, password })} style={styles.buttonLogin}>
                <Text style={styles.buttonText}>S' Inscrire</Text>
              </TouchableOpacity>
              <Text >Si vous avez deja un compte</Text>

              <TouchableOpacity style={styles.buttonRegister} onPress={() => { navigation.navigate('SignIn')}}  >
                <Text style={styles.buttonText}>Se connecter</Text>
              </TouchableOpacity>
          </View>
  );
}

function LogoutScreen( { navigation }) {

  const { signOut } = React.useContext(AuthContext);
  signOut();
  return (
      <View style={styles.container}>
          <Image source={logo} style={styles.logo} />      
      </View>
  );
}





const Stack = createStackNavigator();

function App({ navigation }) {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('@storage_Key');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        // console.log(data);
        let email = data.username;
        let password = data.password;
        console.log(email,password);
        if(email !== undefined && password !== undefined){
            let body = {
                email,
                password,
            }
            console.log("body :",body);

            axios.post('http://snapi.epitech.eu/connection', body).then(async response => {
                    console.log(response)
                    if(response.status == 200){
                        try {
                          await AsyncStorage.setItem('@storage_Key', response.data.data.token)
                          await AsyncStorage.setItem('@storage_Email',response.data.data.email)
                          dispatch({ type: 'SIGN_IN', token: response.data.data.token });

                        } catch (e) {
                          // saving error
                        }
                      } else {
                        dispatch({ type: 'SIGN_OUT', token: null });

                    }
                }).catch(error => {
                  Alert.alert(
                    "Erreur",
                    JSON.stringify(error.response.data.data),
                    [
                      {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                      },
                      { text: "OK", onPress: () => console.log("OK Pressed") }
                    ],
                    { cancelable: false }
                  );
                })
        }
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem('@storage_Key');
          await AsyncStorage.removeItem('@storage_Email');
          console.log('deleted');
          dispatch({ type: 'SIGN_OUT' })
        }
        catch(exception) {
            return false;
            dispatch({ type: 'SIGN_IN' })

        }
      },
      signUp: async data => {
        let email = data.username;
        let password = data.password;
        console.log(email,password);
        if(email !== undefined && password !== undefined){
            let body = {
                email,
                password,
            }
          console.log("body :",body);
          axios.post('http://snapi.epitech.eu/inscription', body).then(response => {
                  console.log(response)
                  if(response.status == 200){
                      Alert.alert(
                        "Alert",
                        'votre compte a bien ete cree',
                        [
                          {
                            text: "Cancel",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                          },
                          { text: "OK", onPress: () => console.log('OK') }
                        ],
                        { cancelable: false }
                      );
                  } else {
                      console.log(response);
                      // this.setState({ error : response.data});
                  }
              }).catch(error => {
                  // console.log(error.response.data.data.email[0]);
                  Alert.alert(
                    "Erreur",
                    JSON.stringify(error.response.data.data),
                    [
                      {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                      },
                      { text: "OK", onPress: () => console.log("OK Pressed") }
                    ],
                    { cancelable: false }
                  );
              })

        } else {
          dispatch({ type: 'SIGN_OUT', token: null });
        }

      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {state.isLoading ? (
            // We haven't finished checking for the token yet
            <Stack.Screen name="Splash" component={SplashScreen} />
          ) : state.userToken == null ? (
            // No token found, user isn't signed in
            <>
                <Stack.Screen
                  name="SignIn"
                  component={SignInScreen}
                  options={{
                    title: 'Sign in',
                // When logging out, a pop animation feels intuitive
                    animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                  }}
                />
                <Stack.Screen
                  name="SignUp"
                  component={SignUpScreen}
                  options={{
                    title: 'Sign Up',
                // When logging out, a pop animation feels intuitive
                    animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                  }}
                />
            </>
            
          ) : (
            // User is signed in
            <>
            <Stack.Screen name="Home" options={{ headerShown: false }} component={MainTabScreen} />
            <Stack.Screen name="LogoutScreen" component={LogoutScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
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
  error : {
    fontSize: 17,
    color: 'rgb(255, 0, 0)',
  },
});

export default App;
