import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, TextInput, Image } from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';

export default class TransactionScreen extends React.Component {
  constructor(){
    super();
    this.state = {
      hasCameraPermissions: null,
      scanned: false,
      buttonState: 'normal',
      scannedBookId: '',
      scannedStudentId: '',
    }
  }
  getCameraPermissions = async(id)=>{
    const {status} = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({
      // status==="granted" is true when user has granteed permission
       // status==="granted" is false when user has not granteed permission
       hasCameraPermissions: status==="granted",
       buttonState: id, 
       scanned: false

    })
  }
  handleBarCodeScanned = async({type, data})=> {
    const {buttonState}=this.state
    if (buttonState === "BookId"){
      this.setState({
        scanned: true,
        scannedBookId: data,
        buttonState: 'normal',
      })
    }
    else if (buttonState === "StudentId"){
      this.setState({
        scanned: true,
        scannedStudentId: data,
        buttonState: 'normal',
      })
    }
  }
    render() {
      const hasCameraPermissions = this.state.hasCameraPermissions;
      const scanned = this.state.scanned;
      const buttonState = this.state.buttonState;
      if (buttonState !== "normal" && hasCameraPermissions){
        return(
          <BarCodeScanner
          onBarCodeScanned = {scanned ? undefined: this.handleBarCodeScanned } 
          style = {StyleSheet.absoluteFillObject}
          />
        )

      }
      else if(buttonState=== "normal" ){

      
      return (
        <View style = {styles.container}>
          <View>
            <Image 
            source={require("../assets/booklogo.jpg")}
            style={{width:200, height:200, marginLeft: 650}}
          />
          <Text style = {{textAlign: 'center', fontSize: 40}}>
            WI-LY
          </Text>

          </View>
          <View style = {styles.inputView}>
            <TextInput 
            style = {styles.inputBox}
            placeholder = "Book ID"
            value = {this.state.scannedBookId}/>
           <TouchableOpacity style = {styles.scanButton}
           onPress = {()=>{ 
           this.getCameraPermissions("BookId")
           }}>
             <Text style = {styles.buttonText}>
                SCAN
             </Text>
           </TouchableOpacity>
          </View>
          <View style = {styles.inputView}>
          <TextInput 
            style = {styles.inputBox}
            placeholder = "Student ID"
            value = {this.state.scannedStudentId}/>
           <TouchableOpacity style = {styles.scanButton}
           onPress = {()=>{ 
            this.getCameraPermissions("BookId")
            }}>
             <Text style = {styles.buttonText}>
                SCAN
             </Text>
           </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
}
  const styles = StyleSheet.create ({
   textContainer: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
   },
   displayText: {
     fontSize: 20,
     textDecorationLine: 'underline',
   },
   scanButton: {
     backgroundColor: 'green',
     padding: 10,
     margin: 10,
   },
   buttonText: {
     fontSize:20,
     textAlign: 'center',
     marginTop: 10.
   },
   inputView: {
     flexDirection: 'row',
     margin: 20,

   },
   inputBox: {
      width: 200,
      height: 50,
      borderWidth: 2,
      fontSize: 20,
      marginLeft: 600.
   },
   scanButton: {
    backgroundColor: 'green',
    padding: 10,
    margin: 10,
   }
  })