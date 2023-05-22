import React from "react";
import { useState } from "react";
import { 
  StyleSheet, 
  View,
  Text,
} from 'react-native';
import { Config } from "../../utils/Config";
import { WIDTH, HEIGHT } from "../../utils/Size";
import ProgressBar from "../ProgressBar";


export default function Card({accumulated, limit, name, is_private}) {

    var name_to_show = "Имя скрыто";
    if (is_private == false) {
        name_to_show = name;
    }

  return (
    <View style={styles.box}>

      <View style={styles.spacer} />
      <View style={styles.bock}>
        <Text style={styles.text} numberOfLines="2">{name_to_show}</Text>
        <View style={styles.progressBlock}>
            <View style={styles.test}></View>
          <ProgressBar style={styles.progressBar} value={(accumulated / limit) * 100}/>          
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
  },
  test: {
    width: 0,
    height: 0.025 * HEIGHT
  }
});
