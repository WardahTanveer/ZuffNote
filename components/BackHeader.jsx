// @/components/BackHeader.jsx

import { View, Text, StyleSheet, Dimensions, Pressable } from "react-native";
import React from 'react';
import { useRouter } from "expo-router";
import { getLastVisited } from "@/navigationStore";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

function BackHeader(props){
    const router=useRouter();
    const goBack = () => {
        const last = getLastVisited();
        router.push(last);
    };
    return (
        <View style={[styles.header, {backgroundColor: props.theme.color3}]}>
            <Pressable style={styles.homePress}onPress={goBack}>
                <Text style={[styles.arrow, {color: props.theme.textColor3, fontFamily: props.theme.textFont,}]}>{"◀ "+props.text}</Text>
            </Pressable>
            
        </View>
    );
}
export default BackHeader;

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
        alignItems: "flex-start",
        paddingHorizontal: 20,
        paddingVertical: 5
    },
    arrow: {
        fontSize: 20,
        fontWeight: "900",
        transform: [{ translateY: -5 }],
    },
});