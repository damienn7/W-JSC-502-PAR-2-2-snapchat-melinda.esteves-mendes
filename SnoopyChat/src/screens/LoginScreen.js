import React, {UseContext, useContext} from "react";
import { Text, SafeAreaView, View, Stylesheet } from "react-native";
import { AuthContext } from "../context/ViewContext";

const LoginScreen = ({navigation})=>{
    const {test} = useContext(AuthContext);
    return (
        <Text>{test}</Text>
    )
}

export default LoginScreen;