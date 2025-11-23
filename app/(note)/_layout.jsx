// @/app/(note)/_layout.jsx
import { View, StyleSheet, ScrollView, Dimensions } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { Theme, notes } from "@/database/dummyData";

import BackHeader from "@/components/BackHeader";
import Footer from "@/components/Footer";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

export default function MainLayout() {
    const { id } = useLocalSearchParams();
    const currentNote = notes.find(n => n.id.toString() === id);
    const theme = currentNote?.noteTheme || Theme.noteTheme;
    return (
        <View style={{flex: 1}}>
            <BackHeader theme={theme} text=""/>
            <View style={styles.background}>
                <Stack screenOptions={{ headerShown: false, animation: "none" }} />
            </View>
            <Footer theme={theme} />
        </View>
    );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    marginTop: screenHeight*0.1,
    marginBottom: screenHeight*0.1,
    width: screenWidth
  },
});
