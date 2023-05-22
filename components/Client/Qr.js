import React from "react";
import { useState } from "react";
import { 
  StyleSheet, 
  View,
  TouchableOpacity,
  Alert
} from 'react-native';
import { serverIsOffAlert } from "../../utils/Alerts";
import { WIDTH, HEIGHT } from "../../utils/Size";
import QRCode from "react-native-qrcode-svg"

export default function Qr({id, alertOnPress}) {

  const qrCodePress = () => {
    if (id == -1) {
      serverIsOffAlert();
    } else {
      Alert.alert("Предъявите qr код или назовите код: " + id, "")
    }
  };

  if (alertOnPress) {
    return (
      <TouchableOpacity onPress={qrCodePress} activeOpacity={0.8}>
        <View style={styles.box}>
          <QRCode
            value={id}
            size={0.85 * WIDTH}
          />
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.box}>
      <QRCode
        value={id}
        size={0.85 * WIDTH}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '15%',
    backgroundColor: "white",
    height: 0.94 * WIDTH
  }
});
