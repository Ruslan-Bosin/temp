import React from "react";
import { useState } from "react";
import { 
  StyleSheet, 
  SafeAreaView,
  View,
  Text, 
  Button,
  TouchableOpacity,
} from 'react-native';
import { StackActions } from "@react-navigation/native";
import { Config } from "../../utils/Config"
import { get, set } from "../../utils/Storage"
import { serverIsOffAlert } from "../../utils/Alerts"

export default function Welcome({navigation}) {

  const [isLoading, setIsLoading] = useState(false);

  const selectRole = () => {
    navigation.navigate("SelectRole");
  }

  const quickSignup = () => {
    setIsLoading(true);
    
    fetch(Config.base_url + "/rest/client/quick_signup")
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
          
          set("role", "client");
          set("token", data["token"]);

          navigation.dispatch(StackActions.replace("Router"));
        } else {
          serverIsOffAlert();
        }
        setIsLoading(false);
      }
    )
    .catch((error)=>{
      serverIsOffAlert();
      setIsLoading(false);
    })
  
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Добро пожаловать!</Text>
      <Text style={styles.info}>Вы можете начать пользоваться как клиент без регистрации</Text>
      <Button disabled={isLoading} title="Быстрый вход" onPress={quickSignup} />
      <View style={styles.buttonsBloack}>
        <TouchableOpacity onPress={selectRole} style={styles.button}>
          <Text style={styles.buttonText}>Начать</Text>
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
});