import React, {useState} from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import GridItem from "./GridItem";
import AsyncStorage from '@react-native-async-storage/async-storage';


const MenuItems = ({ products, setProducts, setFavoriteProducts }) => {

  const toggleFavorite = async (productId) => {
    let clonedProducts = products.map((eachProduct) => {
      if (productId === eachProduct.id) {
        return {
          ...eachProduct,
          isSaved: !eachProduct.isSaved,
        };
      }
      return eachProduct;
    });
    setProducts(clonedProducts);
  
    const updatedFavoriteProducts = clonedProducts.filter(
      (product) => product.isSaved
    );
    setFavoriteProducts(updatedFavoriteProducts);
    try {
      await AsyncStorage.setItem('favoriteProducts', JSON.stringify(updatedFavoriteProducts));
    } catch (error) {
      console.log('Error saving favorite products:', error);
    }
  };
  
  return (
    <View style={menuStyles.container}>
      <FlatList
        style={{marginTop: 5}}
        data={products}
        keyExtractor={item => item.id}
        numColumns={2}
        renderItem={({item}) => (
          <GridItem 
          item={item} 
          index={item.id}
          onPress={() => toggleFavorite(item.id)}
          />
        )}
      />
    </View>
  );
};

const menuStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  }
});

export default MenuItems;
