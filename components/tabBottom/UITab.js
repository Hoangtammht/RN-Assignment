import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import IntroPage from "../IntroPage";
import MenuItems from "../MenuItems";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Tab = createBottomTabNavigator();

const screenOptions = ({ route }) => ({
  headerShown: false,
  tabBarActiveTintColor: "gray",
  tabBarInactiveTintColor: "gray",
  tabBarIcon: ({ focused, color, size }) => {
    let screenName = route.name;
    const iconName = screenName == "MenuItems" ? "align-center" : "user";
    return <Icon name={iconName} size={23} />;
  },
});

const UITab = (props) => {
  const [products, setProducts] = useState([
    {
      id: 1,
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnVy-2ip2a7n8CaBfTuYs2bYe7Z2-jOAR7mrPzeH8PlwM8W7vQw6cO0gfm-eiELCdqyNo&usqp=CAU",
      price: 675.4,
      productName: "Samsung SC6573",
      specification: [
        "Dry clean",
        "Cyclone filter",
        "Convenience cord storage",
      ],
      review: 19,
      star: 5,
    },
    {
      id: 2,
      url: "https://tearu.vn/wp-content/uploads/2021/10/may-hut-bui-mini-cam-tay-1.jpg",
      price: 88,
      productName: "Xiaomi ss39",
      specification: ["Electric motor", "Dust filter bags", "Charging port"],
      review: 29,
      star: 4,
    },
    {
      id: 3,
      url: "https://tearu.vn/wp-content/uploads/2021/10/may-hut-bui-mini-cam-tay-5.jpg",
      price: 3129,
      productName: "Xiaomi KY255",
      specification: [
        "Small size, capacity",
        "Dust filter bags",
        "Charging port",
      ],
      review: 39,
      star: 2,
    },
    {
      id: 4,
      url: "https://tearu.vn/wp-content/uploads/2021/10/may-hut-bui-mini-cam-tay-2.jpg",
      price: 55,
      productName: "Robot KY255",
      specification: [
        "Dust filter bags",
        "Charging port",
        "Small size, capacity",
      ],
      review: 79,
      star: 1,
    },
    {
      id: 5,
      url: "https://tearu.vn/wp-content/uploads/2021/10/may-hut-bui-mini-cam-tay-4.jpg",
      price: 109,
      productName: "LG HT239",
      specification: ["Dust filter bags", "Charging port", "Electric motor"],
      review: 59,
      star: 1,
    },
    {
      id: 6,
      url: "https://tearu.vn/wp-content/uploads/2021/10/may-hut-bui-mini-cam-tay-1.jpg",
      price: 56,
      productName: "LG HT239",
      specification: [
        "Save time",
        "Dust box",
        "Some other machine details such as filter core",
      ],
      review: 25,
      star: 2,
    },
    {
      id: 7,
      url: "https://tearu.vn/wp-content/uploads/2021/10/may-hut-bui-mini-cam-tay-1.jpg",
      price: 56,
      productName: "KOG HT239",
      specification: [
        "Save time",
        "Dust box",
        "Some other machine details such as filter core",
      ],
      review: 25,
      star: 2,
    },
    {
      id: 8,
      url: "https://tearu.vn/wp-content/uploads/2021/10/may-hut-bui-mini-cam-tay-1.jpg",
      price: 56,
      productName: "GG HT239",
      specification: [
        "Save time",
        "Dust box",
        "Some other machine details such as filter core",
      ],
      review: 25,
      star: 2,
    },
    {
      id: 9,
      url: "https://tearu.vn/wp-content/uploads/2021/10/may-hut-bui-mini-cam-tay-1.jpg",
      price: 56,
      productName: "GF HT239",
      specification: [
        "Dust box",
        "Some other machine details such as filter core",
      ],
      review: 25,
      star: 2,
    },
  ]);
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  const removeFavoriteItem = async (itemId) => {
    const updatedFavorites = favoriteProducts.filter(
      (item) => item.id !== itemId
    );
    setFavoriteProducts(updatedFavorites);

    const updatedProducts = products.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          isSaved: false,
        };
      }
      return item;
    });
    setProducts(updatedProducts);

    try {
      await AsyncStorage.setItem(
        "favoriteProducts",
        JSON.stringify(updatedFavorites)
      );
    } catch (error) {
      console.log("Error saving favorite products:", error);
    }
  };

  const removeAllFavoriteItems = async () => {
    setFavoriteProducts([]);

    const updatedProducts = products.map((item) => ({
      ...item,
      isSaved: false,
    }));
    setProducts(updatedProducts);

    try {
      await AsyncStorage.removeItem("favoriteProducts");
    } catch (error) {
      console.log("Error removing favorite products:", error);
    }
  };

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name={"MenuItems"} options={{ tabBarLabel: "Menu" }}>
        {() => (
          <MenuItems
            products={products}
            setProducts={setProducts}
            setFavoriteProducts={setFavoriteProducts}
          />
        )}
      </Tab.Screen>
      <Tab.Screen name={"IntroPage"} options={{ tabBarLabel: "Intro" }}>
        {() => (
          <IntroPage
            favoriteProducts={favoriteProducts}
            onRemoveItem={removeFavoriteItem} // Pass the removeFavoriteItem function as a prop
            onDeleteAllItems={removeAllFavoriteItems} // Pass the removeAllFavoriteItems function as a prop
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default UITab;
