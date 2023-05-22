import React from "react";
import { Alert } from 'react-native';

function serverIsOffAlert() {
    Alert.alert("Ошибка", "Не удаётся получить ответ от сервера, перезапустите приложение и попробуйте снова");
}

export { serverIsOffAlert };
