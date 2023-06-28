import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FiveStars from './FiveStars';

const ProductDetail = ({ route }) => {
  const { product } = route.params;
  const [isFavorite, setIsFavorite] = useState(product.isSaved);

  useEffect(() => {
    const updateFavoriteStatus = async () => {
      try {
        const favoriteProducts = await AsyncStorage.getItem('favoriteProducts');
        if (favoriteProducts) {
          const updatedFavoriteProducts = JSON.parse(favoriteProducts);
          const isProductSaved = updatedFavoriteProducts.some(
            (favProduct) => favProduct.id === product.id
          );
          setIsFavorite(isProductSaved);
        }
      } catch (error) {
        console.log('Error retrieving favorite products:', error);
      }
    };

    updateFavoriteStatus();
  }, [product.id]);

  const toggleFavorite = async () => {
    setIsFavorite((prevIsFavorite) => !prevIsFavorite); // Use callback to update the state
  
    const updatedProduct = {
      ...product,
      isSaved: !isFavorite, // Update the isSaved property based on the new state value
    };
  
    try {
      const favoriteProducts = await AsyncStorage.getItem('favoriteProducts');
      let updatedFavoriteProducts = [];
  
      if (favoriteProducts) {
        updatedFavoriteProducts = JSON.parse(favoriteProducts);
        const index = updatedFavoriteProducts.findIndex(
          (favProduct) => favProduct.id === updatedProduct.id
        );
  
        if (index !== -1) {
          updatedFavoriteProducts.splice(index, 1);
        } else {
          updatedFavoriteProducts.push(updatedProduct);
        }
      } else {
        updatedFavoriteProducts.push(updatedProduct);
      }
  
      await AsyncStorage.setItem(
        'favoriteProducts',
        JSON.stringify(updatedFavoriteProducts)
      );
    } catch (error) {
      console.log('Error updating favorite products:', error);
    }
  };
  
  
  

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.url }} style={styles.image} />
      <Text style={styles.price}>$ {product.price}</Text>
      <Text style={styles.name}>{product.productName}</Text>
      {product.specification.map((spec, index) => (
        <Text key={index} style={styles.specification}>
          * {spec}
        </Text>
      ))}
      {/* <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
        <Icon
          name="heart"
          style={styles.favoriteIcon}
          size={30}
          color={isFavorite ? 'red' : 'gray'}
        />
        <Text style={styles.favoriteText}>
          {isFavorite ? 'Saved to cart' : 'Save to cart'}
        </Text>
      </TouchableOpacity> */}
      <View style={styles.ratingContainer}>
        <FiveStars numberOfStars={product.star} />
        <Text style={styles.review}>{product.review} reviews</Text>
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 20,
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  name: {
    fontSize: 18,
    color: 'red',
    fontWeight: 'bold',
    marginVertical: 5,
  },
  specification: {
    fontSize: 15,
    color: 'black',
    marginVertical: 2,
  },
  favoriteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  favoriteIcon: {
    marginRight: 5,
  },
  favoriteText: {
    fontSize: 12,
    color: 'red',
    width: 100,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  review: {
    fontSize: 15 * 0.8,
    color: 'green',
    textAlign: 'right',
    marginLeft: 5,
  },
};

export default ProductDetail;
