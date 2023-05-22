import React from "react";
import { useState, useEffect } from "react";
import { 
  StyleSheet, 
  SafeAreaView,
  View,
  Text,
  Switch,
  TouchableOpacity,
  Alert,
  Image
} from 'react-native';
import { StackActions } from "@react-navigation/native";
import { useIsFocused } from '@react-navigation/native';
import { Config } from "../../utils/Config";
import { get, set } from "../../utils/Storage"
import { serverIsOffAlert } from "../../utils/Alerts";
import { HEIGHT, WIDTH } from "../../utils/Size";

export default function Accumulated({navigation, route}) {

    
    const doneButton = () => {
        navigation.dispatch(StackActions.replace("Router"));
    };


    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Накоплено!</Text>

            <View style={styles.imageBox}>
                <Image resizeMode="stretch" style={styles.image} source={require("../../assets/images/accumulated.png")}/>
            </View>

            <View style={styles.buttonsBloack}>
                <TouchableOpacity onPress={doneButton} style={styles.button}>
                <Text style={styles.buttonText}>Готово</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1
      }, 
      title: {
        marginTop: '15%',
        fontWeight: "bold",
        fontSize: 50,
        textAlign: 'center'
      },
      info: {
        marginVertical: '3%',
        fontSize: 18,
        color: 'grey',
        textAlign: 'center',
        marginHorizontal: 50,
      },
      button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2997FF',
        height: 65,
        marginHorizontal: 30,
        borderRadius: '15%'
      },
      buttonText: {
        color: 'white'
      },
      buttonsBloack: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: '5%'
      },
      imageBox: {
        alignItems: 'center',
        justifyContent: 'center',
      },
      image: {
        width: '100%',
        height: '60%',
      },
});
