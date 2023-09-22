import React, { useState, useEffect, useCallback } from 'react';
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
import Logo2 from './components/Logo2'




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
        //console.log("loc granted")
        setLocGranted(true)
      }
    }catch(e){
      console.log(e)
    }

    })();
  }, []);

  //console.log(locGranted)

  useEffect( ()=>{

    const getLocation = async ()=>{
      try{
      if (locGranted === true){

      let location = await Location.getCurrentPositionAsync({});
      //console.log("location set")
      setLocation(location);

      }
    }catch(e){
      console.log(e)
    }
    }
    getLocation()

  },[locGranted])

  //console.log(location)

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
  //console.log(location)

  //console.log(appIsReady)
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
          <Stack.Screen name="Map"   component={TabNavigator}/>
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

