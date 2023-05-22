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

export default function OrganizationUpdate({navigation, route}) {

  let type = route.params.type;
  
  const [inputText, setInputText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const headerText = (type) => {
    if (type === "title") return "Название"
    if (type === "mail") return "Почта"
    if (type === "password") return "Пароль"
    if (type === "sticker") return "Стикер"
    if (type === "limit") return "Лимит"
  };

  const getBody = (type) => {
    if (type === "title") return JSON.stringify({title: inputText})
    if (type === "mail") return JSON.stringify({email: inputText})
    if (type === "password") return JSON.stringify({password: inputText})
    if (type === "sticker") return JSON.stringify({sticker: inputText})
    if (type === "limit") return JSON.stringify({limit: inputText})
  };

  const updatePressed = () => {
    get("token").then((token => {
      fetch(Config.base_url + "/rest/organization/info", {
        method: "PUT",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          "x-access-token": token,
        },
        body: getBody(type)
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
            navigation.goBack();
          } else if (statusCode === 401) {
            Alert.alert("Ошибка", "Срок действия сессии исёк, авторизируйтесь для продолжения");
            navigation.dispatch(StackActions.replace("SelectRole"));
          } else if (statusCode === 417) {
            setErrorMessage(data["message"]);
          } else {
            serverIsOffAlert();
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
          <Text style={styles.text}>{headerText(type)}</Text>
        </View>

        { 
          type === "privacy" ? null : 
          <Input type={type} onChange={(value) => {setInputText(value)}}/>
        }

        { 
          type != "privacy" ? null : 
          <View style={styles.swithBlock}>
            <Text style={styles.hideNameText}>Скрывать имя</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#007AFF" }}
              thumbColor={swithState ? "white" : "white"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => {setSwitchState(!swithState)}}
              value={swithState}
            />
          </View>
        }
        

        <Text style={styles.errorInfo}>{errorMessage}</Text>

        <View style={styles.buttonsBloack}>
          <TouchableOpacity onPress={updatePressed} style={styles.button}>
            <Text style={styles.buttonText}>Обновить</Text>
          </TouchableOpacity>
        </View>
        
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
  buttonsBloack: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: '5%'
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
