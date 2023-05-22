import * as SecureStore from 'expo-secure-store';

async function set(key, value) {
  await SecureStore.setItemAsync(key, value);
}

async function get(key) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    return result;
  } else {
    return "NONE";
  }
}

export { set, get };
