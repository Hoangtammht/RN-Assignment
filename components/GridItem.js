import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  Image,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import FiveStars from './FiveStars';


const GridItem = props => {
  const {item, onPress} = props;
  return (
    <View
      style={{
        flex: 0.5,
        marginLeft: item.id % 2 == 0 ? 10 : 0,
        marginTop: 5,
        marginRight: 10,
        marginBottom: 5,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'gray',
      }}>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 10,
        }}>
<Image
  style={{
    width: 90,
    height: 100,  
    resizeMode: 'cover',
    padding: 5,
    borderRadius: 20,
    marginLeft: 5,
    marginRight: 15,
  }}
  source={{
    uri: item.url
  }}
/>

        <Text
          style={{
            color: 'black',
            fontSize: 18,
            flex: 1,
            textAlign: 'right',
            paddingRight: 5,
          }}>
          $ {item.price}
        </Text>
      </View>
      <Text
        style={{
          color: 'red',
          fontSize: 18,
          fontWeight: 'bold',
          marginHorizontal: 10,
          marginTop: 5,
        }}>
        $ {item.productName}
      </Text>
      {item.specification.map(specification => {
        return (
          <Text
            key={specification}
            style={{
              color: 'black',
              fontSize: 15,
              paddingHorizontal: 5,
              paddingBottom: 5,
            }}>
            * {specification}
          </Text>
        );
      })}
      <View style={{flexDirection: 'row', padding: 12}}>
        <TouchableOpacity
          onPress={onPress}
          style={{flexDirection: 'row'}}>
          <Icon
            name="heart"
            style={{marginEnd: 5}}
            size={30}
            color={
              item.isSaved == undefined || item.isSaved == false
                ? 'gray'
                : 'red'
            }
          />
          <Text
            style={{
              color:
                item.isSaved == undefined || item.isSaved == false
                  ? 'gray'
                  : 'red',
              fontSize: 12,
              width: 50,
            }}>
            Saved to cart
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
          }}>
          <FiveStars numberOfStars={item.star} />
          <Text
            style={{
              color: 'green',
              fontSize: 15 * 0.8,
              textAlign: 'right',
              paddingTop: 5,
            }}>
            {item.review} reviews
          </Text>
        </View>
      </View>
    </View>
  );
};

export default GridItem;
