import React from "react";
import { useState } from "react";
import { 
  StyleSheet, 
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { WIDTH, HEIGHT } from "../../utils/Size";
import Card from "../../components/Auth/Card";

export default function SelectRole({navigation}) {

  const [currentIndex, setCurrentIndex] = useState(0);

  const onchange = (nativeEvent) => {
    if (nativeEvent) {
      const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
      if (slide != currentIndex) {
        setCurrentIndex(slide);
      }
    }
  }

  const select = () => {
    if (currentIndex === 0) {
      navigation.navigate("ClientLogin")
    } else {
      navigation.navigate("OrganizationLogin")
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Кто вы?</Text>
      <View style={styles.wraper}>
        <ScrollView
          onScroll={({nativeEvent}) => onchange(nativeEvent)}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          horizontal
          style={styles.wraper}
          alignItems={"center"}
          scrollEventThrottle={16}
        >
          {
            ["Клиент", "Организация"].map((elem, inndex) => 
              <Card key={inndex} type={elem} />
            )
          }

        </ScrollView>
      </View>
      <View style={styles.dots}>
        {
          ["0", "0"].map((e, index) => 
            <Text key={index}
              style={currentIndex == index ? styles.dotActive : styles.dotNotActive}
            >●</Text>
          )
        }
      </View>
      <View style={styles.buttonsBloack}>
        <TouchableOpacity onPress={select} style={styles.button}>
          <Text style={styles.buttonText}>Выбрать</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  }, 
  title: {
    marginTop: '15%',
    fontWeight: "bold",
    fontSize: 50,
    textAlign: 'center'
  },
  wraper: {
    height: 0.55 * HEIGHT,
    width: 1 * WIDTH,
  },
  dots: {
    flexDirection: "row",
    alignSelf: "center"
  },
  dotActive: {
    margin: 3,
    color: "black",
  },
  dotNotActive: {
    margin: 3,
    color: "grey",
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2997FF',
    height: 65,
    width: WIDTH - 60,
    borderRadius: '15%'
  },
  buttonText: {
    color: 'white'
  },
  buttonsBloack: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: '5%'
  },
});
