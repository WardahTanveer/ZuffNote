//@/app/(main)/search.jsx 

import { View, ImageBackground, ScrollView, Text, StyleSheet, Pressable, Dimensions, TextInput } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import { setSearchState, getSearchState } from "@/searchStore";
import { Theme, groups, notes } from "@/database/dummyData";
import SearchBar from "@/components/SearchBar.jsx";
import TitleText from "@/components/TitleText";
import NotePreview from "@/components/NotePreview";
import NoteCheck from "@/components/NoteCheck";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

function App(){
    const {selectedGroup}=useLocalSearchParams();

    const [groupFilter, setGroupFilter]=useState(false);
    const handleGroupFilter=()=>{
        setGroupFilter((g)=>!g);
    };

    const [groupSearchText, setGroupSearchText]=useState("");
    const filteredGroups=groups.filter((group)=>{
        return group.toLowerCase().includes(groupSearchText.toLowerCase());
    })

    const [includeGroups, setIncludeGroups]=useState(selectedGroup?[selectedGroup]:[]);
    const [excludeGroups, setExcludeGroups]=useState([]);
    const [searchText, setSearchText]=useState("");
    useEffect(() => {
        const saved = getSearchState();
        if(selectedGroup){
            setIncludeGroups([selectedGroup]);
            setExcludeGroups([]);
            setSearchText("");
        }
        else{
            setSearchText(saved.searchText || "");
            setIncludeGroups(saved.includeGroups || []);
            setExcludeGroups(saved.excludeGroups || []);
        }
    }, []);
    useEffect(() => {
        setSearchState(searchText,  includeGroups, excludeGroups);
    }, [searchText, includeGroups, excludeGroups]);
    const toggleInclude=(group)=>{
        if (includeGroups.includes(group)) {
            setIncludeGroups((prev) => prev.filter((g) => g !== group));
        } else {
            setIncludeGroups((prev) => [...prev, group]);
            setExcludeGroups((prev) => prev.filter((g) => g !== group));
        }
    };
    const toggleExclude=(group)=>{
        if (excludeGroups.includes(group)) {
            setExcludeGroups((prev) => prev.filter((g) => g !== group));
        } else {
            setExcludeGroups((prev) => [...prev, group]);
            setIncludeGroups((prev) => prev.filter((g) => g !== group));
        }
    };

    const latestEditDate=(note)=>{
        const latest=note.editHistory[0];
        return new Date(`${latest.date} ${latest.time}`);
    };
    const sortedNotes=[...notes].sort((a, b) => latestEditDate(b) - latestEditDate(a));

    const filteredNotes=sortedNotes.filter((note)=>{
        const matchesText=note.editHistory[0].content.toLowerCase().includes(searchText.toLowerCase());
        const matchesIncludes=(includeGroups.length===0||note.groups.some(g=>includeGroups.includes(g)));
        const matchesExcludes=(excludeGroups.length===0||!note.groups.some(g=>excludeGroups.includes(g)));
        return matchesText && matchesIncludes && matchesExcludes;
    });

    const Background=Theme.appTheme.bgImage?ImageBackground:View;
    return (
        <Background {...(Theme.appTheme.bgImage?{source: Theme.appTheme.bgImage, imageStyle: { opacity: Theme.appTheme.bgOpacity }}:{})} style={[styles.content, { backgroundColor: Theme.appTheme.color1 }]}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <SearchBar theme={Theme.appTheme} text="Search. . ." active={true} value={searchText} onChangeText={setSearchText}/>
                {groupFilter?(
                    <>
                        <Pressable style={[styles.textLeft, {paddingBottom: 20}]} onPress={() => handleGroupFilter()}>
                            <TitleText theme={Theme.appTheme} text="Filter Groups ▲"/>
                        </Pressable>
                        <SearchBar theme={Theme.appTheme} text="Search Group. . ." active={true} value={groupSearchText} onChangeText={setGroupSearchText}/>
                        {filteredGroups.map((g, i)=>
                            <NoteCheck key={i} theme={Theme.appTheme} text={g} include={includeGroups.includes(g)} exclude={excludeGroups.includes(g)} onTick={()=>toggleInclude(g)} onCross={()=>toggleExclude(g)}/>
                        )}
                        <View style={{paddingBottom: 20}}>
                            <TitleText theme={Theme.appTheme} text="........."/>
                        </View>
                    </>
                ):(
                    <Pressable style={styles.textLeft} onPress={() => handleGroupFilter()}>
                        <TitleText theme={Theme.appTheme} text="Filter Groups ▼"/>
                    </Pressable>
                )}
                {filteredNotes.length > 0 ? (
                    filteredNotes.map((n, i) => (
                        <NotePreview key={i} theme={Theme.appTheme} id={n.id} version={0} groups={n.groups} dateTime={n.editHistory[0].date + "  " + n.editHistory[0].time} content={n.editHistory[0].content}
                        />
                    ))
                ) : (
                    <Text style={{ color: Theme.appTheme.textColor1, marginTop: 20 }}>
                        No notes match your search.
                    </Text>
                )}
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
        marginLeft: 20,
        marginVertical: 4
    },
})