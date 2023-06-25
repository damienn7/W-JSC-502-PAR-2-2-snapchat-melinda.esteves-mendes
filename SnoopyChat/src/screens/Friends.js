

import {View,Text,Screen} from 'react-native';

export default function Friends({friend,onClick}) {
   
 
    return(  
            <Text onPress={onClick}>{friend}</Text>
        )

}