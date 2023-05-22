import React from "react";
import { 
  StyleSheet, 
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';
import { WIDTH, HEIGHT } from "../utils/Size";


export default function SettingsField({title, value, type, onPress}) {

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
    if (type == "privacy") {
      return <Image style={styles.image} source={require("../assets/icons/shield.png")}/>
    }
    if (type == "sticker") {
      return <Image style={styles.image} source={require("../assets/icons/smile.png")}/>
    }
    if (type == "limit") {
      return <Image style={styles.image} source={require("../assets/icons/bar-chart.png")}/>
    }
  }

  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={onPress} activeOpacity={0.6}>
        <View style={styles.box}>
          {image(type)}
          <Text numberOfLines={1} style={styles.value}>{value}</Text>
          <Image style={styles.rightImage} source={require("../assets/icons/arrowRight.png")} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: "white",
    borderRadius: '10%',
    padding: 15,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row"
  },
  title: {
    marginBottom: 3,
    color: "grey"
  },
  value: {
    flex: 1,
    fontSize: 20,
    marginLeft: 15
  },
  rightImage: {
    tintColor: "#007AFF"
  }
});
