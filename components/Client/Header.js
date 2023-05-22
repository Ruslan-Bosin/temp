import React from "react";
import { 
  StyleSheet, 
  View,
  Text,
  Image,
  Button,
  TouchableOpacity
} from 'react-native';
import { WIDTH, HEIGHT } from "../../utils/Size";

function Header1({showButton, onPress, text}) {

  return (
    <View style={styles1.box}>
      <Text style={styles1.text}>{text}</Text>
      { showButton === true ?
        <TouchableOpacity onPress={onPress}>
          <Text style={styles1.buttonText}>Настройки</Text>
        </TouchableOpacity>
      : null}
    </View>
  );
}

const styles1 = StyleSheet.create({
  box: {
    paddingVertical: 0.01 * HEIGHT
  },
  text: {
    fontSize: '35%',
    fontWeight: "bold",
  },
  buttonText: {
    color: "#2997FF",
    marginTop: 0.002 * HEIGHT
  }
});


export default function Header2({showButton, onPress, text}) {

  return (
    <View style={styles2.box}>
      <Text style={styles2.text}>{text}</Text>
      { showButton === true ?
        <TouchableOpacity onPress={onPress}>
          <View style={styles2.button}>
            <Image source={require("../../assets/icons/settings.png")}/>
          </View>
        </TouchableOpacity>
      : null}
    </View>
  );
}

const styles2 = StyleSheet.create({
  box: {
    paddingVertical: 0.01 * HEIGHT,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontSize: '35%',
    fontWeight: "bold",
  },
  button:{
    width: 0.11 * WIDTH,
    height: 0.11 * WIDTH,
    backgroundColor: "white",
    borderRadius: "8%",
    alignItems: "center",
    justifyContent: "center"
  }
});
