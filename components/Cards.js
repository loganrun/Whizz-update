//import { Text, View, Button } from 'react-native';
//import { useState } from 'react';
import {

    Platform,Text,View,
    
    Image,ActivityIndicator, StyleSheet,Dimensions, TouchableOpacity, Animated, FlatList
} from "react-native";
import {HStack,Card,VStack} from "native-base";
import { useNavigation } from '@react-navigation/native';
import {useDispatch, useSelector } from 'react-redux';
let tprating = require("../assets/TPratings_5Stars.png")
let genericFood = require('../assets/SEARCH-lower-card-generic-img-1.png')
let unverified = require('../assets/mascot-01-unverified-349x161.png')
let verified = require('../assets/mascot-01-verified-329x161.png')
let premicon = require('../assets/pin-verified.png')
let regIcon = require('../assets/pin-unverified.png')
const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 180;
const CARD_WIDTH = width * 0.80;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

export default function MyListItem(props) {
    const distance = props.item.distance.toString().slice(0, 4)
    const location = useSelector((state) => state.location.location)
    const navigation = useNavigation()
    
    return (
        // <View>
        //     <Card style={styles.card}>
        //      <Left style={{paddingLeft: 2}}>
        //      <Image resizeMode={'cover'} source={genericFood}style={{width: 145, height: 155,flex:1}}/>
        //      </Left>  
        //      <CardItem style={{flexDirection: 'column', width: 180}}>
            //  <Right style={{alignItems: 'flex-end',}}>
            //      <Text numberOfLines={1} style={{fontWeight: 'bold',textTransform: 'capitalize', color: '#173E81', fontSize: 15}}>{props.item.name}</Text>
            //      <Text numberOfLines={1} style={{fontSize:13, marginBottom:5}}>{ props.item.street}</Text>
            //      <Text style={{width: 120, height: 30}}><Image resizeMode={'cover'} source={tprating}style={{width:120, height: 25}}/></Text>
            //      {/* <Text>Distance: {distance} miles</Text> */}
            //      <Image resizeMode={'cover'} source={unverified}style={{width: 160, height: 75}}/> 
            //  </Right>
        //      </CardItem>
        //     </Card>

        // </View>
        
        <View>
     <TouchableOpacity 
            onPress={() => {
              const eventProp = {
                id: props.item.id,
                name: props.item.name,
                street: props.item.street,
                city: props.item.city,
                distance: distance
              }
            
            navigation.navigate("RestRoom", {
              id: props.item.id,
              item: props.item,
              distance: distance,
              currentLat: location.loc.latitude,
              currentLon: location.loc.longitude
            })}}
            >
    <Card style={styles.card}>
      <HStack style={{paddingTop: 5,paddingRight: 5}}>
      <Image resizeMode={'contain'} source={verified}style={{width: 120, height: 120}}/> 
      </HStack>
      <VStack style={{paddingTop: 30, paddingRight:4}}>
      <Text numberOfLines={1} style={{fontWeight: 'bold',textTransform: 'capitalize', color: '#173E81', fontSize: 15}}>{props.item.name}</Text>
        <Text numberOfLines={1} style={{fontSize:13, marginBottom:5}}>{ props.item.street}</Text>
        <Text>Distance: {distance} miles</Text>
        <Text style={{width: 120, height: 30}}><Image resizeMode={'cover'} source={tprating}style={{width:120, height: 25}}/></Text>
      </VStack>
    </Card>
    </TouchableOpacity>

    </View>
        
    );
}
// import { View, Text } from 'react-native'
// import React from 'react'
// import {

//     Platform,
    
//     Image,ActivityIndicator, StyleSheet,Dimensions, TouchableOpacity, Animated, FlatList
// } from "react-native";
// import {Left,Right,Icon,Card,CardItem,Row,Button} from "native-base";
// let tprating = require("../assets/TPratings_5Stars.png")
// let genericFood = require('../assets/SEARCH-lower-card-generic-img-1.png')
// let unverified = require('../assets/mascot-01-unverified-349x161.png')
// let verified = require('../assets/mascot-01-verified-329x161.png')
// let premicon = require('../assets/pin-verified.png')
// let regIcon = require('../assets/pin-unverified.png')
// const { width, height } = Dimensions.get("window");
// const CARD_HEIGHT = 180;
// const CARD_WIDTH = width * 0.80;
// const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

// export default function Cards(props) {
//     const distance = props.item.distance.toString().slice(0, 4)
//     if(props.item.verified){
//         return (
//         <View>
//             <TouchableOpacity 
//             // onPress={() => {
//             //   const eventProp = {
//             //     id: props.item.id,
//             //     name: props.item.name,
//             //     street: props.item.street,
//             //     city: props.item.city,
//             //     distance: distance
//             //   }
//             //   Amplitude.logEventWithPropertiesAsync("RESTAURANT_SELECT", eventProp)
//             // this.props.navigation.navigate("Pee", {
//             //   id: item.id,
//             //   item,
//             //   distance: distance,
//             //   currentLat: this.state.region.latitude,
//             //   currentLon: this.state.region.longitude
//             // })}}
//             >
//             <Card style={styles.card}>
//             <Left style={{paddingLeft: 2}}>
//             <Image resizeMode={'cover'} source={{uri:props.item.lowerCard}} style={{width: 145, height: 155,flex:1}}/>
//             </Left> 
//             <CardItem style={{flexDirection: 'column', width: 180}}>
//             <Right style={{alignItems: 'flex-end',}}>
//                 <Text numberOfLines={1} style={{fontWeight: 'bold',textTransform: 'capitalize', color: '#173E81', fontSize: 15}}>{props.item.name}</Text>
//                 <Text numberOfLines={1} style={{fontSize:13}}>{props.item.street}</Text>
//                 <Text style={{width: 120, height: 30}}><Image resizeMode={'cover'} source={tprating}style={{width:120, height: 25}}/></Text>
//                 <Text>Distance: {distance} miles</Text>
//                 <Image resizeMode={'cover'} source={verified}style={{width: 160, height: 75}}/>
//             </Right>
//             </CardItem>
//         </Card>
//             </TouchableOpacity>
//         </View>
//     )

//     }else{  
//     return (
//         <View>
//         <TouchableOpacity 
//         //   onPress={() => {
//         //     const eventProp = {
//         //       id: props.item.id,
//         //       name:  props.item.name,
//         //       street:  props.item.street,
//         //       city:  props.item.city,
//         //       distance: distance
//         //     }
//         //     Amplitude.logEventWithPropertiesAsync("RESTAURANT_SELECT", eventProp)
//         //   this.props.navigation.navigate("Pee", {
//         //     id:  props.item.id,
//         //     item,
//         //     distance: distance,
//         //     currentLat: this.state.region.latitude,
//         //     currentLon: this.state.region.longitude
//         //   })}}
//         >
//         <Card style={styles.card}>
//             <Left style={{paddingLeft: 2}}>
//             <Image resizeMode={'cover'} source={genericFood}style={{width: 145, height: 155,flex:1}}/>
//             </Left>  
//             <CardItem style={{flexDirection: 'column', width: 180}}>
//             <Right style={{alignItems: 'flex-end',}}>
//                 <Text numberOfLines={1} style={{fontWeight: 'bold',textTransform: 'capitalize', color: '#173E81', fontSize: 15}}>{props.item.name}</Text>
//                 <Text numberOfLines={1} style={{fontSize:13, marginBottom:5}}>{ props.item.street}</Text>
//                 <Text style={{width: 120, height: 30}}><Image resizeMode={'cover'} source={tprating}style={{width:120, height: 25}}/></Text>
//                 <Text>Distance: {distance} miles</Text>
//                 <Image resizeMode={'cover'} source={unverified}style={{width: 160, height: 75}}/> 
//             </Right>
//             </CardItem>
//         </Card>
//         </TouchableOpacity>
//         </View>
//     )
//         }
// }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
    map: {
        width: '100%',
        height: '100%'
    },
    tool:{
        width: 250,
        height: 75,
        backgroundColor: '#fff',
        borderRadius: 10
    },
    searchBox: {
        position:'absolute', 
        marginTop: Platform.OS === 'ios' ? 40 : 20, 
        flexDirection:"row",
        backgroundColor: '#fff',
        width: '90%',
        alignSelf:'center',
        borderRadius: 5,
        padding: 10,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
    },
    chipsScrollView: {
        position:'absolute', 
        top:Platform.OS === 'ios' ? 90 : 80, 
        paddingHorizontal:10
      },
      chipsIcon: {
        marginRight: 5,
      },
      chipsItem: {
        position:'absolute', 
        top: 30, //Platform.OS === 'ios' ? 40 : 30, 
        paddingHorizontal:10,
        flexDirection:"row",
        alignSelf:'center',
        backgroundColor:'#fff', 
        borderRadius:20,
        padding:8,
        paddingHorizontal:20, 
        marginHorizontal:10,
        height:35,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10
        
      },
      scrollView: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 10,
      },
      endPadding: {
        paddingRight: width - CARD_WIDTH,
      },
      card: {
        // padding: 10,
        flexDirection: "row",
        elevation: 2,
        //backgroundColor: "#FFF",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        //marginHorizontal: 10,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: { x: 2, y: -2 },
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        overflow: "hidden",
        padding: 0
      },
      cardImage: {
        flex: 3,
        width: "100%",
        height: "100%",
        alignSelf: "center",
      },
      textContent: {
        flex: 2,
        padding: 10,
      },
      cardtitle: {
        fontSize: 12,
        // marginTop: 5,
        fontWeight: "bold",
      },
      cardDescription: {
        fontSize: 12,
        color: "#444",
      },
      markerWrap: {
        alignItems: "center",
        justifyContent: "center",
        width:50,
        height:50,
      },
      marker: {
        width: 30,
        height: 30,
      },
      button: {
        alignItems: 'center',
        marginTop: 5
      },
      signIn: {
          width: '100%',
          padding:5,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 3
      },
      textSign: {
          fontSize: 16,
          fontWeight: 'bold',
          color: '#173E81'
          
      }
    });
    