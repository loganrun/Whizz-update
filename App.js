import React, { useState, useEffect, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from "./Navigation/TabNavigator"
import * as Sentry from 'sentry-expo';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeBaseProvider} from 'native-base'
import {Provider} from 'react-redux';
import {store} from './store'
import * as SplashScreen from 'expo-splash-screen'
import Header from "./components/Header"
import {Map} from './screens/index';

import { Auth } from './screens/index';
import { Food } from './screens/index';
import { Favorites } from './screens/index';
import {Pee}from './screens/index'
import * as Location from 'expo-location';
const Stack = createNativeStackNavigator()
const logo = require('./assets/white_logo.png')

SplashScreen.preventAutoHideAsync();

Sentry.init({
  dsn: 'https://089403116866468aa120b8b535bbb89f@o412716.ingest.sentry.io/5291906',
  enableInExpoDevelopment: true,
  debug: true, 
});

export default function App() {

  const [location, setLocation] =useState(null)
  const [appIsReady, setAppIsReady] = useState(false);
  const [locGranted, setLocGranted] = useState(false)

  
  useEffect(() => {
    (async () => {

      try{
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied. App needs location to operate');
        return;
      }else{

        setLocGranted(true)
      }
    }catch(error){
      Sentry.Native.captureException(error);
    }

    })();
  }, []);

  useEffect( ()=>{

    const getLocation = async ()=>{
      try{
      if (locGranted === true){

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      }
    }catch(error){
      Sentry.Native.captureException(error);
    }
    }
    getLocation()

  },[locGranted])

  useEffect(()=>{
    const storage = async ()=>{

    if(location !== null){
        const jsonValue = JSON.stringify(location);
        await AsyncStorage.setItem('location', jsonValue);
        setAppIsReady(true)
    }
  }
  storage()
  }, [location])
  
  useEffect(() => {
    if (appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return <RootLayoutNav />;

  


}

function RootLayoutNav() {
  return (

    <Provider store={store}>
      <SafeAreaProvider>
      <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName= {'Dashboard'} 
        screenOptions={{headerShown: false, gestureEnabled: true}}>
          <Stack.Screen name="Auth" options={{headerShown: false,
          headerTitle: 'Setup',
          headerStyle: {
            backgroundColor: '#3480CB',
          },
          headerTintColor: '#ffff',}}  component={Auth}/>
          <Stack.Screen name="Map"   options={{headerShown: true,
          header: () => <Header logo={logo}/>}}   component={Map}/>
          <Stack.Screen name="RestRoom" options={{headerShown: true,
          headerTitle: 'RestRoom',
          headerStyle: {
            backgroundColor: '#3480CB',
          },
          headerTintColor: '#ffff',}}  component={Pee}/>
          <Stack.Screen name="Food" component={Food}/>
          <Stack.Screen name="Favourites" component={Favorites}/>
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
    </SafeAreaProvider>
    </Provider>
  
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

