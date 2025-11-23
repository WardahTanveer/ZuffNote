//@/app/(settings)/custSettings.jsx
import { View, ImageBackground, ScrollView, Text, StyleSheet, Dimensions } from "react-native";
import React, { useState } from "react";
import { Theme } from "@/database/dummyData";
import TitleText from "@/components/TitleText";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

function GenSettings(){
    const Background=Theme.appTheme.bgImage?ImageBackground:View;
    return (
        <Background {...(Theme.appTheme.bgImage?{source: Theme.appTheme.bgImage, imageStyle: { opacity: Theme.appTheme.bgOpacity }}:{})} style={[styles.content, { backgroundColor: Theme.appTheme.color1 }]}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <TitleText theme={Theme.appTheme} text="App UI"/>
                <View style={[styles.noteGroupBox, {backgroundColor: Theme.appTheme.color2}]}>
                    <Text style={[styles.noteGroupText, {color: Theme.appTheme.textColor2, fontFamily: Theme.appTheme.textFont}]}></Text>
                </View>
                <TitleText theme={Theme.appTheme} text="Notes"/>
                <TitleText theme={Theme.appTheme} text="Widget"/>
            </ScrollView>
        </Background>
    );
}
export default GenSettings;

const styles=StyleSheet.create({
    content: {
        height: screenHeight*0.8,
        width: screenWidth,
        paddingVertical: 10,
        backgroundColor: Theme.appTheme.color1
    },
    scrollContent: {
        paddingVertical: 5,
        paddingHorizontal: "5%",
        alignItems: "center",
        width: screenWidth
    },
    optionBox: {
        justifyContent: "center",
        alignItems: "flex-start",
        width: "100%",
        marginTop: 10,
        paddingHorizontal:15,
        paddingVertical: 10,
        borderRadius: 20
    },
    optionText: {
        fontSize: 18,
        fontWeight: "700"
    }
})

