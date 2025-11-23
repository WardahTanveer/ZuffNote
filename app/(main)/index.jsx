//@/app/(main)/index.jsx

import { View, ScrollView, Text, StyleSheet, Pressable, Dimensions, ImageBackground } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { Theme, groups, notes } from "@/database/dummyData";
import SearchBar from "@/components/SearchBar.jsx";
import TitleText from "@/components/TitleText";
import MediumText from "@/components/MediumText";
import NotePreview from "@/components/NotePreview";
import NoteGroup from "@/components/NoteGroup";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

function App(){
    const router=useRouter();
    const [expanded, setExpanded]=useState(null);
    const handleExpand=(section)=>{
        setExpanded((s)=>(s===section?null:section));
    };
    const showGroups=expanded==="groups";
    const showNotes=expanded==="notes";
    const latestEditDate=(note)=>{
        const latest=note.editHistory[0];
        return new Date(`${latest.date} ${latest.time}`);
    };
    const sortedNotes = [...notes].sort((a, b) => latestEditDate(b) - latestEditDate(a));
    const Background=Theme.appTheme.bgImage?ImageBackground:View;
    return (
        <Background {...(Theme.appTheme.bgImage?{source: Theme.appTheme.bgImage, imageStyle: { opacity: Theme.appTheme.bgOpacity }}:{})} style={[styles.content, { backgroundColor: Theme.appTheme.color1 }]}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Pressable style={{width: "100%", alignItems: "center"}}onPress={()=>router.push("/search")}>
                    <SearchBar theme={Theme.appTheme} text="Search. . ." active={false}/>
                </Pressable>
                <TitleText theme={Theme.appTheme} text="Your Groups"/>
                {(showGroups?groups:(showNotes?[]:groups.slice(0,4))).map((g, i)=>
                    <Pressable key={i} style={{width: "100%"}} onPress={()=>router.push({pathname:"/search", params:{selectedGroup: g}})}>
                        <NoteGroup theme={Theme.appTheme} text={g} />
                    </Pressable>
                )}
                <Pressable style={styles.textLeft} onPress={() => handleExpand("groups")}>
                    <MediumText theme={Theme.appTheme} text={showGroups?"_":"..."}/>
                </Pressable>
                <TitleText theme={Theme.appTheme} text="Most Recent Notes"/>
                {(showNotes?sortedNotes.slice(0,5):(showGroups?[]:sortedNotes.slice(0,2))).map((n, i)=>
                    <NotePreview key={i} theme={Theme.appTheme} id={n.id} version={0} groups={n.groups} dateTime={n.editHistory[0].date+"  "+n.editHistory[0].time} content={n.editHistory[0].content}/>
                )}
                <Pressable style={styles.textLeft} onPress={() => handleExpand("notes")}>
                    <MediumText theme={Theme.appTheme} text={showNotes?"_":"..."}/>
                </Pressable>
            </ScrollView>
        </Background>
    );
}
export default App;

const styles=StyleSheet.create({
    content: {
        height: screenHeight*0.8,
        width: screenWidth,
        paddingVertical: 10,
        backgroundColor: Theme.appTheme.color1
    },
    scrollContent: {
        paddingVertical: 20,
        paddingHorizontal: "5%",
        alignItems: "center",
        width: screenWidth
    },
    textLeft: {
        alignSelf: "flex-start",
        marginVertical: 4
    },
})