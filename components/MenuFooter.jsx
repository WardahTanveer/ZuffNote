// @/components/MenuFooter.jsx

import {View, StyleSheet, Pressable, Dimensions } from "react-native";
import React from 'react';
import { useRouter } from "expo-router";

import SettingsIcon from "@/assets/icons/gear-icon.svg";
import CreateIcon from "@/assets/icons/add-icon.svg";
import CustomiseIcon from "@/assets/icons/pencil-icon.svg";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
const circleSize = 70;

function MenuFooter(props){
    const router=useRouter();
    const buttons = [
        { icon: SettingsIcon, onPress: () => router.push("../(settings)/genSettings"), color: props.theme.textColor3 || "#fff" },
        { icon: CreateIcon, onPress: () => router.push("../(note)/note"), color: props.theme.textColor3 || "#fff" },
        { icon: CustomiseIcon, onPress: () => router.push("../(settings)/custSettings"), color: props.theme.textColor3 || "#fff" },
    ];
    console.log(props.theme.color1); //working
    const positions = [0.2, 0.5, 0.8];
    return (
        <>
            <View style={[styles.footer, {backgroundColor: props.theme.color2}]}/>
            <View style={styles.circlesContainer}>
                {buttons.map((btn, index) => {
                const Icon = btn.icon;
                // Calculate horizontal position evenly
                const leftPos = screenWidth * positions[index] - circleSize / 2;
                return (
                    <Pressable key={index} style={[styles.circle, { left: leftPos, backgroundColor: props.theme.color3 }]} onPress={btn.onPress}>
                        <Icon width={30} height={30} stroke={btn.color} fill={btn.color} style={{ color: btn.color }}/>
                    </Pressable>
                );
                })}
            </View>
        </>
    );
}
export default MenuFooter;

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
    circlesContainer: {
        position: "absolute",
        bottom: screenHeight*0.1 - circleSize/2, // 30 is half of circle size to center on footer top edge
        width: screenWidth,
        height: circleSize, // height = circle diameter
        zIndex: 99,
    },
    circle: {
        position: "absolute",
        width: circleSize,
        height: circleSize,
        borderRadius: circleSize/2,
        justifyContent: "center",
        alignItems: "center"
    }
});