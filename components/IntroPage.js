import React, { useState, useEffect } from "react";
import { Text, View, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const IntroPage = ({ favoriteProducts, onRemoveItem, onDeleteAllItems }) => {
  // const [products, setProducts] = useState([]);



  const removeFavoriteItem = async (itemId) => {
    // const updatedProducts = products.map((item) => {
    //   if (item.id === itemId) {
    //     return {
    //       ...item,
    //       isSaved: false,
    //     };
    //   }
    //   return item;
    // });
    // setProducts(updatedProducts);

    const updatedFavorites = favoriteProducts.filter((item) => item.id !== itemId);
    onRemoveItem(itemId);
    try {
      await AsyncStorage.setItem('favoriteProducts', JSON.stringify(updatedFavorites));
    } catch (error) {
      console.log('Error saving favorite products:', error);
    }
  };

  const removeAllFavoriteItems = async () => {
    // const updatedProducts = products.map((item) => ({
    //   ...item,
    //   isSaved: false,
    // }));
    // setProducts(updatedProducts);

    onDeleteAllItems();
    try {
      await AsyncStorage.removeItem('favoriteProducts');
    } catch (error) {
      console.log('Error removing favorite products:', error);
    }
  };

  if (favoriteProducts.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>No favorite products available.</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image style={styles.image} source={{ uri: item.url }} />
      <View style={styles.itemDetails}>
        <Text style={styles.productName}>{item.productName}</Text>
        <Text style={styles.price}>$ {item.price}</Text>
      </View>
      <TouchableOpacity onPress={() => removeFavoriteItem(item.id)} style={styles.deleteIconContainer}>
        <Icon name="trash" size={20} color="gray" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>List of Favorite Products:</Text>
      <TouchableOpacity onPress={removeAllFavoriteItems} style={styles.deleteAllIconContainer}>
        <Icon name="trash" size={24} color="#FF0000" />
        <Text style={styles.deleteAllText}>Delete all product</Text>
      </TouchableOpacity>
      <FlatList
        data={favoriteProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};


const styles = StyleSheet.create({
   container: {
     flex: 1,
     paddingHorizontal: 16,
     paddingTop: 16,
   },
   emptyText: {
     fontSize: 16,
     textAlign: "center",
     color: "#666",
   },
   title: {
     fontSize: 18,
     fontWeight: "bold",
     marginBottom: 16,
   },
   itemContainer: {
     flexDirection: "row",
     alignItems: "center",
     marginBottom: 12,
     paddingVertical: 8,
     paddingHorizontal: 16,
     backgroundColor: "#f8f8f8",
     borderRadius: 8,
   },
   image: {
     width: 60,
     height: 60,
     marginRight: 12,
     borderRadius: 4,
   },
   itemDetails: {
     flex: 1,
   },
   productName: {
     fontSize: 16,
     fontWeight: "bold",
     marginBottom: 4,
   },
   price: {
     fontSize: 14,
     color: "#666",
   },
   deleteIconContainer: {
     marginLeft: 8,
   },
   deleteAllIconContainer: {
     flexDirection: "row",
     alignItems: "center",
     marginBottom: 16,
   },
   deleteAllText: {
     fontSize: 16,
     marginLeft: 8,
     color: "#FF0000",
   },
   listContainer: {
     paddingBottom: 16,
   },
});

export default IntroPage;
