// @/app/(note)/editHistory.jsx
import NotePreview from "@/components/NotePreview";
import { Theme, notes } from "@/data/dummyData";
import { useLocalSearchParams } from "expo-router";
import { Dimensions, ImageBackground, ScrollView, StyleSheet, Text, View } from "react-native";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

export default function EditHistoryPage() {
    const { id, version } = useLocalSearchParams();
    const existingNote = notes.find(n => n.id.toString() === id);
    const created = existingNote?`${existingNote.editHistory[existingNote.editHistory.length - 1].date} ${existingNote.editHistory[existingNote.editHistory.length - 1].time}`:"";
    const lastEdited = existingNote?`${existingNote.editHistory[parseInt(version, 10)].date} ${existingNote.editHistory[parseInt(version, 10)].time}`:"";
    const now = new Date();
    const hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedNowAMPM = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')} ${hours % 12 || 12}:${minutes} ${ampm}`;
    const theme=existingNote?.noteTheme||Theme.noteTheme;
    const Background=theme.bgImage?ImageBackground:View;
    return (
        <Background {...(theme.bgImage?{source: theme.bgImage, imageStyle: {opacity: theme.bgOpacity}}:{})} style={[styles.content, {backgroundColor: theme.color1}]}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={[styles.noteOptionBox, {backgroundColor: theme.color3}]}>
                    <Text style={[styles.noteDateText, {color: theme.textColor3, fontFamily: theme.textFont}]}>{"Created: "+(existingNote?created:formattedNowAMPM)}</Text>
                    <Text style={[styles.noteDateText, {color: theme.textColor3, fontFamily: theme.textFont}]}>{(version==0?"Last ":"")+"Edited: "+(existingNote?lastEdited:formattedNowAMPM)}</Text>
                </View>
                {existingNote?existingNote.editHistory.map((edit, index) => (
                    <NotePreview key={index} id={id} version={index} content={edit.content} dateTime={`${edit.date} ${edit.time}`} groups={existingNote.groups} theme={theme}/>
                )):(
                    <Text style={{ color: theme.textColor1, marginTop: 20 }}>
                        No edit history.
                    </Text>
                )}
            </ScrollView>
        </Background>
    );
}

const styles = StyleSheet.create({
    content: {
        height: screenHeight*0.8,
        width: screenWidth,
        paddingVertical: 10
    },
    scrollContent: {
        paddingVertical: 20,
        paddingHorizontal: "5%",
        alignItems: "center",
        width: screenWidth
    },
    noteOptionBox: {
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        marginTop: 10,
        paddingHorizontal:15,
        paddingVertical: 10,
        borderRadius: 20
    },
    noteDateText: {
        fontSize: 16,
        fontWeight: "700"
    },
});
