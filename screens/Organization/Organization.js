import React from "react";
import { useState, useEffect } from "react";
import { 
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
  Alert,
  TouchableOpacity,
  Text
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackActions } from "@react-navigation/native";
import { Config } from "../../utils/Config";
import { get, set } from "../../utils/Storage"
import { serverIsOffAlert } from "../../utils/Alerts";
import { HEIGHT, WIDTH } from "../../utils/Size";
import Header from "../../components/Client/Header";
import Card from "../../components/Organization/Card";

export default function Organization({navigation}) {

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
      fetch(Config.base_url + "/rest/organization/clients", {
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

      fetch(Config.base_url + "/rest/organization/info", {
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
    } else {
      navigation.navigate("OrganizationSettings");
    }
  };

  const renderCard = (item, index) => {
    return (
      <View key={index}>
        <Card
          name={item.name}
          accumulated={item.accumulated}
          limit={item.limit}
          is_private={item.is_private}
        />
        <View style={{height: 20}} />
      </View>
    );
  };

  const enterCodeButtonPress = () => {
    navigation.navigate("EnterCode");
  };

  const scanCodeButtonPress = () => {
    navigation.navigate("ScanCode");
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
        <Header text="Организация" showButton={true} onPress={openSettings}/>
        
        <TouchableOpacity onPress={scanCodeButtonPress} activeOpacity={0.8}>
          <View style={styles.QS_box}>
            <Text>Отканировать QR код</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.spacerSmall}/>

        <TouchableOpacity onPress={enterCodeButtonPress} activeOpacity={0.8}>
          <View style={styles.ME_box}>
            <Text style={styles.ME_text}>Ввести вручную</Text>
          </View>
        </TouchableOpacity>
        

        { list.length === 0 ? null :
        <View>
          <View style={styles.spacerSmall}/>
          <Header text="Клиенты" showButton={false}/>

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
  },
  ME_box: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '15%',
    backgroundColor: "#007AFF",
    height: 0.16 * WIDTH,
  },
  ME_text: {
    color: "white"
  },
  QS_box: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '15%',
    backgroundColor: "white", // EAEAEA
    height: 0.8 * WIDTH,
    borderColor: "#EAEAEA",
    borderWidth: 2
  }
});