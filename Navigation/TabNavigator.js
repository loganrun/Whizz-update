import { View, Text,Dimensions } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, Ionicons, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {Map, Food, Favorites} from '../screens/index'
import Logo from "../components/Logo"
import Logo2 from "../components/Logo3"
import Logo3 from "../components/Logo3"


const {width} = Dimensions.get('window')
const MARGIN = 16
const TAB_BAR_WIDTH = width - 2*MARGIN
const TAB_WIDTH = TAB_BAR_WIDTH/3
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const navigation = useNavigation()

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
          
          headerShown: true,
          header: () =><Logo2/>, 
          headerTitle: ()=><Logo2 navigation={navigation}/>,
          tabBarLabel: "Restrooms",
          tabBarIcon: ({focused}) => (
            focused? <View
            style={{
              //height: 40,
              //width: 40,
              //backgroundColor:'#3480CB',
              //justifyContent: 'center',
              //alignItems: 'center',
              //borderRadius:50,
              //marginTop: 20,
            }}
            >
              <Ionicons name="ios-search" size={30} color='#3480CB' />
            </View> : 
            <View >
              <Ionicons name="ios-search" size={30} color='gray' />
            </View>
        
          )
        }}
        />
        <Tab.Screen 
        name="Food" 
        component={Food} 
        options={{
          headerShown: true,
          headerTitle: 'Food',
          headerStyle: {
            backgroundColor: '#3480CB',
          },
          headerTintColor: '#ffff',
          tabBarLabel: "Food",
          tabBarIcon: ({focused}) => (
            focused? <View
            style={{
              // height: 40,
              // width: 40,
              // backgroundColor:'#d20117',
              // justifyContent: 'center',
              // alignItems: 'center',
              // borderRadius:50,
              // marginTop:20
            }}
            >
              <Ionicons name="ios-restaurant" size={30} color='#3480CB' />
            </View> : <View>
              <Ionicons name="ios-restaurant" size={30} color='gray' />
            </View>
             
          )
        }}
        />
        <Tab.Screen 
        name="Favorites" 
        component={Favorites} 
        options={{
          headerShown: true,
          headerTitle: 'Favorite',
          headerStyle: {
            backgroundColor: '#3480CB',
          },
          headerTintColor: '#ffff',
          tabBarLabel: "Favorite",
          tabBarIcon: ({focused}) => (
            focused? <View
            style={{
              // height: 40,
              // width: 40,
              // backgroundColor:'#d20117',
              // justifyContent: 'center',
              // alignItems: 'center',
              // borderRadius:50,
              // marginTop:20
            }}
            >
              <Ionicons name="ios-heart" size={30} color='#3480CB' />
            </View> : <View>
            <Ionicons name="ios-heart" size={32} color='gray' />
            </View>
             
          )
        }}
        />
        
    </Tab.Navigator> 
  )
}

export default TabNavigator