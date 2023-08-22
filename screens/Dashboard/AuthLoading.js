import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { getLocationStart, getLocationSuccess, getLocationFailed } from '../../locationSlice'
import {useDispatch } from 'react-redux';

const AuthLoading = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const [data, setData] = useState(null);

    useEffect(()  => {
        const getData = async () =>{
        const jsonValue = await AsyncStorage.getItem('location');
        const location = jsonValue != null ? JSON.parse(jsonValue) : null;
        dispatch(getLocationSuccess(location))
        setData(location)
        }
        getData()
        
    }, []);

    useEffect(() => {
        
        navigation.navigate(data ? "Map" : "Auth")
        
    }, [data])

return (

        <View style={[styles.container, styles.horizontal]}>
        
        <ActivityIndicator size="large" color="#0000ff" />
    
        </View>
        
)
}

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
    });

export default AuthLoading


