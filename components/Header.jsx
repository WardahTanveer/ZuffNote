// @/components/Header.jsx

import { Image, View, StyleSheet, Dimensions, Pressable } from "react-native";
import React from 'react';
import { useRouter } from "expo-router";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

function Header(props){
    const router=useRouter();
    const isDark=(color)=>{
        if(!color){
            return false;
        }
        const hex=color.replace("#", "");
        const r=parseInt(hex.substring(0, 2), 16);
        const g=parseInt(hex.substring(2, 4), 16);
        const b=parseInt(hex.substring(4, 6), 16);
        const brightness=(r*299+g*587+b*114)/1000;
        return brightness<128;
    };
    const imageSource=isDark(props.theme.color3)
        ? require("@/assets/images/ZuffNote-full-white.png") //white
        : require("@/assets/images/ZuffNote-full-black.png");
    return (
        <View style={[styles.header, {backgroundColor: props.theme.color3}]}>
            <Pressable style={styles.homePress}onPress={() => router.push("/")}>
                <Image source={imageSource} style={styles.logo}/>
            </Pressable>
            
        </View>
    );
}
export default Header;

const styles=StyleSheet.create({
    header: {
        width: screenWidth,
        height: screenHeight*0.1,
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 99,
    },
    homePress: {
        height: "100%",
        justifyContent: "flex-end",
        alignItems: "center"
    },
    logo: {
        height: "45%",
        resizeMode: "contain",
        transform: [{translateY: -5}]
    }
});