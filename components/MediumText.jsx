// @/components/MediumText.jsx

import { View, Text, StyleSheet } from "react-native";

function MediumText(props){
    return (
        <View style={styles.mediumTextBox}>
            <Text style={[styles.mediumText, {color: props.theme.textColor1, fontFamily: props.theme.textFont}]}>{props.text}</Text>
        </View>
    );
}
export default MediumText;

const styles=StyleSheet.create({
    mediumTextBox: {
        justifyContent: "center",
        alignItems: "flex-start",
        paddingBottom: 10,
        paddingHorizontal: 10,
        width: "100%"
    },
    mediumText: {
        fontSize: 20,
        fontWeight: "700"
    }
})