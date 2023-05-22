import React from "react";
import { useState } from "react";
import { 
  StyleSheet, 
  View,
  Text,
  TextInput,
  Image,
} from 'react-native';
import { WIDTH, HEIGHT } from "../utils/Size";

export default function Input({type, onChange, value}) {

  const [color, setColor] = useState("#D4D4D4");

  const image = (type) => {
    if (type == "password") {
      return <Image style={styles.image} source={require("../assets/icons/lock.png")}/>
    }
    if (type == "mail") {
      return <Image style={styles.image} source={require("../assets/icons/mail.png")}/>
    }
    if (type == "name") {
      return <Image style={styles.image} source={require("../assets/icons/person.png")}/>
    }
    if (type == "title") {
      return <Image style={styles.image} source={require("../assets/icons/bag.png")}/>
    }
    if (type == "sticker") {
      return <Image style={styles.image} source={require("../assets/icons/smile.png")}/>
    }
    if (type == "limit") {
      return <Image style={styles.image} source={require("../assets/icons/bar-chart.png")}/>
    }
    if (type == "code") {
      return null;
    }
  }

  const placeholder = (type) => {
    if (type == "mail") return "Email"
    if (type == "password") return "Пароль"
    if (type == "name") return "Имя"
    if (type == "title") return "Название"
    if (type == "sticker") return "Стикер"
    if (type == "limit") return "Лимит"
    if (type == "code") return "Код"
  }
  
  return (
    <View style={[styles.box, {borderColor: color}]}>
      {image(type)}
      <TextInput style={styles.textInput}
      onFocus={() => {
        setColor("#2997FF")
      }}
      onBlur={() => {
        setColor("#D4D4D4")
      }}
      secureTextEntry={type === "password" ? true : false}
      textContentType={type === "mail" ? "emailAddress" : type === "password" ? "password" : "name"}
      keyboardType={type === "mail" ? "email-address" : (type === "code" ? "number-pad" : "default")}
      placeholder={placeholder(type)}
      onChangeText={(value) => {onChange(value)}}
      value={value}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    height: 0.08 * HEIGHT,
    marginHorizontal: 0.03 * WIDTH,
    borderBottomWidth: 2,
    flexDirection: 'row',
    alignItems: "center",
  },
  image: {
    marginHorizontal: 15
  },
  textInput: {
    height: '100%',
    fontSize: '20%',
    width: 0.75 * WIDTH
  }
});
