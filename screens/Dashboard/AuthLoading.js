import { View, Text, StyleSheet} from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { getRestroomsStart, getRestroomsSuccess, getRestroomsFailed} from '../../restroomsSlice'
import { getLocationStart, getLocationSuccess, getLocationFailed } from '../../locationSlice'
import { getUserSuccess } from '../../userSlice';
import {useDispatch } from 'react-redux';
import restApi from "../../services/restroom"
import refugeeApi from "../../services/refugee"
import axios from 'axios'
import * as Progress from 'react-native-progress';


const AuthLoading = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const [region, setRegion] = useState({
            latitude: 0.0,
            longitude: 0.0,
            latitudeDelta: 0.072,
            longitudeDelta: 0.070,
    });
    const [data, setData] = useState(false);
    const [progress, setProgress]= useState(0);
    const [indeterminate, setIndeterminate] = useState(true)

    useEffect(()  => {
        const getData = async () =>{
        const jsonValue = await AsyncStorage.getItem('location');
        const location = jsonValue != null ? JSON.parse(jsonValue) : null;
        dispatch(getLocationSuccess(location))
        setRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.072,
            longitudeDelta: 0.070,
        })

        }
        getData()
        
    }, []);

    useEffect(()=>{
        const getUser = async () =>{
            const jsonValue = await AsyncStorage.getItem('user');
            const user = JSON.parse(jsonValue)
            if(user !== null){
                dispatch(getUserSuccess(true))
            }
            
        }
        getUser()
    },[])

    useEffect(()=>{
        const animate = () => {
            let progress = 0;
            setProgress(0)
            setTimeout(() => {
    
            setIndeterminate(false)
            setInterval(() => {
                progress += Math.random() / 5;
                if (progress > 1) {
                progress = 1;
                }
                setProgress(progress)
            }, 500);
            }, 1500);
        }

        animate()

    }, [])

    useEffect(()=>{

        if(region.latitude || region.longitude !== 0.0){
            
        const loadRestrooms = async () => {
    
            try{
        
            let params = {
                per_page: 30,
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
            dispatch(getRestroomsSuccess(result))
            setData(true)
            //setLoading(false)
        
            } catch (e) {
            console.log("error", e.message);
            }
        };
        loadRestrooms()
    }

    

    }, [region])

    useEffect(() => {
        
        navigation.navigate(data ? "Map" : "Auth")
        
    }, [data])

return (

    <View style={styles.container}>
    <Text style={styles.welcome}>LOADING...</Text>

    <View style={styles.circles}>

    <Progress.CircleSnail
        style={styles.progress}
        size={230}
        thickness={8}
        color={['#F44336', '#2196F3', '#009688']}
    />
    </View>
</View>
        
)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffff",
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
    },
    welcome: {
        fontSize: 25,
        textAlign: 'center',
        margin: 10,
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
    circles: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    progress: {
        margin: 10,
    },
    });

export default AuthLoading


