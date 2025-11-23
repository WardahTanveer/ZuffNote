// @/app/(note)/note.jsx
import { View, ImageBackground, Text, StyleSheet, ScrollView, TextInput, Pressable, Dimensions, Alert } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { setTempNote, getTempNote, clearTempNote } from "@/noteStore";
import { Theme, notes } from "@/database/dummyData";
import SearchBar from "@/components/SearchBar.jsx";
import NoteGroup from "@/components/NoteGroup";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

export default function NotePage() {
    const {id, version}=useLocalSearchParams();
    const router=useRouter();

    const [menuVisible, setMenuVisible] = useState(false);

    const existingNote=notes.find((n)=>n.id.toString()===id);
    const theme=existingNote?.noteTheme||Theme.noteTheme;

    const originalContent = existingNote?.editHistory[parseInt(version, 10)]?.content ?? "";
    const [content, setContent] = useState(getTempNote(id) ?? originalContent);
    useEffect(() => {
        setTempNote(id, content);
    }, [content]);
    
    const Background=theme.bgImage?ImageBackground:View;
    return (
        <Background {...(theme.bgImage?{source: theme.bgImage, imageStyle: { opacity: theme.bgOpacity }}:{})} style={[styles.content, { backgroundColor: theme.color1 }]}>
            <KeyboardAwareScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContent} extraScrollHeight={70} enableOnAndroid={true}keyboardShouldPersistTaps="handled">
                <View style={styles.searchMenu}>
                    <View style={styles.searchContainer}>
                        <SearchBar theme={theme} text="Search in Note. . ." active={true}/>
                    </View>
                    <View style={styles.menuContainer}>
                        <Pressable onPress={() => setMenuVisible(!menuVisible)}>
                            <Text style={[styles.noteMenu, { color: theme.color3, fontFamily: theme.textFont }]}>⋮</Text>
                        </Pressable>
                    </View>
                    {menuVisible && (
                        <View style={[styles.dropdown, { backgroundColor: theme.color3 }]}>
                            <Pressable onPress={() => Alert.alert("Save into edit history!")}>
                                <Text style={[styles.dropdownItem, { color: theme.textColor3 }]}>Save to Edit History</Text>
                            </Pressable>
                            <Pressable onPress={() => Alert.alert("Delete note!")}>
                                <Text style={[styles.dropdownItem, { color: theme.textColor3 }]}>Delete</Text>
                            </Pressable>
                            <Pressable onPress={() => Alert.alert("Change theme!")}>
                                <Text style={[styles.dropdownItem, { color: theme.textColor3 }]}>Theme</Text>
                            </Pressable>
                            <Pressable onPress={() => Alert.alert("Manage groups!")}>
                                <Text style={[styles.dropdownItem, { color: theme.textColor3 }]}>Manage Groups</Text>
                            </Pressable>
                        </View>
                    )}
                </View>
                <NoteGroup theme={theme} text={existingNote?existingNote.groups.map((group, i)=> i==existingNote.groups.length-1?(group):(group+", ")):""}/>
                <View style={[styles.noteContentBox, {backgroundColor: theme.color2}]}>
                    <TextInput style={[styles.noteContent, {color: theme.textColor2, fontFamily: theme.textFont}]} value={content} onChangeText={setContent} multiline={true}/>
                </View>
                <Pressable style={[styles.noteOptionBox, {backgroundColor: theme.color3}]} onPress={()=>router.push({pathname: "./editHistory", params: {id, version}})}>
                    <Text style={[styles.noteOptionText, {color: theme.textColor3, fontFamily: theme.textFont}]}>View Edit History</Text>
                </Pressable>
            </KeyboardAwareScrollView>
        </Background>
    );
}

const styles = StyleSheet.create({
    searchMenu: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%"
    },
    searchContainer: {
        width: "92%"
    },
    menuContainer: {
        justifyContent: "flex-start",
        alignItems: "flex-start",
        width: "4%",
        marginTop: -4
    },
    noteMenu: {
        fontSize: 40,
        fontWeight: "700"
    },
    content: {
        // height: screenHeight*0.8,
        flex: 1,
        width: screenWidth,
        paddingVertical: 10
    },
    scrollContent: {
        paddingVertical: 20,
        paddingHorizontal: "5%",
        alignItems: "center",
        width: screenWidth
    },
    noteContentBox: {
        alignItems: "flex-start",
        width: "100%",
        minHeight: 500,
        marginTop: 10,
        paddingHorizontal:15,
        paddingVertical:15,
        borderRadius: 20
    },
    noteContent: {
        flex: 1,
        textAlignVertical: "top",
        width: "100%",
        fontSize: 16,
        marginBottom: 5
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
    noteOptionText: {
        fontSize: 18,
        fontWeight: "700"
    },
    dropdown: {
        position: "absolute",
        top: 45,
        right: 0,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        elevation: 5,
        zIndex: 999
    },
    dropdownItem: {
        fontSize: 18,
        fontWeight: 600,
        paddingVertical: 8
    }
});
