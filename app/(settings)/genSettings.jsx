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
                <View style={[styles.optionBox, {backgroundColor: Theme.appTheme.color2}]}>
                    <Text style={[styles.optionText, {color: Theme.appTheme.textColor2, fontFamily: Theme.appTheme.textFont}]}>Email Link</Text>
                    <View style={[styles.optionInnerBox1, {backgroundColor: Theme.appTheme.color3}]}>
                        <Text style={[styles.optionInnerText, {color: Theme.appTheme.textColor3, fontFamily: Theme.appTheme.textFont}]}>xxx@gmail.com</Text>
                    </View>
                </View>
                <View style={[styles.optionBox, {backgroundColor: Theme.appTheme.color2}]}>
                    <Text style={[styles.optionText, {color: Theme.appTheme.textColor2, fontFamily: Theme.appTheme.textFont}]}>Sync</Text>
                    <View style={{flexDirection: "row", width: "85%", justifyContent: "flex-end"}}>
                        <View style={[styles.optionInnerBox3, {backgroundColor: Theme.appTheme.color3}]}>
                            <Text style={[styles.optionInnerText, {color: Theme.appTheme.textColor3, fontFamily: Theme.appTheme.textFont}]}>Sync</Text>
                        </View>
                        <View style={[styles.optionInnerBox2, {backgroundColor: Theme.appTheme.color3}]}>
                            <Text style={[styles.optionInnerText, {color: Theme.appTheme.textColor3, fontFamily: Theme.appTheme.textFont}]}>Auto-Sync: Off</Text>
                        </View>
                    </View>
                </View>
                <TitleText theme={Theme.appTheme} text="Notes"/>
                <View style={[styles.optionBox, {backgroundColor: Theme.appTheme.color2}]}>
                    <Text style={[styles.optionText, {color: Theme.appTheme.textColor2, fontFamily: Theme.appTheme.textFont}]}>Notification</Text>
                    <View style={[styles.optionInnerBox3, {backgroundColor: Theme.appTheme.color3}]}>
                        <Text style={[styles.optionInnerText, {color: Theme.appTheme.textColor3, fontFamily: Theme.appTheme.textFont}]}>Off</Text>
                    </View>
                </View>
                <View style={[styles.optionBox, {backgroundColor: Theme.appTheme.color2}]}>
                    <Text style={[styles.optionText, {color: Theme.appTheme.textColor2, fontFamily: Theme.appTheme.textFont}]}>Language</Text>
                    <View style={[styles.optionInnerBox1, {backgroundColor: Theme.appTheme.color3}]}>
                        <Text style={[styles.optionInnerText, {color: Theme.appTheme.textColor3, fontFamily: Theme.appTheme.textFont}]}>English</Text>
                    </View>
                </View>
                <TitleText theme={Theme.appTheme} text="Widget"/>
                <View style={[styles.optionBox, {backgroundColor: Theme.appTheme.color2}]}>
                    <Text style={[styles.optionText, {color: Theme.appTheme.textColor2, fontFamily: Theme.appTheme.textFont}]}>Help (FAQs)</Text>
                </View>
                <View style={[styles.optionBox, {backgroundColor: Theme.appTheme.color2}]}>
                    <Text style={[styles.optionText, {color: Theme.appTheme.textColor2, fontFamily: Theme.appTheme.textFont}]}>Contact Us</Text>
                </View>
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
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        marginTop: 10,
        paddingHorizontal:15,
        paddingVertical: 10,
        borderRadius: 30
    },
    optionText: {
        fontSize: 18,
        fontWeight: "700"
    },
    optionInnerBox1: {
        justifyContent: "center",
        alignItems: "center",
        width: 175,
        paddingHorizontal:15,
        paddingVertical: 10,
        borderRadius: 20
    },
    optionInnerBox2: {
        justifyContent: "center",
        alignItems: "center",
        width: 125,
        marginLeft: 5,
        paddingHorizontal:15,
        paddingVertical: 10,
        borderRadius: 20
    },
    optionInnerBox3: {
        justifyContent: "center",
        alignItems: "center",
        width: 75,
        paddingHorizontal:15,
        paddingVertical: 10,
        borderRadius: 20
    },
    optionInnerText: {
        fontSize: 14,
        fontWeight: "700"
    },
})

