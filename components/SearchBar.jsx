// @/components/SearchBar.jsx

import { View, TextInput, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

function SearchBar(props){
    const router=useRouter();
    return (
        <View style={[styles.searchBar, {borderColor: props.theme.color3}]}>
            <TextInput style={[styles.searchText, {
        color: props.theme.textColor1, fontFamily: props.theme.textFont}]} placeholder={props.text} editable={props.active} value={props.value} onChangeText={props.onChangeText}/>
        </View>
    );
}
export default SearchBar;

const styles=StyleSheet.create({
    searchBar: {
        justifyContent: "center",
        width: "100%",
        marginBottom: 10,
        paddingHorizontal: 15,
        borderStyle: "solid",
        borderWidth: 3,
        borderRadius: 40,
        backgroundColor: "rgba(255, 255, 255, 0)"
    },
    searchText: {
        fontSize: 18,
        fontWeight: "500",
    }
})