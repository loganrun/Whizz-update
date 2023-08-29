import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from "./Navigation/TabNavigator"
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeBaseProvider} from 'native-base'
import {Provider} from 'react-redux';
import {store} from './store'
import * as SplashScreen from 'expo-splash-screen'




//import AppLoading from 'expo-app-loading';
//import { useFonts } from 'expo-font';
//import {MainLayout} from './src/screens';
import { Auth } from './screens/index';
// import {Maps} from './screens/index';
import { Food } from './screens/index';
import { Favorites } from './screens/index';
import {Pee}from './screens/index'
import * as Location from 'expo-location';


const Stack = createNativeStackNavigator()

SplashScreen.preventAutoHideAsync();

export default function App() {

  const [errorMsg, setErrorMsg] = useState(null);
  const [loaded, setLoaded] = useState(true)

  useEffect(() => {
    const getLocation = async () =>{
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      const jsonValue = JSON.stringify(location);
      await AsyncStorage.setItem('location', jsonValue);

      setLoaded(true)
    }
    
    getLocation()
  }, []);

  // useEffect(() => {
  //   if (error) throw error;
  // }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;

  
}

function RootLayoutNav() {
  return (

    <Provider store={store}>
      <NativeBaseProvider>
      <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName= {'Dashboard'} 
        screenOptions={{headerShown: true, gestureEnabled: true}}>
          <Stack.Screen name="Auth" component={Auth}/>
          <Stack.Screen name="Map" component={TabNavigator}/>
          <Stack.Screen name="RestRoom" component={Pee}/>
          <Stack.Screen name="Food" component={Food}/>
          <Stack.Screen name="Favourites" component={Favorites}/>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
    </NativeBaseProvider>
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

