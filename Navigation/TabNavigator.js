import { View, Text,Dimensions } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, Ionicons, Feather } from '@expo/vector-icons';
import {Map, Food, Favorites} from '../screens/index'


const {width} = Dimensions.get('window')
const MARGIN = 16
const TAB_BAR_WIDTH = width - 2*MARGIN
const TAB_WIDTH = TAB_BAR_WIDTH/3
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        showLabel: false,
        style:{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: TAB_BAR_WIDTH,
        height: 100,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        justifyContent: 'space-around'
        }
      }}
    >
        <Tab.Screen 
        name="Map" 
        component={Map} 
        options={{
          headerShown: false,
          tabBarLabel: "",
          tabBarIcon: ({focused}) => (
            focused? <View
            style={{
              height: 40,
              width: 40,
              backgroundColor:'#d20117',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius:50,
              marginTop: 20,
            }}
            >
              <Ionicons name="flame-outline" size={30} color='white' />
            </View> : 
            <View style={{marginTop:5}}>
              <Ionicons name="flame-outline" size={30} color='#d20117' />
            </View>
        
          )
        }}
        />
        <Tab.Screen 
        name="Food" 
        component={Food} 
        options={{
          headerShown: false,
          tabBarLabel: "",
          tabBarIcon: ({focused}) => (
            focused? <View
            style={{
              height: 40,
              width: 40,
              backgroundColor:'#d20117',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius:50,
              marginTop:20
            }}
            >
              <MaterialCommunityIcons name="cards-heart-outline" size={30} color='white' />
            </View> : <View style={{marginTop:5}}>
              <MaterialCommunityIcons name="cards-heart-outline" size={30} color='#d20117' />
            </View>
             
          )
        }}
        />
        <Tab.Screen 
        name="Favorites" 
        component={Favorites} 
        options={{
          headerShown: false,
          tabBarLabel: "",
          tabBarIcon: ({focused}) => (
            focused? <View
            style={{
              height: 40,
              width: 40,
              backgroundColor:'#d20117',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius:50,
              marginTop:20
            }}
            >
              <MaterialCommunityIcons name="crown-outline" size={30} color="white" />
            </View> : <View style={{marginTop:5}}>
            <MaterialCommunityIcons name="crown-outline" size={32} color="#d20117" />
            </View>
             
          )
        }}
        />
        
    </Tab.Navigator> 
  )
}

export default TabNavigator