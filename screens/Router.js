import React from "react";
import { 
    StyleSheet, 
    View,
    ActivityIndicator
} from 'react-native';
import { StackActions } from "@react-navigation/native";
import { get, set } from "../utils/Storage";

export default function Router({navigation}) {

  // set("role", "NONE");

  get("role").then((role) => {
    if (role == "client") {
      navigation.dispatch(StackActions.replace("Client"));
    } else if (role == "organization") {
      navigation.dispatch(StackActions.replace("Organization"));
    } else {
      navigation.dispatch(StackActions.replace("Welcome"));
    }
  });

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large"/>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  }, 
});