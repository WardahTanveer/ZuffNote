// @/components/NotePreview.jsx

import { View, Text, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";

function NotePreview(props){
    const router=useRouter();
    const charLimit=50;
    const content=props.content.length>charLimit
    ?props.content.slice(0, charLimit-3)+"..."
    :props.content;
    return (
        <Pressable style={[styles.notePreviewBox, {backgroundColor: props.theme.color2}]} onPress={()=>router.push({pathname: "../(note)/note", params: {id: String(props.id), version: String(props.version)}})}>
            <Text style={[styles.notePreviewBold, {color: props.theme.textColor2, fontFamily: props.theme.textFont}]}>{props.dateTime}</Text>
            <Text style={[styles.notePreviewContent, {color: props.theme.textColor2, fontFamily: props.theme.textFont}]}>{content}</Text>
            {props.groups.length>0?(
                <Text style={[styles.notePreviewBold, {color: props.theme.textColor2, fontFamily: props.theme.textFont}]}>{props.groups.map((group, i)=> i==props.groups.length-1?(group):(group+", "))}</Text>
            ):null}
        </Pressable>
    );
}
export default NotePreview;

const styles=StyleSheet.create({
    notePreviewBox: {
        justifyContent: "center",
        alignItems: "flex-start",
        width: "100%",
        marginTop: 10,
        paddingHorizontal:15,
        paddingVertical:15,
        borderRadius: 20
    },
    notePreviewBold: {
        fontSize: 15,
        fontWeight: "700",
        marginBottom: 5
    },
    notePreviewContent: {
        fontSize: 15,
        marginBottom: 5
    }
})