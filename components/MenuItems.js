import React, { useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import GridItem from "./GridItem";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const MenuItems = ({ products, setProducts, favoriteProducts, setFavoriteProducts }) => {
  const navigation = useNavigation();

  useEffect(() => {
    const updateProducts = () => {
      const updatedProducts = products.map((product) => ({
        ...product,
        isSaved: favoriteProducts.some((favProduct) => favProduct.id === product.id),
      }));
      setProducts(updatedProducts);
    };

    updateProducts();
  }, [favoriteProducts, setProducts]);

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

  const navigateToProductDetail = (product) => {
    navigation.navigate('ProductDetail', { product });
  };

  return (
    <View style={menuStyles.container}>
      <FlatList
        style={{ marginTop: 5 }}
        data={products}
        keyExtractor={item => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigateToProductDetail(item)}
            style={menuStyles.gridItemContainer}
          >
            <GridItem
              item={item}
              onPress={() => toggleFavorite(item.id)}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const menuStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  gridItemContainer: {
    flex: 0.5,
    borderColor: 'gray',
  }
});

export default MenuItems;
