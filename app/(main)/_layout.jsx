// @/app/(main)/_layout.jsx
import { Stack } from "expo-router";
import { Dimensions, StyleSheet, View } from "react-native";

import Header from "@/components/Header";
import MenuFooter from "@/components/MenuFooter";
import { Theme } from "@/data/dummyData";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

export default function MainLayout() {
  return (
    <View style={{flex: 1}}>
        <Header theme={Theme.appTheme} />
        <View style={styles.background}>
            <Stack screenOptions={{ headerShown: false, animation: "none" }} />
        </View>
        <MenuFooter theme={Theme.appTheme} />
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
