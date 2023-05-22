import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Router from './screens/Router';

import Welcome from "./screens/Auth/Welcome";
import SelectRole from "./screens/Auth/SelectRole";
import ClientLogin from "./screens/Auth/Client/Login";
import ClientSignup from "./screens/Auth/Client/Signup";
import OrganizationLogin from "./screens/Auth/Organization/Login";
import OrganizationSignup from "./screens/Auth/Organization/Signup";

import Client from "./screens/Client/Client"
import ClientSettings from "./screens/Client/Settings";
import ClientUpdate from "./screens/Client/Update";

import Organization from "./screens/Organization/Organization"
import EnterCode from "./screens/Organization/EnterCode"
import ScanCode from "./screens/Organization/ScanCode";
import Accumulated from "./screens/Organization/Accumulated";
import OrganizationSettings from "./screens/Organization/Settings";
import OrganizationUpdate from "./screens/Organization/Update";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Router" component={Router} options={{animation: "fade_from_bottom"}}/>

        <Stack.Screen name="Welcome" component={Welcome} options={{animation: "none"}}/>
        <Stack.Screen name="SelectRole" component={SelectRole}/>
        <Stack.Screen name="ClientLogin" component={ClientLogin}/>
        <Stack.Screen name="ClientSignup" component={ClientSignup}/>
        <Stack.Screen name="OrganizationLogin" component={OrganizationLogin}/>
        <Stack.Screen name="OrganizationSignup" component={OrganizationSignup}/>

        <Stack.Screen name="Client" component={Client} options={{animation: "none"}}/>
        <Stack.Screen name="ClientSettings" component={ClientSettings}/>
        <Stack.Screen name="ClientUpdate" component={ClientUpdate}/>

        <Stack.Screen name="Organization" component={Organization} options={{animation: "none"}}/>
        <Stack.Screen name="EnterCode" component={EnterCode}/>
        <Stack.Screen name="ScanCode" component={ScanCode}/>
        <Stack.Screen name="Accumulated" component={Accumulated}/>
        <Stack.Screen name="OrganizationSettings" component={OrganizationSettings}/>
        <Stack.Screen name="OrganizationUpdate" component={OrganizationUpdate}/>


      </Stack.Navigator>
    </NavigationContainer>
  );
}
