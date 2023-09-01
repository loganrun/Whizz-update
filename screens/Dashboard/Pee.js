import { useRef, useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
View, Platform,Text, Image,ActivityIndicator, StyleSheet,Dimensions, TouchableOpacity, Animated, FlatList,ScrollView
} from "react-native";
import MapView, { Callout, Marker,PROVIDER_GOOGLE} from 'react-native-maps';
import {useDispatch, useSelector } from 'react-redux';
import { getLocationStart, getLocationSuccess, getLocationFailed } from '../../locationSlice'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {HStack,Card,VStack, Button, Icon} from "native-base";
import Ads from '../../components/Ads'
import { showLocation } from "react-native-map-link";
import { MaterialIcons } from '@expo/vector-icons';
//import { useNavigation } from '@react-navigation/native';
let premicon = require('../../assets/pin-verified.png')
let verified = require('../../assets/mascot-01-verified-329x161.png')
let tprating = require("../../assets/TPratings_5Stars.png")
let tfresh = require("../../assets/TP-ratingsfresh.png")
let tpmeh = require("../../assets/TP-ratingsmeh.png")
let tpno = require("../../assets/TP-ratingsno!!!.png")
const whizz = require('../../assets/whizz_logo1(6).png')
const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 180;
const CARD_WIDTH = width;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

export default function Pee({route, navigation}) {
  const location = useSelector((state) => state.location.location)
  const {props} = route.params
  
  //const navigation = useNavigation()
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(true);
  const [region, setRegion] = useState({
        latitude: 0.0,
        longitude: 0.0,
        latitudeDelta: 0.003,
        longitudeDelta: 0.003,
    });

    const distance = props.item.distance.toString().slice(0, 4)

    // const handleDirections = () => {
    //     showLocation({
    //     latitude: props.item.latitude,
    //     longitude: props.item.longitude,
    //     title: props.item.name
    //     });
    // };


if (!location) {
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
    longitude:props.item.longitude,//-118.243683, //region.longitude,//-118.243683, //this.props.location.longitude,
    latitude: props.item.latitude, //34.052235, //region.latitude,//34.052235, //this.props.location.latitude,location.loc.latitude
    latitudeDelta: 0.003, //0.072,//{0.022},
    longitudeDelta: 0.003//0.070,//{0.021}
}}
customMapStyle={mapStyles}
showsUserLocation={true}
showsMyLocationButton={true}
>

<Marker
coordinate={{latitude: props.item.latitude, longitude: props.item.longitude}}
image={premicon}
/>
</MapView>
<View style = {{height: 170,width: '100%', padding: 0}}>
    <View>
    <Card style={styles.card}>
    <HStack style={{paddingRight: 5}}>
    <Image resizeMode={'contain'} source={whizz}style={{width: 100, height: 100}}/> 
    </HStack>
    {/* <VStack Style={{justifyContent: 'flex-end',width: 50, height: 30, position: 'relative', top: 10, right:10}}>
    <Button style={{top: 10, right:10, position:'absolute'}} leftIcon={<Icon as={MaterialIcons} name="directions" size="sm"  />}>
        Directions
    </Button>
    </VStack> */}
    <VStack style={{paddingTop: 0, paddingLeft: 10}}>
    
    
    <Text numberOfLines={1} style={{fontWeight: 'bold',textTransform: 'capitalize', color: '#173E81', fontSize: 20}}>{props.item.name}</Text>
        <Text numberOfLines={1} style={{fontSize:15, marginBottom:1}}>{ props.item.street}</Text>
        <Text style={{fontSize:15, marginBottom:1}}>Distance: {distance} miles</Text>
        {/* <Text style={{width: 220, height: 40}}><Image resizeMode={'contain'} source={tprating}style={{width:150, height: 30}}/></Text> */}
        <Image resizeMode={'contain'} source={tprating}style={{width:200, height: 50, paddingLeft:0, paddingBottom: 10}}/>
        <Button style={{width:120, height:40, paddingTop:10}}  leftIcon={<Icon as={MaterialIcons} name="directions" size="sm"  />}>
        Directions
    </Button>
    </VStack>
    
    
    </Card>
    </View>
</View>
<ScrollView style={{height: 1000, width:'100%', padding:0, backgroundColor: 'white'}}>
    <Ads/>
    <View style={{width: '100%', height: 160, paddingTop: 10}}>
        <View>
            <Text style={{paddingLeft: 40,fontWeight: 'bold',textTransform: 'capitalize', color: '#173E81', fontSize: 25}}>Rate The RestRoom!</Text>
        </View>
    <Card style={styles.card}>
    <HStack style={{paddingRight: 5}}>
    <Image resizeMode={'contain'} source={tpno}style={{width: 100, height: 100}}/> 
    </HStack>
    <HStack style={{paddingRight: 5}}>
    <Image resizeMode={'contain'} source={tpmeh}style={{width: 100, height: 100}}/> 
    </HStack>
    <HStack style={{paddingRight: 5}}>
    <Image resizeMode={'contain'} source={tfresh}style={{width: 100, height: 100}}/> 
    </HStack>
    {/* <View style={{width: '100%', height: 160, paddingTop: 10}}>
        <View>
            <Text style={{paddingLeft: 40,fontWeight: 'bold',textTransform: 'capitalize', color: '#173E81', fontSize: 25}}>Current Rating</Text>
        </View>
    </View> */}
    </Card>
        
    </View>

</ScrollView>
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
    height: 170,
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
    
    width: '100%',
    height: 150
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
    //marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: '100%',
    //overflow: "hidden",
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
//   Text,
//   StyleSheet,
//   ScrollView,
//   Dimensions,
//   Animated,
//   PanResponder,
//   Slider,
//   TouchableOpacity,
//   Image
// } from "react-native";
// //import {Video} from 'expo-av';
// // import {
// //   Container,
// //   Content,
// //   Header,
// //   Left,
// //   Right,
// //   Icon,
// //   Button,
// //   Body,
// //   Card,
// //   CardItem
// // } from "native-base";

// //import { showLocation } from "react-native-map-link";
// //import StarRating from "react-native-star-rating";
// //import { MapView } from "expo";
// import Maps from "./Map";
// import { SafeAreaProvider } from 'react-native-safe-area-context';
// //import { SafeAreaView } from 'react-navigation'
// //import ContentArea from "../components/ContentArea";
// //let ad = require("../assets/ad.png");
// //let bathicon = require('../assets/bath3.png')
// //import Ad from "../components/Ads";
// //import Ratings from "../components/Rating"
// //var vid = require("../assets/donut.mp4")

// //const SCREEN_HEIGHT = Dimensions.get("window").height;
// //const SCREEN_WIDTH = Dimensions.get("window").width;

// let contentMarginTopAnim = new Animated.Value(200);
// let mapTopMarginAnim = new Animated.Value(-250);

// class Pee extends Component {
//   // componentWillMount() {
//   //   this.moveAnimation = new Animated.ValueXY({ x: 0, y: SCREEN_HEIGHT - 20 });
//   // }

//   constructor(props) {
//     super(props);
//     // this.handleDirections = this.handleDirections.bind(this);
//   }

//   static navigationOptions = {
//     title: "DETAILS",
//     headerStyle: {
//       backgroundColor: "#3480CB",//"#52AEA0",
//       elevation: 0
//     },
//     headerTintColor: "#fff",
//     headerTitleStyle: {
//       fontWeight: "bold"
//     }
//   };

//   render() {
//     // const animatedHeight = {
//     //   transform: this.animation.getTranslateTransform()
//     // };
//     let item = this.props.navigation.getParam("item");
//     //console.log(item)
//     let curLat = this.props.navigation.getParam("currentLat");
//     let curLon = this.props.navigation.getParam("currentLon");
//     //console.log(curLat);
//     let longitude = item.longitude;
//     let latitude = item.latitude;
//     let name = item.name;

//     const { navigate } = this.props.navigation;

//     return (
//       <SafeAreaProvider style={styles.container}>
//       <View style={{ flex: 1 }}>
//         <ScrollView style={{ flex: 1 }}>
//           <View
//             style={{
//               height: 1200,
//               backgroundColor: "#fff"
//             }}
//           />
//           <Animated.View
//             style={{
//               position: "absolute",
//               top: mapTopMarginAnim,
//               left: 0,
//               width: "100%",
//               zIndex: 0,
//               height: 800,
//               backgroundColor: "blue"
//             }}
//           >
//             <Maps
//               style={{ flex: 1 }}
//               latitude={latitude}
//               longitude={longitude}
//               latitudeDelta={0.022}
//               longitudeDelta={0.021}
//               currLat={curLat}
//               currLon={curLon}
//               name={name}
//               mapOnPress={() => {
//                 Animated.timing(contentMarginTopAnim, {
//                   toValue: 400,
//                   duration: 400
//                 }).start();

//                 Animated.timing(mapTopMarginAnim, {
//                   toValue: -100,
//                   duration: 400
//                 }).start();
//               }}
//             />
//           </Animated.View>
//           <Animated.View
//             style={{
//               position: "absolute",
//               top: contentMarginTopAnim,
//               left: 0,
//               width: "100%",
//               zIndex: 1
//             }}
//           >
//             <ContentArea item={item} sourceLat={curLat} sourceLon={curLon} />
//           </Animated.View>
//         </ScrollView>
//       </View>
//       </SafeAreaProvider>
//     );
//   }
// }
// export default Pee;

// class ContentArea extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   handleDirections = props => {
//     showLocation({
//       latitude: this.props.item.latitude,
//       longitude: this.props.item.longitude,
//       title: this.props.item.name,
//       googleForceLatLon: true,
//       alwaysIncludeGoogle: true
//     });
//   };

//   render() {
//     let item = this.props.item;
//     //console.log(item);
//     //let longitude = item.longitude;
//     //let latitude = item.latitude;
//     let name = item.name;
//     let ad = item.ad
//     //let phone = item.phone;
//     let address = item.street;
//     let city = item.city;
//     let comment = item.comment;
//     let direction = item.directions;

//     return (
//       <Animated.View style={styles.Card}>
//         <TouchableOpacity
//           onPress={() => {
//             Animated.timing(contentMarginTopAnim, {
//               toValue: 200,
//               duration: 400,
//               useNativeDriver: true
//             }).start();

//             Animated.timing(mapTopMarginAnim, {
//               toValue: -250,
//               duration: 400,
//               useNativeDriver: true
//             }).start();
//           }}
//         >
//           {/* <Card style={{ paddingBottom: 10 }}>
//             <CardItem>
//               <Left
//                 style={{
//                   flexDirection: "column",
//                   alignItems: "flex-start",
//                   paddingHorizontal: 10
//                 }}
//               >
//                 <Text style={{ fontWeight: "bold", fontSize: 20, textTransform: 'capitalize'}}>{name}</Text>
//                 <Text>{address}</Text>
//                 <Text>{city}</Text>
//                 <Text style={{ fontWeight: "bold", fontSize: 14 }}>
//                   Instructions
//                 </Text>
//                 <Text>{direction}</Text>
//               </Left>
//               <Button
//                 style={{
//                   marginTop: 25,
//                   marginRight: 10,
//                   backgroundColor: "#3480CB",//"red",
//                   paddingRight: 10,
//                   paddingLeft: 10
//                 }}
//                 onPress={this.handleDirections}
//               >
//                 <Text
//                   style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}
//                 >
//                   Directions
//                 </Text>
//               </Button>
//             </CardItem>
//           </Card> */}
//         </TouchableOpacity>
//         <Ad adInfo= {ad}/>
//       <Text style={{marginTop: 10, marginBottom: 5, fontSize: 18, fontWeight: "bold", marginLeft: 25}}>RATE THE RESTROOM</Text>
//       <Ratings item={this.props.item}/>
        
        
//       </Animated.View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1
//   },
//   Card: {
//     flex: 1,
//     backgroundColor:  "#fff"//"#f5f5f5"
//   }
// });
