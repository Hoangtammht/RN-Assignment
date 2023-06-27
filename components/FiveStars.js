import React from "react"
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
    View,
  } from 'react-native';

function FiveStars(props){
    const { numberOfStars } = props;
    return <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
        {[0, 1, 2, 3, 4].map(item =>       
        <Icon key={`${item}`} name='star' style={{marginEnd: 2}} size={8} color={item <= numberOfStars - 1 ? 'red' : 'gray'} />
        )}
    </View>
     
}

export default FiveStars