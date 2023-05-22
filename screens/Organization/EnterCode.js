import React from "react";
import { useState, useEffect } from "react";
import { 
  StyleSheet, 
  SafeAreaView,
  View,
  Text,
  Switch,
  TouchableOpacity,
  Alert
} from 'react-native';
import { StackActions } from "@react-navigation/native";
import { useIsFocused } from '@react-navigation/native';
import { Config } from "../../utils/Config";
import { get, set } from "../../utils/Storage"
import { serverIsOffAlert } from "../../utils/Alerts";
import { HEIGHT, WIDTH } from "../../utils/Size";
import Input from "../../components/Input";

export default function EnterCode({navigation, route}) {
  
  const [inputText, setInputText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");


  const checkCode = () => {
    get("token").then((token => {
      fetch(Config.base_url + "/rest/organization/record", {
        method: "PUT",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          "x-access-token": token,
        },
        body: JSON.stringify({
          id: inputText
        })
      })
      .then((result) => {
        const statusCode = result.status;
        if (statusCode === 403) {
          return Promise.all([statusCode, {"message": "server is off"}]);
        }
        const data = result.json();
        return Promise.all([statusCode, data]);
      })
      .then(
        ([statusCode, data]) => {
  
          if (statusCode === 200) {
            
            if (data["message"] == "accumulated") {
              navigation.navigate("Accumulated");
            } else {
              navigation.dispatch(StackActions.replace("Router"));
            }

          } else if (statusCode === 403) {
            serverIsOffAlert();
          } else {
            setErrorMessage("Возникла ошибка, таккого кода клиента не существует");
          }
        }
      )
      .catch((error)=>{
        serverIsOffAlert();
      })
    }));
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>

          <View style={styles.spacer}/>
        <View style={styles.box}>
          <Text style={styles.text}>Введите код клиента</Text>
        </View>

        <Input type="code" onChange={(value) => {setInputText(value)}}/>

        <View style={styles.spacerSmall}/>

        <View style={styles.buttonsBloack}>
          <TouchableOpacity onPress={checkCode} style={styles.button}>
            <Text style={styles.buttonText}>Продолжить</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.errorInfo}>{errorMessage}</Text>

      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    marginHorizontal: 0.03 * WIDTH,
    height: '100%'
  },
  spacer: {
    height: 0.08 * HEIGHT
  },
  spacerSmall: {
    height: 0.02 * HEIGHT
  },
  box: {
    paddingVertical: 0.01 * HEIGHT,
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontSize: '35%',
    fontWeight: "bold",
    textAlign: "center"
  },
  errorInfo: {
    marginTop: 0.03 * HEIGHT,
    color: "red",
    fontSize: '16%',
    textAlign: "center",
    opacity: 0.6
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2997FF',
    height: 65,
    borderRadius: '15%'
  },
  buttonText: {
    color: 'white'
  },
  swithBlock: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: '10%'
  },
  hideNameText: {
    fontSize: '20%'
  }
});
