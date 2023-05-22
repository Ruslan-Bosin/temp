import React from "react";
import { 
  StyleSheet, 
  View,
} from 'react-native';
import { WIDTH, HEIGHT } from "../utils/Size";


export default function ProgressBar({value}) {

  return (
    <View style={styles.box}>

      <View style={[styles.inner, {width: value + "%"}]}/>

    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    borderRadius: '5%',
    backgroundColor: "#F2F2F2",
    height: '70%',
  },
  inner: {
    flex: 1,
    borderRadius: '5%',
    backgroundColor: "#007AFF",
  }
});
