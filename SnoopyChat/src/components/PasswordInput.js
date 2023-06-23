import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, TextInput, Text, View, Image, Icon} from "react-native";

export const Input = () => {
    return (
    //     <TextInput
    //     style={styles.textInput}
    //     label="Password"
    //     secureTextEntry={secure}
    //     leftIconType="oct"
    //     rippleColor="blue"
    //     rightIcon={eye}
    //     rightIconType="material"
    //     onPress={()=>displayPassword()}
    //     value={password}
    //     onChangeText={(password) => setPassword(password)}
    //   />

    <View >
    <TextInput
        placeholder="User Nickname"
        onChangeText={(searchString) => {this.setState({searchString})}}
        underlineColorAndroid="transparent"
    />

<Ionicons name="eye" size={20} color="#000"/>
    
</View>
    );

    const styles = StyleSheet.create({
        eye: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            padding:10,
          },
        input:{
            paddingBottom: 10,
            paddingRight:0,
            paddingLeft:10,
            paddingTop:10,
        },
    });
} 