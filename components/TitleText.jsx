// @/components/TitleText.jsx

import { View, Text, StyleSheet } from "react-native";

function TitleText(props){
    return (
        <View style={styles.titleTextBox}>
            <Text style={[styles.titleText, {color: props.theme.textColor1, fontFamily: props.theme.textFont}]}>{props.text}</Text>
        </View>
    );
}
export default TitleText;

const styles=StyleSheet.create({
    titleTextBox: {
        alignItems: "flex-start",
        marginTop: 20,
        width: "100%"
    },
    titleText: {
        fontSize: 22,
        fontWeight: "700"
    }
})