import React from "react";
import { useState } from "react";
import { 
  StyleSheet, 
  SafeAreaView,
  View,
  Text, 
  TouchableOpacity,
} from 'react-native';
import { StackActions } from "@react-navigation/native";
import { Config } from "../../../utils/Config";
import { get, set } from "../../../utils/Storage";
import { WIDTH, HEIGHT } from "../../../utils/Size";
import { serverIsOffAlert } from "../../../utils/Alerts";
import Input from "../../../components/Input";

export default function OrgannizationSignup({navigation}) {

  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const organizationLogin = () => {
    navigation.goBack();
  };

  const signupPressed = () => {
    fetch(Config.base_url + "/rest/organization/signup", {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title,
        email: email,
        password: password
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
          
          set("role", "organization");
          set("token", data["token"]);

          navigation.dispatch(StackActions.replace("Router"));
        } else if (statusCode === 403) {
          serverIsOffAlert();
        } else if (statusCode === 417) {
          if (data["message"] == "email taken") {
            setErrorMessage("Аккаунт с такой почтой уже есть");
          } else {
            setErrorMessage(data["message"]);
          }
        } else {
          setErrorMessage("Ошибка регистрации");
        }
      }
    )
    .catch((error)=>{
      serverIsOffAlert();
    })
  
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Регистрация</Text>
      <Text style={styles.info}>
        Регистрация аккаунта организации. Если у вас есть аккаунта вы можете
      </Text>
      <TouchableOpacity onPress={organizationLogin}><Text style={styles.infoLink}>войти</Text></TouchableOpacity>

      <Input onChange={(value) => {setTitle(value)}} type="title" style={styles.input}/>
        <View style={styles.spacer}></View>
      <Input onChange={(value) => {setEmail(value)}} type="mail" style={styles.input}/>
        <View style={styles.spacer}></View>
      <Input onChange={(value) => {setPassword(value)}} type="password" style={styles.input}/>
      
      <Text style={styles.errorInfo}>{errorMessage}</Text>
      <View style={styles.buttonsBloack}>
        <TouchableOpacity onPress={() => {signupPressed()}} style={styles.button}>
          <Text style={styles.buttonText}>Создать</Text>
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
    marginTop: '3%',
    fontSize: '16%',
    color: 'grey',
    textAlign: 'center',
    marginHorizontal: 50,
  },
  infoLink: {
    marginTop: '1%',
    marginBottom: '7%',
    fontSize: '16%',
    color: '#2997FF',
    textAlign: 'center',
    marginHorizontal: 50,
  },
  errorInfo: {
    marginTop: 0.03 * HEIGHT,
    color: "red",
    fontSize: '16%',
    textAlign: "center",
    opacity: 0.6
  },
  spacer: {
    height: 0.02 * HEIGHT
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
});
