import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from "./Navigation/TabNavigator"
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import rootReducer from './store/reducers';
// import thunk from 'redux-thunk'
// import { configureStore } from '@reduxjs/toolkit'
import {Provider} from 'react-redux';
import * as SplashScreen from 'expo-splash-screen'
import {store} from './store'
//import AppLoading from 'expo-app-loading';
//import { useFonts } from 'expo-font';
//import {MainLayout} from './src/screens';

//import MapView from 'react-native-maps';
import {Maps} from './screens/index';
import { Food } from './screens/index';
import { Favorites } from './screens/index';
import { useSelector, useDispatch } from 'react-redux';
import { getLocationStart, getLocationSuccess, getLocationFailed } from './locationSlice'
import * as Location from 'expo-location';



const Stack = createNativeStackNavigator()
//const store = configureStore({reducer:rootReducer})

SplashScreen.preventAutoHideAsync();

export default function App() {

  const dispatch = useDispatch()
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      dispatch(getLocationSuccess(location))
      const jsonValue = JSON.stringify(location);
      await AsyncStorage.setItem('location', jsonValue);
      //console.log(location)
      setLoaded(true)

    })();
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

