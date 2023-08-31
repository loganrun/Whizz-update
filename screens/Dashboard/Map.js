import { useRef, useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
    View,
    Platform,
    Text,
    Image,ActivityIndicator, StyleSheet,Dimensions, TouchableOpacity, Animated, FlatList
} from "react-native";
import { FlashList } from '@shopify/flash-list';
//import {Left,Right,Icon,Card,CardItem,Row,Button} from "native-base";
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, { Callout, Marker,PROVIDER_GOOGLE} from 'react-native-maps';
import {useDispatch, useSelector } from 'react-redux';
import { getLocationStart, getLocationSuccess, getLocationFailed } from '../../locationSlice'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import restApi from "../../services/restroom"
import refugeeApi from "../../services/refugee"
import axios from 'axios'
import Cards from '../../components/Cards'
let tprating = require("../../assets/TPratings_5Stars.png")
let genericFood = require('../../assets/SEARCH-lower-card-generic-img-1.png')
let unverified = require('../../assets/mascot-01-unverified-349x161.png')
let verified = require('../../assets/mascot-01-verified-329x161.png')
let premicon = require('../../assets/pin-verified.png')
let regIcon = require('../../assets/pin-unverified.png')
const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 180;
const CARD_WIDTH = width;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;
//let newAn = scrollX(new Animated.Value(0)).current;
//console.log(scrollX)
const scrollX = new Animated.Value(0);
 
let mapIndex = 0

export default function MainMap() {

    const location = useSelector((state) => state.location.location)
    const restroom = useSelector((state)=> state.restrooms.restrooms)
    const flashListRef = useRef(null);
    const navigation = useNavigation()
    const [bathroom, setBathroom] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(true);
    const [region, setRegion] = useState({
        latitude: 0.0,
        longitude: 0.0,
        latitudeDelta: 0.072,
        longitudeDelta: 0.070,
    });

    //console.log(restroom)
    useEffect(()=>{

        setRegion({
            latitude: location.loc.latitude,
            longitude: location.loc.longitude,
            latitudeDelta: 0.072,
            longitudeDelta: 0.070,
        })

        setBathroom(restroom)
        // console.log('restroom loaded')

    },[])

    // useEffect(()=>{
    //     setRegion({
    //         latitude: location.loc.latitude,
    //         longitude: location.loc.longitude,
    //         latitudeDelta: 0.072,
    //         longitudeDelta: 0.070,
    //     })

    //     //console.log('map coords')

        
    //     //setLoading(false)
    //     //console.log('loading false')

    // }, [])

    // useEffect(()=>{

    //     //loadRestrooms()

    // }, [])

    const loadRestrooms = async () => {
    
        try{
    
        let params = {
            lat: region.latitude,
            lng: region.longitude
        };

        const result = await axios.all([
            
            refugeeApi.get('/v1/restrooms/by_location',{params}),
            restApi.get('/',{ params })
            
        ]).then(axios.spread((...responses) =>{
            let response1 = responses[0].data;
            let response2 = responses[1].data;
            let prelim = response2.concat(response1);
    
            return prelim
        })).catch(err =>{
            console.log("error", err.message);
        })
    
        // const  bathroom = await result.reduce((acc, current) =>{
        //     const x = acc.find(item => item.street === current.street);
        //     if (!x){
        //     return acc.concat([current]);
        //     }else{
        //     return acc;
        //     }
    
        // }, []  
        // )
        //setBathroom(result)
        // setLoading(false)
    
        } catch (e) {
        console.log("error", e.message);
        }
    };

const createMarkers= () => {
    console.log('createMarkers called')
    return bathroom.map((marker, index) =>{ 
        //console.log(marker)
    return (
        
    <Marker
    key={index}
    coordinate={{latitude: marker.latitude, longitude: marker.longitude}}
    image={premicon}
    //image= {{require('../../assets/pin-verified.png')}}
    //coordinate={marker.latlng}
    //title={marker.title}
    //description={marker.description}
    />
    
    
)})
    //    // const { navigate } = this.props.navigation;
        //     return bathroom.map((item, index) => {
        
        // if(Platform.OS === 'android' && item.verified){
        // return (
        // <MapView.Marker
        //     key= {index}
        //     coordinate={{
        //         latitude: item.latitude,
        //         longitude: item.longitude
        //     }}
            
        //     image={premicon}
            
    //        // onPress={() => {
    //         //     const markerProp = {
    //         //     id: item.id,
    //         //     name: item.name,
    //         //     street: item.street,
    //         //     city: item.city,
    //         //     distance: item.distance
    //         //     }
                
    //         //     // this.flatListRef.scrollToIndex({animated: true, index: index})
    //         //     }}
        //         >
                
        // </MapView.Marker>
        //     )
        //     }if(!item.verified){
        //     return (
        //         <MapView.Marker
        //         key= {index}
        //         coordinate={{
        //         latitude: item.latitude,
        //         longitude: item.longitude
        //         }}

        //         image={regIcon}
    //             // onPress={() => {
    //             // const markerProp = {
    //             // id: item.id,
    //             // name: item.name,
    //             // street: item.street,
    //             // city: item.city,
    //             // distance: item.distance
    //             // }
    //             // // Amplitude.logEventWithPropertiesAsync("MARKER_SELECT", markerProp)
    //             // // this.flatListRef.scrollToIndex({animated: true, index: index})
    //             // }}
                
            //     >
        
            //     </MapView.Marker>
            // )
    
            // }else{
            // if(item.verified){
            //     return (
            //     <MapView.Marker
            //     key= {index}
            //     coordinate={{
            //         latitude: item.latitude,
            //         longitude: item.longitude
            //     }}
            //       //title={item.name}
            //     image={premicon}
    //               //style={{height: 30, width: 30}}
    //             // onPress={() => {
    //             //     const markerProp = {
    //             //     id: item.id,
    //             //     name: item.name,
    //             //     street: item.street,
    //             //     city: item.city,
    //             //     distance: item.distance
    //             //     }
    //                 // Amplitude.logEventWithPropertiesAsync("MARKER_SELECT", markerProp)
    //                 // this.flatListRef.scrollToIndex({animated: true, index: index})
                    
    //             //}}
                
            // >
            // </MapView.Marker>
            //     ) ;
            // }else{
    
            //     return (
            //     <MapView.Marker
            //     key= {index}
            //     coordinate={{
            //         latitude: item.latitude,
            //         longitude: item.longitude
            //     }}
            //       //title={item.name}
            //     image={regIcon}
    //               //style={{height: 30, width: 30}}
    //             // onPress={() => {
    //             //     const markerProp = {
    //             //     id: item.id,
    //             //     name: item.name,
    //             //     street: item.street,
    //             //     city: item.city,
    //             //     distance: item.distance
    //             //     }
    //             //     // Amplitude.logEventWithPropertiesAsync("MARKER_SELECT", markerProp)
    //             //     // this.flatListRef.scrollToIndex({animated: true, index: index})
                    
    //             // }}
        //         >
                    
        // </MapView.Marker>
        //         )
        //     }
        //     }
        // });
    }

    // const renderItem = ({ item }) => (
    //     //console.log(item)


    //      //const distance = item.distance.toString().slice(0, 4)
    // //     if(item.verified){
          
    //         <View>
    //           <TouchableOpacity 
    //         //   onPress={() => {
    //         //     const eventProp = {
    //         //       id: item.id,
    //         //       name: item.name,
    //         //       street: item.street,
    //         //       city: item.city,
    //         //       distance: distance
    //         //     }
    //         //     Amplitude.logEventWithPropertiesAsync("RESTAURANT_SELECT", eventProp)
    //         //   this.props.navigation.navigate("Pee", {
    //         //     id: item.id,
    //         //     item,
    //         //     distance: distance,
    //         //     currentLat: this.state.region.latitude,
    //         //     currentLon: this.state.region.longitude
    //         //   })}}
    //           >
    //           <Card style={styles.card}>
    //           <Left style={{paddingLeft: 2}}>
    //             <Image resizeMode={'cover'} source={{uri:item.lowerCard}} style={{width: 145, height: 155,flex:1}}/>
    //           </Left> 
    //             <CardItem style={{flexDirection: 'column', width: 180}}>
    //             <Right style={{alignItems: 'flex-end',}}>
    //               <Text numberOfLines={1} style={{fontWeight: 'bold',textTransform: 'capitalize', color: '#173E81', fontSize: 15}}>{item.name}</Text>
    //               <Text numberOfLines={1} style={{fontSize:13}}>{item.street}</Text>
    //               <Text style={{width: 120, height: 30}}><Image resizeMode={'cover'} source={tprating}style={{width:120, height: 25}}/></Text>
    //               <Text>Distance: {distance} miles</Text>
    //               <Image resizeMode={'cover'} source={verified}style={{width: 160, height: 75}}/>
    //             </Right>
    //             </CardItem>
    //         </Card>
    //           </TouchableOpacity>
    //         </View>
        
    //       )
    // //     }else{
        
    // //     return (
    // //       <View>
            // <TouchableOpacity 
            // // onPress={() => {
            // //   const eventProp = {
            // //     id: item.id,
            // //     name: item.name,
            // //     street: item.street,
            // //     city: item.city,
            // //     distance: distance
            // //   }
            // //   Amplitude.logEventWithPropertiesAsync("RESTAURANT_SELECT", eventProp)
            // // this.props.navigation.navigate("Pee", {
            // //   id: item.id,
            // //   item,
            // //   distance: distance,
            // //   currentLat: this.state.region.latitude,
            // //   currentLon: this.state.region.longitude
            // // })}}
            // >
    // //         <Card style={styles.card}>
    // //           <Left style={{paddingLeft: 2}}>
    // //           <Image resizeMode={'cover'} source={genericFood}style={{width: 145, height: 155,flex:1}}/>
    // //           </Left>  
    // //             <CardItem style={{flexDirection: 'column', width: 180}}>
    // //             <Right style={{alignItems: 'flex-end',}}>
    // //               <Text numberOfLines={1} style={{fontWeight: 'bold',textTransform: 'capitalize', color: '#173E81', fontSize: 15}}>{item.name}</Text>
    // //               <Text numberOfLines={1} style={{fontSize:13, marginBottom:5}}>{item.street}</Text>
    // //               <Text style={{width: 120, height: 30}}><Image resizeMode={'cover'} source={tprating}style={{width:120, height: 25}}/></Text>
    // //               <Text>Distance: {distance} miles</Text>
    // //               <Image resizeMode={'cover'} source={unverified}style={{width: 160, height: 75}}/> 
    // //             </Right>
    // //             </CardItem>
    // //         </Card>
    // //         </TouchableOpacity>
    // //       </View>
    // //   )
    // //       }
    //   }
        
    if (!bathroom && !region) {
        return (
        <View style={{flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator size="large" />
        </View>
        );
    }
    
return (
    <View style={styles.container}>
    <MapView style={styles.map}
    initialRegion={{
        longitude:location.loc.longitude,//-118.243683, //region.longitude,//-118.243683, //this.props.location.longitude,
        latitude: location.loc.latitude, //34.052235, //region.latitude,//34.052235, //this.props.location.latitude,location.loc.latitude
        latitudeDelta: 0.1564, //0.072,//{0.022},
        longitudeDelta: 0.0636//0.070,//{0.021}
    }}
    customMapStyle={mapStyles}
    showsUserLocation={true}
    showsMyLocationButton={true}
    >
    {bathroom.map((marker, index) => (
    <Marker
    key={index}
    coordinate={{latitude: marker.latitude, longitude: marker.longitude}}
    image={premicon}
    onPress={() => {
        
        flashListRef.current.scrollToIndex({animated: true, index: index})
        
    }}
    />
))}

    </MapView>
    {/* <View style={{ flex: 1, justifyContent: 'flex-end' }}>
      <FlatList 
        data={bathroom}
        keyExtractor={(item) => item.key}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }]
        )}
        scrollEventThrottle={16}
      />
    </View> */}
    <View style={styles.list}>
    <FlashList
        ref={flashListRef}
        data={bathroom}
        horizontal
        pagingEnabled
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{justifyContent: "center"}}
        scrollEventThrottle={16}
        decelerationRate = "fast"
        style={styles.scrollView}
        snapToInterval={CARD_WIDTH}
        snapToAlignment="center"
          // onScroll = {Animated.event([
          //   {
          //     nativeEvent: {
          //       //x: this.animation}}
          //       contentOffset: {
          //         x: scrollX
          //       }}      
          // ], {useNativeDriver: true})}
        renderItem={({item})=>{return <Cards item={item}/> }}
        estimatedItemSize={288}
        keyExtractor={(item, index) => `${item.id}`}
        extraData={bathroom}
        />  
    </View>
    </View>
    
    
);
}


const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
},
list:{
    height: 150,
    //marginBottom: 20,
    marginLeft: 0,
    marginRight: 0,
    //width: CARD_WIDTH,
    
    

},
horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
map: {
    flex:1,
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
    backgroundColor: "#FFF",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: '100%',
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

const mapStyles = [

      {
          "featureType": "administrative",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "color": "#525f66"
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#8fa7b3"
              },
              {
                  "lightness": "44"
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "color": "#667780"
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "color": "#333333"
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "labels.text.stroke",
          "stylers": [
              {
                  "color": "#8fa7b3"
              },
              {
                  "gamma": 2
              }
          ]
      },
      {
          "featureType": "road.arterial",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#a3becc"
              }
          ]
      },
      {
          "featureType": "road.arterial",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "color": "#7a8f99"
              }
          ]
      },
      {
          "featureType": "road.arterial",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "color": "#555555"
              }
          ]
      },
      {
          "featureType": "road.local",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#a3becc"
              }
          ]
      },
      {
          "featureType": "road.local",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "color": "#7a8f99"
              }
          ]
      },
      {
          "featureType": "road.local",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "color": "#555555"
              }
          ]
      },
      {
          "featureType": "transit",
          "elementType": "labels.text.stroke",
          "stylers": [
              {
                  "color": "#bbd9e9"
              },
              {
                  "gamma": 2
              }
          ]
      },
      {
          "featureType": "transit.line",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#a3aeb5"
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#bbd9e9"
              }
          ]
      }
  ]


// import React, { Component } from "react";
// import {
//   View,
//   Platform,
//   Text,
//   Image,ActivityIndicator, ScrollView, StyleSheet,Dimensions, TouchableOpacity, Animated, FlatList
// } from "react-native";
//  import {
//    Left,
//   Right,
//    Icon,
//    Card,
//    CardItem,
//    Row,
//    Button
//  } from "native-base";

// //import { showLocation } from "react-native-map-link";
// //import StarRating from "react-native-star-rating";
// import MapView,{Callout} from 'react-native-maps';
// //import { Ionicons } from "@expo/vector-icons";
// //import Maps from "../components/Maps";
// import restApi from "../../services/restroom";
// import refugeeApi from '../../services/refugee'
// import {connect} from "react-redux"
// //import { SafeAreaView } from 'react-navigation'
// import { SafeAreaProvider } from 'react-native-safe-area-context';
// //import Intro from '../components/Slider'
// ///import Over from '../components/Modal'
// var tprating = require("../../assets/TPratings_5Stars.png")
// var genericFood = require('../../assets/SEARCH-lower-card-generic-img-1.png')
// var unverified = require('../../assets/mascot-01-unverified-349x161.png')
// var verified = require('../../assets/mascot-01-verified-329x161.png')
// var premicon = require('../../assets/pin-verified.png')
// //import * as Analytics from 'expo-firebase-analytics'
// //import * as Amplitude from 'expo-analytics-amplitude'
// import axios from 'axios'
// //import { Extrapolate } from "react-native-reanimated";
// //import { Callout } from "react-native-maps";
// //var bathIcon = require("../assets/waba_icon_location.png");
// //var restRoom= require("../assets/w_logo.png")
// const { width, height } = Dimensions.get("window");
// const CARD_HEIGHT = 180;
// const CARD_WIDTH = width * 0.80;
// const SPACING_FOR_CARD_INSET = width * 0.1 - 10;
// //let newAn = scrollX(new Animated.Value(0)).current;
// //console.log(scrollX)
// let mapIndex = 0



// class BathMap extends Component {

// constructor(props) {
//         super(props);
//         //this.index = 0;
//         //this.animation = new Animated.Value(0);
//         this.state = {
//             bathroom: [],
//             region: {
//               longitude: this.props.location.longitude,
//               latitude: this.props.location.latitude,
//               latitudeDelta: 0.072,//{0.022},
//               longitudeDelta: 0.070,//{0.021}
//             },
//             longitude: "",
//             latitude: null,
//             loading: false,
//             lat: null,
//             lon: null,
//             errorMessage: null,
//             search: "",
//             mapMargin:  1,
//             newUser: false,
//             newSearch: false,
//             selectedItem: null
            
//           };
//           this.flatListRef = null
//           //this.scrollX = React.createRef()
//       }
  

//    componentDidMount() {
     
    
//     this.loadBathroom();
//     this.setState({ loading: true });
//     //this.useCheck();
//     //this.index = 0;
//     //this.animation = new Animated.Value(0);
    
//     //Amplitude.logEventAsync("MAP_OPENED")
//   }




//   useCheck = async () =>{
//   newUser = this.props.user
//   this.setState({ newUser: newUser })
  
//   }
  
//   setMargin=()=>{
//     this.setState({mapMargin: 0});
//   }

//   renderItem = ({ item }) => {

//     const distance = item.distance.toString().slice(0, 4)
//     if(item.icon){
//       return (
//         <View>
//           <TouchableOpacity 
//           onPress={() => {
//             const eventProp = {
//               id: item.id,
//               name: item.name,
//               street: item.street,
//               city: item.city,
//               distance: distance
//             }
//             //Amplitude.logEventWithPropertiesAsync("RESTAURANT_SELECT", eventProp)
//           this.props.navigation.navigate("Pee", {
//             id: item.id,
//             item,
//             distance: distance,
//             currentLat: this.state.region.latitude,
//             currentLon: this.state.region.longitude
//           })}}
//           >
//           {/* <Card style={styles.card}>
//             <Left style={{paddingLeft: 10}}>
//               <Text style={{width: 50, height: 80}}><Image resizeMode={'cover'} source={{uri: item.icon}}style={{width: 50, height: 55}}/></Text>                  
//             </Left> 
//               <CardItem style={{flexDirection: 'column'}}>
//               <Right style={{flex:1, alignItems: 'flex-start'}}>
//                 <Text style={{fontWeight: 'bold',textTransform: 'capitalize', color: '#173E81', fontSize: 17}}>{item.name}</Text>
//                 <Text>{item.street}</Text>
//                 <Text style={{width: 120, height: 30}}><Image resizeMode={'cover'} source={tprating}style={{width:120, height: 25}}/></Text>
//                 <Text>Distance: {distance} miles</Text>
//               </Right>
//               </CardItem>
//           </Card> */}
//           </TouchableOpacity>
//         </View>
//     )

//     }else{
    
//     return (
//       <View>
//         <TouchableOpacity 
//         onPress={() => {
//           const eventProp = {
//             id: item.id,
//             name: item.name,
//             street: item.street,
//             city: item.city,
//             distance: distance
//           }
//           //Amplitude.logEventWithPropertiesAsync("RESTAURANT_SELECT", eventProp)
//         this.props.navigation.navigate("Pee", {
//           id: item.id,
//           item,
//           distance: distance,
//           currentLat: this.state.region.latitude,
//           currentLon: this.state.region.longitude
//         })}}
//         >
//         {/* <Card style={styles.card}>
//           <Left style={{paddingLeft: 10}}>
//             <Text style={{width: 50, height: 80}}><Image resizeMode={'cover'} source={{uri: item.icon}}style={{width: 50, height: 55}}/></Text>                  
//           </Left> 
//             <CardItem style={{flexDirection: 'column'}}>
//             <Right style={{flex:1, alignItems: 'flex-start'}}>
//               <Text style={{fontWeight: 'bold',textTransform: 'capitalize', color: '#173E81', fontSize: 17}}>{item.name}</Text>
//               <Text>{item.street}</Text>
//               <Text style={{width: 120, height: 30}}><Image resizeMode={'cover'} source={tprating}style={{width:120, height: 25}}/></Text>
//               <Text>Distance: {distance} miles</Text>
//             </Right>
//             </CardItem>
//         </Card> */}
//         </TouchableOpacity>
//       </View>
//   )
//       }
//   }

//   getItemLayout(data, index){
//     return { length: styles.card.width, offset: styles.card.width * index, index}
//   }

//   loadBathroom = async () => {
    
//     try{

    
//       let params = {
//         lat: this.state.region.latitude,
//         lng: this.state.region.longitude
//       };
      

//       const results = await axios.all([
//         refugeeApi.get('/v1/restrooms/by_location',{params}),
//         //restApi.get('/api/bathrooms',{ params })
        
//       ]).then(axios.spread((...responses) =>{
//          let response1 = responses[0].data;
//         let response2 = responses[1].data;
//         let prelim = response1.concat(response2);
//         //console.log(prelim)

//         return prelim
//       })).catch(err =>{
//         console.log("error", err.message);
//       })

//        const  bathroom = await results.map(result =>
//          result
        
//       )
//       this.setState({ bathroom: bathroom });
     
//       this.setState({ loading: false });
//     } catch (e) {
//       console.log("error", e.message);
//     }
//   };
    
//   onRegionChangeComplete = async (region) =>{
//     //Amplitude.logEventAsync("MAP_MOVED")
//     this.setState({region})
//     this.setState({newSearch: true})
//     //this.loadBathroom()
//   }

//   newSearch = ()=>{
//     if(this.state.newSearch)
//     return (
//       <View style={styles.chipsItem}>
//           <TouchableOpacity onPress={()=>{
//             this.loadBathroom()
//           }}>
//           <Text style={styles.textSign}>Search this area</Text>
//           </TouchableOpacity>
//       </View> 
//     )

//   }

//   createMarkers= () => {
//     const { navigate } = this.props.navigation;
//     //const markAnimation = scrollX(new Animated.Value(0)).current

//     //const scrolling = React.createRef(new Animated.Value(0)).current;
//     //console.log(scrolling)

//     // const inputRange = [
//     //        (index -1) * CARD_WIDTH,
//     //        index * CARD_WIDTH,
//     //        (index + 1) * CARD_WIDTH
//     //      ]
    
//     // const interpolations = this.state.bathroom.map((marker, index)=>{
//     //   const inputRange = [
//     //     (index -1) * CARD_WIDTH,
//     //     index * CARD_WIDTH,
//     //     (index + 1) * CARD_WIDTH
//     //   ];
//     //   const scale = markAnimation.interpolate({
//     //     inputRange,
//     //     outputRange: [1, 2.5, 1],
//     //     Extrapolate: "clamp"
//     //   })
//     //   return {scale}
//     // })

    
    
//     return this.state.bathroom.map((item, index) => {
//       // const scaleStyle = {
//       //   transform:[
//       //     {
//       //       scale: interpolations[index].scale,
//       //     },
//       //   ]
//       // }

//       // const inputRange = [
//       //   (index -1) * CARD_WIDTH,
//       //   index * CARD_WIDTH,
//       //   (index + 1) * CARD_WIDTH
//       // ];
//       // const scale = scrollX.interpolate({
//       //   inputRange,
//       //   outputRange: [1, 2.5, 1],
//       //   Extrapolate: "clamp"
//       // })
      

      
      
//       if(Platform.OS === 'ios' && item.icon){
//       return (
//         <MapView.Marker
//         key= {index}
//         coordinate={{
//           latitude: item.latitude,
//           longitude: item.longitude
//         }}
//         //title={item.name}
//         image={{uri: item.icon}}
//         onPress={() => {
//           const markerProp = {
//           id: item.id,
//           name: item.name,
//           street: item.street,
//           city: item.city,
//           distance: item.distance
//           }
//           //Amplitude.logEventWithPropertiesAsync("MARKER_SELECT", markerProp)
//           this.flatListRef.scrollToIndex({animated: true, index: index})
          
//         }}
        
//         >
//         </MapView.Marker>
//       ) ;
//         }if(!item.icon){
//           return (
//             <MapView.Marker
//             key= {index}
//             coordinate={{
//               latitude: item.latitude,
//               longitude: item.longitude
//             }}
//             //title={item.name}
//             image={{uri:"https://storage.googleapis.com/whizz_pics/717114454-generic-location_icon.png"}}
//             onPress={() => {
//               const markerProp = {
//               id: item.id,
//               name: item.name,
//               street: item.street,
//               city: item.city,
//               distance: item.distance
//               }
//               //Amplitude.logEventWithPropertiesAsync("MARKER_SELECT", markerProp)
//               this.flatListRef.scrollToIndex({animated: true, index: index})
              
//             }}
            
//             >
               
//             </MapView.Marker>
//           )

//         }else{
//           if(item.icon){
//           return (
//             <MapView.Marker
//             key= {index}
//             coordinate={{
//               latitude: item.latitude,
//               longitude: item.longitude
//             }}
//             //title={item.name}
//             image={{uri: item.icon}}
//            // pinColor={'yellow'}
//           //  onPress={() => {
//           //   this.flatListRef.scrollToIndex({animated: true, index: item.id})
//           //    }}
//             onPress={() => {
//               const markerProp = {
//               id: item.id,
//               name: item.name,
//               street: item.street,
//               city: item.city,
//               distance: item.distance
//               }
//               //Amplitude.logEventWithPropertiesAsync("MARKER_SELECT", markerProp)
//               this.flatListRef.scrollToIndex({animated: true, index: index})
//               }}
            
//             >
              
//             </MapView.Marker>
//           )}else{
//             return (
//               <MapView.Marker
//               key= {index}
//               coordinate={{
//                 latitude: item.latitude,
//                 longitude: item.longitude
//               }}
//               //title={item.name}
//               //image={{uri:"https://storage.googleapis.com/whizz_pics/717114454-generic-location_icon.png"}}
//              // pinColor={'yellow'}
//             //  onPress={() => {
//             //   this.flatListRef.scrollToIndex({animated: true, index: item.id})
//             //    }}
//               onPress={() => {
//                 const markerProp = {
//                 id: item.id,
//                 name: item.name,
//                 street: item.street,
//                 city: item.city,
//                 distance: item.distance
//                 }
//                 //Amplitude.logEventWithPropertiesAsync("MARKER_SELECT", markerProp)
//                 this.flatListRef.scrollToIndex({animated: true, index: index})
//                 }}
              
//               >
//                 <Animated.View>
//                   <Animated.Image
//                   style={[styles.marker, scaleStyle]}
//                   source={{uri:"https://storage.googleapis.com/whizz_pics/717114454-generic-location_icon.png"}}
//                   resizeMode="cover"
//                   />

//                 </Animated.View>
                
//               </MapView.Marker>
//             )

//           }
//         }
//     });

//   }

//   render() {
//     // const interpolations = this.state.bathroom.map((marker, index)=>{
//     //   const inputRange = [
//     //     (index -1) * CARD_WIDTH,
//     //     index * CARD_WIDTH,
//     //     (index + 1) * CARD_WIDTH
//     //   ];
//     //   const scale = this.animation.interpolate({
//     //     inputRange,
//     //     outputRange: [1, 2.5, 1],
//     //     Extrapolate: "clamp"
//     //   })
//     //   return scale
//     // })

//     if (this.state.newUser){
//       return(

//         <Over closeModal= { () => 
//              this.setState({ newUser: false })
//            }/>
//       )

//     } else if (this.state.loading){
//     return (
//       <View style={{ flex: 1 }}>
//               <ActivityIndicator
//                 size="large"
//                 color="blue"
//                 style={{
//                   paddingTop: 200,
//                   paddingLeft: 200,
//                   paddingRight: 200,
//                   paddingBottom: 400
//                 }}
//               />
//       </View>
//     );
//               }
//     return (
//       <SafeAreaProvider style={styles.container}>
//             <View style={styles.container}>
//             <MapView
//             ref={map => this.map = map}
//             initialRegion={{latitude: this.props.location.latitude,
//             longitude: this.props.location.longitude,
//             latitudeDelta: 0.1564,
//             longitudeDelta: 0.0636 }}//.1764,.1236,.0636,.5064
//               style={{flex:1, marginTop:this.state.mapMargin}}
//               provider="google"
//               showsUserLocation={true}
//               showsMyLocationButton={true}
//               onMapReady={this.setMargin}
//               onRegionChangeComplete={this.onRegionChangeComplete}
//               customMapStyle={mapStyles}
//             >
//               {this.createMarkers()}
//             </MapView>
//             {this.newSearch()}
//             <View>
//             <Animated.FlatList
//           ref={(ref) => this.flatListRef = ref}
//           data={this.state.bathroom}
//           horizontal
//           pagingEnabled
//           scrollEnabled
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={{justifyContent: "center"}}
//           scrollEventThrottle={16}
//           decelerationRate = "fast"
//           style={styles.scrollView}
//           snapToInterval={CARD_WIDTH}
//           snapToAlignment="center"
//           // onScroll = {Animated.event([
//           //   {
//           //     nativeEvent: {
//           //       //x: this.animation}}
//           //       contentOffset: {
//           //         x: scrollX
//           //       }}}
              
//           // ], {useNativeDriver: true})}
//           renderItem={this.renderItem.bind(this)}
//           keyExtractor={(item, index) => `${item.id}`}
//           //extraData={this.state.bathroom}
//           getItemLayout={this.getItemLayout.bind(this)} /> 
          
//           </View>
//             </View>
//       </SafeAreaProvider>
          
//     );
//   }
// }


// const mapStateToProps= state =>{
// return{
//   location: state.location.initlocation.loc,
//   user: state.user.newUser.payload
// }
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   tool:{
//     width: 250,
//     height: 75,
//     backgroundColor: '#fff',
//     borderRadius: 10
//   },
//   searchBox: {
//     position:'absolute', 
//     marginTop: Platform.OS === 'ios' ? 40 : 20, 
//     flexDirection:"row",
//     backgroundColor: '#fff',
//     width: '90%',
//     alignSelf:'center',
//     borderRadius: 5,
//     padding: 10,
//     shadowColor: '#ccc',
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.5,
//     shadowRadius: 5,
//     elevation: 10,
//   },
//   chipsScrollView: {
//     position:'absolute', 
//     top:Platform.OS === 'ios' ? 90 : 80, 
//     paddingHorizontal:10
//   },
//   chipsIcon: {
//     marginRight: 5,
//   },
//   chipsItem: {
//     position:'absolute', 
//     top:Platform.OS === 'ios' ? 90 : 30, 
//     paddingHorizontal:10,
//     flexDirection:"row",
//     alignSelf:'center',
//     backgroundColor:'#fff', 
//     borderRadius:20,
//     padding:8,
//     paddingHorizontal:20, 
//     marginHorizontal:10,
//     height:35,
//     shadowColor: '#ccc',
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.5,
//     shadowRadius: 5,
//     elevation: 10
    
//   },
//   scrollView: {
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//     paddingVertical: 10,
//   },
//   endPadding: {
//     paddingRight: width - CARD_WIDTH,
//   },
//   card: {
//     // padding: 10,
//     flexDirection: "row",
//     elevation: 2,
//     backgroundColor: "#FFF",
//     borderTopLeftRadius: 5,
//     borderTopRightRadius: 5,
//     marginHorizontal: 10,
//     shadowColor: "#000",
//     shadowRadius: 5,
//     shadowOpacity: 0.3,
//     shadowOffset: { x: 2, y: -2 },
//     height: CARD_HEIGHT,
//     width: CARD_WIDTH,
//     overflow: "hidden",
//   },
//   cardImage: {
//     flex: 3,
//     width: "100%",
//     height: "100%",
//     alignSelf: "center",
//   },
//   textContent: {
//     flex: 2,
//     padding: 10,
//   },
//   cardtitle: {
//     fontSize: 12,
//     // marginTop: 5,
//     fontWeight: "bold",
//   },
//   cardDescription: {
//     fontSize: 12,
//     color: "#444",
//   },
//   markerWrap: {
//     alignItems: "center",
//     justifyContent: "center",
//     width:50,
//     height:50,
//   },
//   marker: {
//     width: 30,
//     height: 30,
//   },
//   button: {
//     alignItems: 'center',
//     marginTop: 5
//   },
//   signIn: {
//       width: '100%',
//       padding:5,
//       justifyContent: 'center',
//       alignItems: 'center',
//       borderRadius: 3
//   },
//   textSign: {
//       fontSize: 16,
//       fontWeight: 'bold',
//       color: '#173E81'
      
//   }
// });


// export default connect(mapStateToProps)(BathMap);



// // getLocation = async () => {
//   //   let location = "";
//   //   try {
//   //     location = await AsyncStorage.getItem("location");
//   //    //console.log(location)
//   //     //console.log(location)
//   //   } catch (error) {
//   //     // Error retrieving data
//   //     console.log(error.message);
//   //   }
//   //   return JSON.parse(location);
//   // };

//   // initBathroom = async () => {
//   //   let bathroom = await this.getBathroom();
//   //   this.setState({ bathroom: bathroom });
//   //   //console.log(this.state.bathroom)
//   //   this._getLocationAsync();
//   //   //console.log(this.state.lat)
//   //   //console.log(this.state.lon)
//   //   this.setState({ loading: false });
//   // };

//   // _getLocationAsync = async () => {
    

//   //   let location = await this.getLocation();
//   //   let lat = location.coords.latitude;
//   //   let lon = location.coords.longitude;
//   //   this.setState({ latitude: lat });
//   //   this.setState({ lon });
//   //   //await this.loadBathroom();
//   //   //console.log(lat);
//   //   //console.log(lon);
//   // };

//   // getBathroom = async () => {
//   //   let bathroom = "";
//   //   try {
//   //     bathroom = await AsyncStorage.getItem("bathroom");
//   //     //console.log(bathroom)
//   //   } catch (error) {
//   //     // Error retrieving data
//   //     console.log(error.message);
//   //   }
//   //   return JSON.parse(bathroom);
//   // };
//   //<StarRating
//                   //disabled={true}
//                   //maxStars={5}
//                   //rating={5}
//                   //starSize={12}
//                   //fullStarColor={"orange"}
//                   //emptyStarColor={"orange"}
//                 ///>//