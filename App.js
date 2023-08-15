import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from "./Navigation/TabNavigator"
import { SafeAreaProvider } from 'react-native-safe-area-context';
//import AppLoading from 'expo-app-loading';
//import { useFonts } from 'expo-font';
//import {MainLayout} from './src/screens';
import MapView from 'react-native-maps';
import {Maps} from './screens/index';
import { Food } from './screens/index';
import { Favorites } from './screens/index';
import * as Location from 'expo-location';



const Stack = createNativeStackNavigator()


export default function App() {

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName= {'Dashboard'} 
        screenOptions={{headerShown: true, gestureEnabled: true}}>
          <Stack.Screen name="Map" component={TabNavigator}/>
          <Stack.Screen name="Food" component={Food}/>
          <Stack.Screen name="Favourites" component={Favorites}/>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map:{
    width: '100%',
    height: '100%'
  }
});

