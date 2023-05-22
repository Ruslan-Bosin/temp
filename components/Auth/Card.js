import React from "react";
import { 
  StyleSheet, 
  View,
  Text, 
  Image,
} from 'react-native';
import { WIDTH, HEIGHT } from "../../utils/Size";

export default function Card({type}) {

  const image = (type) => {
    if (type === "Клиент") {
      return <Image resizeMode="stretch" style={styles.image} source={require("../../assets/images/client.png")}/>
    }
    if (type === "Организация") {
      return <Image resizeMode="stretch" style={styles.image} source={require("../../assets/images/organization.png")}/>
    }
    console.log(type);
  }

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        {image(type)}
        <Text style={styles.text}>{type}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 0.45 * HEIGHT,
    width: 1 * WIDTH,
  },
  inner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    borderColor: "#D4D4D4",
    borderStyle: "stroke",
    borderWidth: 5,
    borderRadius: '15%',
  },
  image: {
    width: '60%',
    height: '50%',
    marginBottom: '3%',
  },
  text: {
    fontSize: '22%',
    fontWeight: 'b'
  }
});
