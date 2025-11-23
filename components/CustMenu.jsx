// @/components/CustMenu.jsx

import { View, Pressable, Text, StyleSheet, Dimensions } from "react-native";
import React, { useState } from "react";
import ColorPicker from "./ColorPicker";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

function CustMenu(props){
    const [openPickerKey, setOpenPickerKey] = useState(null);
    const [liveColors, setLiveColors] = useState({...props.custTheme});

    const colors=[props.theme.color1, props.theme.color2, props.theme.color3, props.theme.textColor1, props.theme.textColor2, props.theme.textColor3];
    const getBrightness=(color)=>{
        const hex=color.replace("#", "");
        const r=parseInt(hex.substring(0, 2), 16);
        const g=parseInt(hex.substring(2, 4), 16);
        const b=parseInt(hex.substring(4, 6), 16);
        const brightness=(r*299+g*587+b*114)/1000;
        return brightness;
    };
    const sortedColors=[...colors].sort((a, b) => getBrightness(a) - getBrightness(b));
    const lightestColor=sortedColors[5];
    const darkestColor=sortedColors[0];
    const isDark=(color)=>{
        if(!color){
            return false;
        }
        return getBrightness(color)<128;
    };

    const openPicker=(key)=>setOpenPickerKey(openPickerKey===key?null:key);
    const handleColorSelected=(colorObj)=>{
        const color = typeof colorObj === "string" ? colorObj : colorObj.hex;
        setLiveColors(prev => ({
            ...prev,
            [openPickerKey]: color
        }));
        props.setCustTheme({
            ...props.custTheme,
            [openPickerKey]: color
        });
    };

    const renderColorRow=(label, keys)=>(
        <>
        <View style={[styles.settingsBox, { backgroundColor: props.theme.color2 }]}>
            <Text style={[styles.settingsText, { color: props.theme.textColor2, fontFamily: props.theme.textFont }]}>
            {label}
            </Text>
            <View style={styles.custCircleBox}>
            {keys.map((key) => (
                <Pressable
                key={key}
                style={[
                    styles.custCircle,
                    {
                    backgroundColor: liveColors[key],
                    borderColor: isDark(liveColors[key]) ? lightestColor : darkestColor
                    }
                ]}
                onPress={() => openPicker(key)}
                />
            ))}
            </View>
        </View>
        {keys.includes(openPickerKey) && (
            <View style={{ width: "100%"}}>
                <ColorPicker key={openPickerKey}
                initialColor={props.custTheme[openPickerKey]}
                onChange={handleColorSelected}
                />
            </View>
        )}
        </>
    );

    return (
        <>
            {renderColorRow("Colors", ["color1", "color2", "color3"])}
            <View style={[styles.settingsBox, { backgroundColor: props.theme.color2 }]}>
                <Text style={[styles.settingsText, { color: props.theme.textColor2, fontFamily: props.theme.textFont }]}>
                Background
                </Text>
                <View style={styles.custCircleBox}>
                    <Pressable style={[styles.imageBox, { backgroundColor: "#919191ff", borderColor: darkestColor }]}>
                    </Pressable>
                </View>
            </View>
            <View style={[styles.settingsBox, { backgroundColor: props.theme.color2 }]}>
                <Text style={[styles.settingsText, { color: props.theme.textColor2, fontFamily: props.theme.textFont }]}>
                Text
                </Text>
                <View style={styles.custCircleBox}>
                    <Pressable style={[styles.optionBox, { backgroundColor: props.theme.color3 }]}>
                        <Text style={[styles.optionText, { color: props.theme.textColor3, fontFamily: props.theme.textFont }]}>
                        {props.custTheme.textFont}
                        </Text>
                    </Pressable>
                </View>
            </View>
            {renderColorRow("Text Colors", ["textColor1", "textColor2", "textColor3"])}
        </>
    );
}
export default CustMenu;

const styles=StyleSheet.create({
    settingsBox: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        marginTop: 10,
        paddingHorizontal:15,
        minHeight: 50,
        borderRadius: 25
    },
    settingsText: {
        fontSize: 18,
        fontWeight: "700"
    },
    custCircleBox: {
        flexDirection: "row",
    },
    custCircle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 3,
        margin: 5
    },
    optionBox: {
        alignItems: "center",
        justifyContent: "center",
        width: 160,
        height: 30,
        borderRadius: 15,
    },
    optionText: {
        fontWeight: 500
    },
    imageBox: {
        height: 100,
        width: (screenWidth*100)/(screenHeight*0.8),
        marginVertical: 15,
        marginHorizontal: 10,
        borderRadius: 8,
        borderWidth: 3
    }
})