import React from "react";
import {Image, StyleSheet, View, Dimensions} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

class LogoTitle extends React.Component {
    render() {
      const navigation = this.props.navigation
      const openMenu = () => navigation.openDrawer()
      return (
        <View style={styles.header}>
          {/* <Ionicons
            style={{ position: 'absolute', left: 16 }}
            onPress={openMenu}
            name='md-menu'
            size={30}
            color={"#fff"}
          /> */}
        <Image
          source={require('../assets/rectangle_logo.png')}
          style={{height: 60, width: 100}}
          //style={{height: '100%', width: width}}
        />
        </View>
      );
    }
  }

  export default LogoTitle

  const styles = StyleSheet.create({
    header:{
      //width: width  ,
      //height: 150,
      flexDirection:  "row",
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: "#3480CB",
      //paddingTop: 10,
      //paddingBottom:5,
      //marginLeft: 0,
      //paddingLeft: 0
    }
  })