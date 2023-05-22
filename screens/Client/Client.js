import React from "react";
import { useState, useEffect } from "react";
import { 
    StyleSheet,
    View,
    ScrollView,
    RefreshControl,
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackActions } from "@react-navigation/native";
import { Config } from "../../utils/Config";
import { get, set } from "../../utils/Storage"
import { serverIsOffAlert } from "../../utils/Alerts";
import { HEIGHT, WIDTH } from "../../utils/Size";
import Header from "../../components/Client/Header";
import Qr from "../../components/Client/Qr";
import Card from "../../components/Client/Card";


export default function Client({navigation}) {

  const [refreshing, setRefreshing] = useState(false);
  const [id, setId] = useState(-1);
  const [name, setName] = useState("no internet");
  const [list, setList] = useState([]);

  useEffect(() => {
    onRefreshPull();
  }, []);

  const onRefreshPull = () => {
    setRefreshing(true);

    get("token").then((token => {
      fetch(Config.base_url + "/rest/client/active", {
        method: "GET",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          "x-access-token": token,
        },
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
            setList(data);
          } else if (statusCode === 401) {
            Alert.alert("Ошибка", "Срок действия сессии исёк, авторизируйтесь для продолжения");
            navigation.dispatch(StackActions.replace("SelectRole"));
          } else {
            serverIsOffAlert();
          }
          setRefreshing(false);
        }
      )
      .catch((error)=>{
        serverIsOffAlert();
        setRefreshing(false);
      })

      fetch(Config.base_url + "/rest/client/info", {
        method: "GET",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          "x-access-token": token,
        },
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
            setId(data["id"]);
            setName(data["name"]);
          }
        }
      )
      .catch((error)=>{})

    }));

  };

  const openSettings = () => {
    if (name === "no internet") {
      serverIsOffAlert();
    } else if (name == "temp-user") {

    } else {
      navigation.navigate("ClientSettings");
    }
  };

  const renderCard = (item, index) => {
    return (
      <View key={index}>
        <Card
          title={item.title}
          image={item.image}
          sticker={item.sticker}
          accumulated={item.accumulated}
          limit={item.limit}
        />
        <View style={{height: 20}} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefreshPull}
          />
        }
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        <View style={styles.spacer}/>
        <Header text="Мой qr код" showButton={true} onPress={openSettings}/>
        <Qr id={id.toString()} alertOnPress={true}/>

        { list.length === 0 ? null :
        <View>
          <View style={styles.spacerSmall}/>
          <Header text="Активные" showButton={false}/>

          { list.map(renderCard) }

          <View style={{height: 0.3 * HEIGHT}} />
        </View>
        }

      </ScrollView>
    </SafeAreaView>
  );

}

const styles = StyleSheet.create({
  scrollView: {
    marginHorizontal: 0.03 * WIDTH,
    height: '100%'
  },
  spacer: {
    height: 0.08 * HEIGHT
  },
  spacerSmall: {
    height: 0.02 * HEIGHT
  }
});