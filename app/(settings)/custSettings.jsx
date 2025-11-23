//@/app/(settings)/custSettings.jsx
import { View, ImageBackground, ScrollView, Text, StyleSheet, Dimensions } from "react-native";
import React, { useState } from "react";
import { Theme } from "@/database/dummyData";
import TitleText from "@/components/TitleText";
import CustMenu from "@/components/CustMenu";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

function CustSettings(){
    const [appTheme, setAppTheme] = useState(Theme.appTheme);
    const [noteTheme, setNoteTheme] = useState(Theme.noteTheme);
    const [widgetTheme, setWidgetTheme] = useState(Theme.widgetTheme);

    const Background=Theme.appTheme.bgImage?ImageBackground:View;
    return (
        <Background {...(Theme.appTheme.bgImage?{source: Theme.appTheme.bgImage, imageStyle: { opacity: Theme.appTheme.bgOpacity }}:{})} style={[styles.content, { backgroundColor: Theme.appTheme.color1 }]}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <TitleText theme={Theme.appTheme} text="App UI"/>
                <CustMenu theme={Theme.appTheme} custTheme={Theme.appTheme} setCustTheme={setAppTheme}/>
                <TitleText theme={Theme.appTheme} text="Notes"/>
                <CustMenu theme={Theme.appTheme} custTheme={Theme.noteTheme} setCustTheme={setNoteTheme}/>
                <TitleText theme={Theme.appTheme} text="Widget"/>
                <CustMenu theme={Theme.appTheme} custTheme={Theme.widgetTheme} setCustTheme={setWidgetTheme}/>
            </ScrollView>
        </Background>
    );
}
export default CustSettings;

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
    }
})