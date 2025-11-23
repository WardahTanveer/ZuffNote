// @/app/(settings)/_layout.jsx
import { View, StyleSheet, ScrollView, Dimensions } from "react-native";
import { Stack, usePathname } from "expo-router";
import { Theme } from "@/database/dummyData";
import BackHeader from "@/components/BackHeader";
import Footer from "@/components/Footer";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

export default function MainLayout() {
  const pathname = usePathname();
  const headerText=(pathname==="/genSettings")?("General Settings"):("Customisation Settings");
  return (
    <View style={{flex: 1}}>
        <BackHeader theme={Theme.appTheme} text={headerText}/>
        <View style={styles.background}>
            <Stack screenOptions={{ headerShown: false, animation: "none" }} />
        </View>
        <Footer theme={Theme.appTheme} />
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
