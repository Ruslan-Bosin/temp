import React from "react";
import { useState } from "react";
import { 
  StyleSheet, 
  View,
  Text,
  Image
} from 'react-native';
import { Config } from "../../utils/Config";
import { WIDTH, HEIGHT } from "../../utils/Size";
import ProgressBar from "../ProgressBar";


export default function Card({accumulated, limit, title, sticker, image}) {

  return (
    <View style={styles.box}>

      <View style={styles.spacer} />
      <Image style={styles.image} source={{uri: Config.base_url + image}} />
      <View style={styles.spacer} />
      <View style={styles.bock}>
        <Text style={styles.text} numberOfLines="2">{title}</Text>
        <View style={styles.progressBlock}>
          <ProgressBar style={styles.progressBar} value={(accumulated / limit) * 100}/>
          <View style={styles.spacerSmall}/>
          <Text style={styles.sticker}>{sticker}</Text>
        </View>
        <Text style={styles.info}>{accumulated + " из " + limit}</Text>
      </View>
      <View style={styles.spacer} />

    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    borderRadius: '10%',
    backgroundColor: "white",
    paddingVertical: 0.02 * HEIGHT,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: '100%',
    paddingRight: 0
  },
  spacer: {
    width: 0.02 * HEIGHT,
    height: '100%',
  },
  spacerSmall: {
    width: 0.01 * HEIGHT,
    height: '100%',
  },
  image: {
    width: 0.25 * WIDTH,
    height: 0.25 * WIDTH,
    borderRadius: '5%',
    backgroundColor: "#F2F2F2"
  },
  bock: {
    flex: 1,
  },
  text: {
    fontWeight: "bold"
  },
  progressBlock: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 0.01 * HEIGHT
  },
  sticker: {},
  progressBar: {},
  info: {
    color: "#A9A9A9"
  }
});
