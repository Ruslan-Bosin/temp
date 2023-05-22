/*
import React from "react";
import { useState, useEffect } from "react";
import { 
  StyleSheet, 
  SafeAreaView,
  View,
  Text,
  Switch,
  TouchableOpacity,
  Alert,
  Button
} from 'react-native';
import { StackActions } from "@react-navigation/native";
import { useIsFocused } from '@react-navigation/native';
import { Config } from "../../utils/Config";
import { get, set } from "../../utils/Storage"
import { serverIsOffAlert } from "../../utils/Alerts";
import { HEIGHT, WIDTH } from "../../utils/Size";
import { BarCodeScanner } from 'expo-barcode-scanner'

export default function ScanCode({navigation, route}) {
  
  const [hasPermission, setPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [code, setCode] = useState("empty");

  const askForCameraPermission = () => {
    (async() => {
      BarCodeScanner.getPermissionsAsync();
      const { status } = BarCodeScanner.reqer();
      console.log(status);
      console.log(status);
      console.log(status);
      setPermission(status === "granted");
    })() 
  };

  useEffect(() => {
    askForCameraPermission();
  }, []);

  const handleBarCodeScanned = ({type, data}) => {
    setScanned(true);
    setCode(data);
    console.log(data);
  };

  
  if (hasPermission === null || hasPermission === false) {
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <Text>Разрешите приложению использовать камеру</Text>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.barCodeBox}>
          <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{height: 400, width: 400}}
          />
        </View>

        {scanned && <Button title="Again" onPress={() => setScanned(false)}/>}
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: "100%"
  },
  barCodeBox: {
    alignItems: "center",
    justifyContent: 'center',
    height: 300,
    width: 300,
    overflow: "hidden",
    borderRadius: 20,
  }
});
*/

import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, SafeAreaView, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { HEIGHT, WIDTH } from "../../utils/Size";
import { Config } from "../../utils/Config";
import { get, set } from "../../utils/Storage"
import { serverIsOffAlert } from "../../utils/Alerts";
import { StackActions } from "@react-navigation/native";

export default function ScanCode({navigation, route}) {

  const [errorMessage, setErrorMessage] = useState("");

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    get("token").then((token => {
      fetch(Config.base_url + "/rest/organization/record", {
        method: "PUT",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          "x-access-token": token,
        },
        body: JSON.stringify({
          id: data
        })
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
            
            if (data["message"] == "accumulated") {
              navigation.navigate("Accumulated");
            } else {
              navigation.dispatch(StackActions.replace("Router"));
            }

          } else if (statusCode === 403) {
            serverIsOffAlert();
          } else {
            setErrorMessage("Возникла ошибка, таккого кода клиента не существует");
            setScanned(false);
          }
        }
      )
      .catch((error)=>{
        console.log("ERROR: ")
        console.log(error);
        serverIsOffAlert();
      })
    }));  
  };

  if (hasPermission === null) {
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <Text>Запрос об использовании камеры</Text>
        </View>
      </SafeAreaView>
    );
  }
  if (hasPermission === false) {
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <Text>Приложение не имеет доступа к камере</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>


    <Text style={styles.txt}>наведитесь на qr код</Text>

      <View style={styles.barCodeBox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{width: 400, height: 400}}
        />
      </View>

      <Text style={styles.errorInfo}>{errorMessage}</Text>

    </View>
  );
}

//       {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: "100%",
  },
  barCodeBox: {
    alignItems: "center",
    justifyContent: 'center',
    height: 300,
    width: 300,
    overflow: "hidden",
    borderRadius: 20,
  },
  spacer: {
    height: 0.08 * HEIGHT
  },
  spacerSmall: {
    height: 0.02 * HEIGHT
  },
  errorInfo: {
    marginTop: 0.03 * HEIGHT,
    color: "red",
    fontSize: '16%',
    textAlign: "center",
    opacity: 0.6
  },
  spacer: {
    height: 0.08 * HEIGHT
  },
  spacerSmall: {
    height: 0.02 * HEIGHT
  },
  box: {
    paddingVertical: 0.01 * HEIGHT,
    justifyContent: "space-between",
    alignItems: "center",
  },
  txt: {
    marginBottom: 0.03 * HEIGHT,
    color: "grrey",
    fontSize: '16%',
    textAlign: "center",
    opacity: 0.6
  }
});
