import { View, Text } from 'react-native'
import React from 'react'
import {useDispatch } from 'react-redux';
import { getLocationStart, getLocationSuccess, getLocationFailed } from '../locationSlice'
import * as Location from 'expo-location';



const location = async () => {
    const dispatch = useDispatch()
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
    Alert.alert('Permission to access location was denied');
    return;
    }

    let location = await Location.getCurrentPositionAsync({});
    dispatch(getLocationSuccess(location))
}

export default location