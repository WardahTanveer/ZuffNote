// @/components/NoteGroup.jsx

import { View, Text, StyleSheet } from "react-native";

function NoteGroup(props){
    return (
        <View style={[styles.noteGroupBox, {backgroundColor: props.theme.color2}]}>
            <Text style={[styles.noteGroupText, {color: props.theme.textColor2, fontFamily: props.theme.textFont}]}>{props.text}</Text>
        </View>
    );
}
export default NoteGroup;

const styles=StyleSheet.create({
    noteGroupBox: {
        justifyContent: "center",
        alignItems: "flex-start",
        width: "100%",
        marginTop: 10,
        paddingHorizontal:15,
        paddingVertical: 10,
        borderRadius: 20
    },
    noteGroupText: {
        fontSize: 18,
        fontWeight: "700"
    }
})