// @/components/Footer.jsx

import {View, StyleSheet, Dimensions } from "react-native";
import React from 'react';

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

function Footer(props){
    return (
        <View style={[styles.footer, {backgroundColor: props.theme.color2}]}/>
    );
}
export default Footer;

const styles=StyleSheet.create({
    footer: {
        width: screenWidth,
        height: screenHeight*0.1,
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 98
    },
});