import React from 'react';
import {Image,Modal,FlatList,Alert,Picker,TouchableHighlight, StyleSheet, Text, View,  TouchableOpacity,Button } from 'react-native';
import logo from '../assets/snapchat.png';
import * as ImagePicker from 'expo-image-picker';
import { render } from 'react-dom';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
// import RNFetchBlob from 'react-native-fetch-blob'



class HomeScreen extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            snaps : null,
            snapstab : null,
            image : null,
        }
    }
    getsnaps = async () => {
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
        axios.get('http://snapi.epitech.eu/snaps', {headers})
        .then( response => {
        // console.log(response)
        if(response.status == 200){
            this.setState({ snaps : response.data.data})
            this.maketab();
        }
        }).catch(error => {
            console.log(error);
            this.props.navigation.navigate('LogoutScreen');
        })



    }

    componentDidMount(){
        this.getsnaps();
    }

    snap = async (id) => {
        console.log(id);
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
        console.log(token)
        var request = new XMLHttpRequest();
        // request.responseType = "blob";
        request.onload = function() {
            console.log(this.response);
            // let url = URL.createObjectURL(this.response)
            // console.log(url);
        }
        // request.onerror = function() { // only triggers if the request couldn't be made at all
        //     console.log(this);
        // };
        console.log(headers);
        request.open("GET", `http://snapi.epitech.eu/snap/${id}`);
        request.setRequestHeader('headers',headers);
        request.send();




        // const val = await AsyncStorage.getItem('@storage_Key');
        // console.log(val);
        // const url = `http://snapi.epitech.eu/snap/${id}`;
        // console.log(url);
        // axios({
        //     url: url,
        //     method: 'GET',
        //     headers: {token : val},
        //     responseType: 'blob',
        //   }).then((response) => {
        //     //   console.log(response);
        //     const url = window.URL.createObjectURL(new Blob([response.data]));
        //     console.log(url);
        // }).catch(error => {
        //     console.log(error);
        // })


        // axios({
        //     url: `http://snapi.epitech.eu/snap/${id}`,
        //     method: 'GET',
        //     responseType: 'blob', // important
        //     headers : headers,
        //   }).then((response) => {
        //     const url = window.URL.createObjectURL(new Blob([response.data]));
        //     console.log(url);
        //     // const link = document.createElement('a');
        //     // link.href = url;
        //     // link.setAttribute('download', 'file.pdf');
        //     // document.body.appendChild(link);
        //     // link.click();
        //   }).catch( error => {
        //       console.log(error);
        //   })

        // console.log(token);
        // axios.get(`http://snapi.epitech.eu/snap/${id}`, {headers,  responseType: 'blob'})
        //     .then( response => {
        //         // console.log(response)
        //         if(response.status == 200){
        //             let MyBlob = response.data;
        //             console.log(MyBlob.size, MyBlob.type)
        //             // let BLOB = new Blob([response.data], {type: 'application/pdf'});
        //             let url = URL.createObjectURL(MyBlob);
        //             // const obj = {hello: 'world'};
        //             // const blob = new Blob([MyBlob], {type : 'application/octet-stream'});
        //             // let url = URL.createObjectURL(blob);

        //         }
        //     }).catch(error => {
        //         console.log(error);
        //         // this.props.navigation.navigate('LogoutScreen');
        //     })
            // RNFetchBlob.fetch('GET', `http://snapi.epitech.eu/snap/${id}`, {
            //     headers,
            //     responseType : 'blob',
            // })
            // .then((res) => {
            //     // let status = res.info().status;
            
            //     if(status == 200) {
            //         // console.log(res);
            //     // the conversion is done in native code
            //     // let base64Str = res.base64()
            //     // the following conversions are done in js, it's SYNC
            //     // let text = res.text()
            //     // let json = res.json()
            //     } else {
            //     // handle other status codes
            //     }
            // })
            // // Something went wrong:
            // .catch((errorMessage, statusCode) => {
            //     console.log(errorMessage,statusCode);
            // })
    }


    maketab = () => {
        let array = [];
        this.state.snaps.map(e => {
            array.push({ key : e.snap_id ,content : e.from + ' temps : ' + e.duration, temps : e.duration, id : e.snap_id})
        })
        this.setState({ snapstab : array});
    }

   render(){
        return (
            <View style={styles.container}>
                <Text >HomeScreen</Text>
                {/* { this.state.snaps !== null && this.state.snaps.length > 0 ? this.state.snaps.map(e => {console.log(e)}) : null } */}
                <FlatList
                data={ this.state.snapstab !== null && this.state.snaps.length > 0 ? this.state.snapstab : [{ content : 'Vous n\'avez aucun snaps',key : 'Vous n\'avez aucun snaps',temps : null, id : null}] }
                renderItem={({item}) => <Button key={item.key} title={item.content} onPress={() => {this.snap(item.id)}}></Button>}
                />
                {this.state.image !== null ? <Image source={this.state.image}></Image> : null}
            </View>
        );
   } 
}

const styles = StyleSheet.create({
    container: {
      paddingTop: 22,
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
  

export default HomeScreen;