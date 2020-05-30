import React from 'react';
import {Image,Modal,Alert,Picker,TouchableHighlight, StyleSheet, Text, View,  TouchableOpacity,Button } from 'react-native';
import logo from '../assets/snapchat.png';
import * as ImagePicker from 'expo-image-picker';
import { render } from 'react-dom';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';


class PhotoScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      selectedimg : null,
      modalVisible: false,
      selectedSec : "5",
      contactlist : null,
      selectedContact : null,
    }
  }

  openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    console.log(pickerResult);
    this.setState({ selectedimg : pickerResult, modalVisible : true});
  }

  // setModalVisible = (visible) => {
  //   this.setState({ modalVisible: visible });
  // }

  getcontacts = async () => {
    let token = null;
    try {
      token = await AsyncStorage.getItem('@storage_Key');
      console.log(token);

    } catch (e) {
      console.log(e);

      // this.props.navigation.navigate('SignIn');
      return;
    }
    let headers = {
      token,
    }
    // console.log(token);
    axios.get('http://snapi.epitech.eu/all', {headers})
    .then( response => {
      // console.log(response)
      if(response.status == 200){
        this.setState({ contactlist : response.data.data})
      }
    }).catch(error => {
      this.props.navigation.navigate('LogoutScreen');
    })

  }

  componentDidMount(){
    this.getcontacts();
  }

  send = async () => {
    console.log(this.state.selectedSec, this.state.selectedContact,this.state.selectedimg);
    if(this.state.selectedSec !== null && this.state.selectedContact !== null && this.state.selectedimg !== null){
      let token = null;
      try {
        token = await AsyncStorage.getItem('@storage_Key');
        // console.log(token);

      } catch (e) {
        console.log(e);

        // this.props.navigation.navigate('SignIn');
        return;
      }
      let headers = {
        'Content-Type': 'multipart/form-data',
        'token' : token,
      };
      let body = new FormData();
      body.append('duration', this.state.selectedSec);
      body.append('to', this.state.selectedContact);
      var photo = {
        uri: this.state.selectedimg.uri,
        type: 'image/jpeg',
        name: 'photo.jpg',
      };
      body.append('image', photo);
      console.log(headers,body);
      axios.post('http://snapi.epitech.eu/snap',body, {headers})
      .then( response => {
        // console.log(response)
        if(response.status == 200){
          this.setState({ modalVisible : false});
          Alert.alert(
            "Reussi",
            JSON.stringify(response.data.data),
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: true }
          );
        }
      }).catch(error => {
        console.log(error);
        // this.props.navigation.navigate('LogoutScreen');
      })
    }
  }


  render(){
      return (
        <View style={styles.container}>
          <Image source={logo} style={styles.logo} /> 
          <Text  style={styles.instructions}> 
            To share a photo from your phone with a friend, just press the button below!
          </Text>
          <TouchableOpacity onPress={this.openImagePickerAsync} style={styles.button}>
            <Text style={styles.buttonText}>Choisir une photo</Text>
          </TouchableOpacity>
          
          {this.state.selectedimg !== null ? <Image style={styles.logo} source={this.state.selectedimg}></Image> : null}
          <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                {this.state.selectedimg !== null ? <Image style={styles.logo} source={this.state.selectedimg}></Image> : null}
                <Text style={styles.modalText}>Temps du snap en secondes:</Text>
                <Picker
                  selectedValue={this.state.selectedSec}
                  style={{ height: 50, width: 150 }}
                  onValueChange={(itemValue, itemIndex) => this.setState({ selectedSec : itemValue })}
                >
                  <Picker.Item label="5" value="5" />
                  <Picker.Item label="10" value="10" />
                  <Picker.Item label="20" value="20" />
                  <Picker.Item label="30" value="30" />
                  <Picker.Item label="60" value="60" />

                </Picker>
                <Text style={styles.modalText}>Envoyer a :</Text>

                <Picker
                  selectedValue={this.state.selectedContact}
                  style={{ height: 50, width: 300 }}
                  onValueChange={(itemValue, itemIndex) => this.setState({ selectedContact : itemValue })}
                  >
                  {this.state.contactlist !== null ? this.state.contactlist.map(e => 
                   <Picker.Item key={e.email} label={e.email} value={e.email} />
                    
                  ) : null}
                  

                </Picker>
                <TouchableHighlight
                  style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                  onPress={() => {
                    this.setState({ modalVisible : false})
                  }}
                  >
                  <Text style={styles.textStyle}>Annuler</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  style={{ ...styles.openButton, backgroundColor: "lightgreen" }}
                  onPress={this.send}
                  >
                  <Text style={styles.textStyle}>Envoyer</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>
        </View>
      );
  }
}
 export default PhotoScreen;
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
