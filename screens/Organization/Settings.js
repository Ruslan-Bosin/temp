import React from "react";
import { useState, useEffect } from "react";
import { 
  StyleSheet, 
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackActions } from "@react-navigation/native";
import { useIsFocused } from '@react-navigation/native';
import { Config } from "../../utils/Config";
import { get, set } from "../../utils/Storage"
import { serverIsOffAlert } from "../../utils/Alerts";
import { HEIGHT, WIDTH } from "../../utils/Size";
import Header from "../../components/Client/Header";
import SettingsField from "../../components/SettingsField"


export default function OrganizationSettings({navigation}) {

  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [sticker, setSticker] = useState("");
  const [limit, setLimit] = useState("");

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      get("token").then((token => {
        fetch(Config.base_url + "/rest/organization/info", {
          method: "GET",
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            "x-access-token": token,
          },
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
              setTitle(data["title"]);
              setEmail(data["email"]);
              setSticker(data["sticker"]);
              setLimit(data["limit"]);
              //setPrivacy(data["is_private"] ? "Приватный" : "Стандарт");
            } else if (statusCode === 401) {
              Alert.alert("Ошибка", "Срок действия сессии исёк, авторизируйтесь для продолжения");
              navigation.dispatch(StackActions.replace("SelectRole"));
            } else {
              serverIsOffAlert();
            }
          }
        )
        .catch((error)=>{
          serverIsOffAlert();
        })
  
      }));
    }
  }, [isFocused]);

  const logoutPressed = () => {
    Alert.alert(
      "Выйти ?",
      "Вы уверены что хотите выйти ?",
      [
        {
          text: "отмена",
          style: "cancel"
        },
        {
          text: "Выйти",
          onPress: () => {
            set("role", "NONE");
            set("token", "NONE");
            navigation.dispatch(StackActions.replace("Router"))
          },
          style: "destructive"
        },
      ]
    );
  };

  const update = (type) => {
    navigation.navigate("OrganizationUpdate", {type: type});
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView style={styles.scrollView}>
          <View style={styles.spacer}/>
        <Header text="Настройки" showButton={false}/>

        <SettingsField title="Название:" value={title} type="name" onPress={() => {update("title")}}/>
          <View style={styles.spacerSmall}/>
        <SettingsField title="Почта:" value={email} type="mail" onPress={() => {update("mail")}}/>
          <View style={styles.spacerSmall}/>
        <SettingsField title="Пароль:" value="Скрыт" type="password" onPress={() => {update("password")}}/>
          <View style={styles.spacerSmall}/>
        <SettingsField title="Стикер:" value={sticker} type="sticker" onPress={() => {update("sticker")}}/>
          <View style={styles.spacerSmall}/>
        <SettingsField title="Лимит:" value={limit} type="limit" onPress={() => {update("limit")}}/>
          <View style={styles.spacerSmall}/>
        

        <Text style={styles.infoText}>Загрузка изображения профиля доступна на сайте. Возможнось загрузки через мобильное приложение появится в скором времени</Text>
        <View style={styles.spacerSmall}/>

        <View style={styles.buttonsBloack}>
          <TouchableOpacity onPress={logoutPressed} style={styles.button}>
            <Text style={styles.buttonText}>Выйти</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    marginHorizontal: 0.03 * WIDTH,
    height: '100%'
  },
  spacer: {
    height: 0.08 * HEIGHT
  },
  spacerSmall: {
    height: 0.02 * HEIGHT
  },
  infoText: {
    color: "#575F6E"
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF2D2D',
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
});
