// @/components/NoteCheck.jsx

import { View, Text, StyleSheet, Pressable } from "react-native";

function NoteCheck(props){
    return (
        <View style={styles.noteCheck}>
            <View style={[styles.noteGroupBox, {backgroundColor: props.theme.color2}]}>
                <Text style={[styles.noteGroupText, {color: props.theme.textColor2, fontFamily: props.theme.textFont}]}>{props.text}</Text>
            </View>
            <Pressable style={[styles.noteGroupCheck, {backgroundColor: props.theme.color2}]} onPress={props.onCross}>
                {props.exclude?<Text style={[styles.checkMark, {color: props.theme.textColor2}]}>✗</Text>:null}
            </Pressable>
            <Pressable style={[styles.noteGroupCheck, {backgroundColor: props.theme.color2}]} onPress={props.onTick}>
                {props.include?<Text style={[styles.checkMark, {color: props.theme.textColor2}]}>✓</Text>:null}
            </Pressable>
        </View>
    );
}
export default NoteCheck;

const styles=StyleSheet.create({
    noteCheck: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    noteGroupBox: {
        justifyContent: "center",
        alignItems: "flex-start",
        width: "67%",
        height: 50,
        marginTop: 10,
        paddingHorizontal:15,
        paddingVertical: 10,
        borderRadius: 20
    },
    noteGroupText: {
        fontSize: 18,
        fontWeight: "700"
    },
    noteGroupCheck: {
        justifyContent: "center",
        alignItems: "center",
        width: "15%",
        height: 50,
        marginTop: 10,
        paddingHorizontal:15,
        paddingVertical: 10,
        borderRadius: 20
    },
    checkMark: {
        fontSize: 20
    }
})