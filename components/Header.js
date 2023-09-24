import React from 'react';
import { View, Image } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context';

const Header = ({ logo }) => {
    return (
        <SafeAreaView style={{ backgroundColor: "#3480CB", paddingBottom: 10 }}>
            <View style={{ alignItems: 'center', backgroundColor: "#3480CB", paddingTop: 5 }}>
                <Image source={logo} style={{ width: 60, height: 60 }} />
            </View>
        </SafeAreaView>
    );
};

export default Header;