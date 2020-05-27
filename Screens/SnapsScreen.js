import React from 'react';
import {Image, StyleSheet, Text, View,  TouchableOpacity,Button } from 'react-native';
// import logo from './assets/snapchat.png';
// import * as ImagePicker from 'expo-image-picker';



class SnapsScreen extends React.Component {


   render(){
        return (
            <View>
                <Text style={{ color : 'black'}}>SnapsScreen</Text>
            </View>
        );
   } 
}
const styles = StyleSheet.create({
    container : {
      flex : 1,
      justifyContent : 'center',
      alignItems : 'center',
  
    }
    });
export default SnapsScreen;