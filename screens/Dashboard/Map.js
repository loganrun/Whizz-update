import { useRef, useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
    View,
    Platform,
    Text,
    ActivityIndicator, StyleSheet,Dimensions, TouchableOpacity, Animated, 
} from "react-native";
import { FlashList } from '@shopify/flash-list';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, { Callout, Marker,PROVIDER_GOOGLE} from 'react-native-maps';
import {useDispatch, useSelector } from 'react-redux';
import { getLocationStart, getLocationSuccess, getLocationFailed } from '../../locationSlice'
import { getRestroomsStart, getRestroomsSuccess, getRestroomsFailed} from '../../restroomsSlice'
import { getUserSuccess } from '../../userSlice';
import { useNavigation } from '@react-navigation/native';
import restApi from "../../services/restroom"
import refugeeApi from "../../services/refugee"
import axios from 'axios'
import Cards from '../../components/Cards'
import Intro from '../../components/Slider';
let tprating = require("../../assets/TPratings_5Stars.png")
let genericFood = require('../../assets/SEARCH-lower-card-generic-img-1.png')
let unverified = require('../../assets/mascot-01-unverified-349x161.png')
let verified = require('../../assets/mascot-01-verified-329x161.png')
let premicon = require('../../assets/pin-verified2.png')
let regIcon = require('../../assets/pin-unverified.png')
const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 180;
const CARD_WIDTH = width;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;
const scrollX = new Animated.Value(0);
 
let mapIndex = 0

export default function MainMap() {

    const location = useSelector((state) => state.location.location)
    const restroom = useSelector((state)=> state.restrooms.restrooms)
    const user = useSelector((state) => state.user.user)
    const dispatch = useDispatch()
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
    const [newSearch, setNewSearch] = useState(false)

    onDone = async ()=>{
        const jsonValue = JSON.stringify(true);
        await AsyncStorage.setItem('user', jsonValue);
        
        dispatch(getUserSuccess(true))
    }

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
            
            Sentry.Native.captureException(err)
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
        dispatch(getRestroomsSuccess(result))
        setNewSearch(false)
    
        } catch (error) {
            Sentry.Native.captureException(error)
        }
    };

    onRegionChangeComplete = async (region) =>{
        setRegion({
            latitude: region.latitude,
            longitude: region.longitude,
            latitudeDelta: 0.072,
            longitudeDelta: 0.070,
        })
        setNewSearch(true)
    }

    const Search = ()=>{
        if(newSearch)
        return (
        <View style={styles.chipsItem}>
            <TouchableOpacity onPress={()=>{
                loadRestrooms()
            }}>
            <Text style={styles.textSign}>Search This Area</Text>
            </TouchableOpacity>
        </View> 
        )
    }

    if (user === false){
        return(
        <Intro  onDone={onDone}/>
        )

    } else
        
    if (!restroom && !location) {
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
    provider={PROVIDER_GOOGLE}
    onRegionChangeComplete={onRegionChangeComplete}
    >
    {restroom.map((marker, index) => (
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
    {Search()}
    
    <View style={styles.list}>
    <FlashList
        ref={flashListRef}
        data={restroom}
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
    <StatusBar style="light" />
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
    //width: '100%'
    
    

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


