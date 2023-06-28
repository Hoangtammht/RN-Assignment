import React, { useState, useEffect } from "react";
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
    const iconName = screenName == "MenuItems" ? "align-center" : "cart-plus";
    return <Icon name={iconName} size={23} />;
  },
});

const UITab = (props) => {
  const [products, setProducts] = useState([
    {
      id: 1,
      url: "https://www.sony.com.vn/image/c0d5f94fb6eaca7bf75bffe64874c195?fmt=pjpeg&bgcolor=FFFFFF&bgc=FFFFFF&wid=2515&hei=1320",
      price: 675.4,
      productName: "Sony LinkBuds S",
      specification: [
        "Thoải mái",
        "Gọn nhẹ",
        "Nghe âm thanh xung quanh rõ hơn",
      ],
      review: 19,
      star: 5,
    },
    {
      id: 2,
      url: "https://product.hstatic.net/200000722513/product/thumbtainghe-recovered_78f62db1124e4716a12f057d1a73f1c8_54d79267e0374aa8a441c68dc4c2e094.png",
      price: 158,
      productName: "Gaming Headphone Corsair",
      specification: ["Cao su chống trượt", "Độ bền cao", "RGB 16.8 triệu màu"],
      review: 29,
      star: 4,
    },
    {
      id: 3,
      url: "https://songlongmedia.com/media/lib/22-02-2022/tainghesonylinkbudswf-l900trulywirelesssonglongmedia1.jpg",
      price: 3129,
      productName: "SONY LINKBUDS WF-L900",
      specification: [
        "Nhỏ gọn",
        "AI tự động phân tích và giảm ồn",
        "Thiết kế lạ mắt đem đến sự trải nghiệm thú vị.",
      ],
      review: 39,
      star: 2,
    },
    {
      id: 4,
      url: "https://cdn2.cellphones.com.vn/x/media/catalog/product/t/a/tai-nghe-khong-day-soul-s-live-30-6_1.png",
      price: 55,
      productName: "Soul S-LIVE 30",
      specification: [
        "Trải nghiệm chất âm sống động",
        "Thời lượng sử dụng hợp lý, phù hợp",
        "Phù hợp để luyện tập thể thao",
      ],
      review: 79,
      star: 1,
    },
    {
      id: 5,
      url: "https://3kshop.vn/wp-content/uploads/2020/12/DDA24146-9E89-49E0-8CB0-C5068226AF5F.png",
      price: 109,
      productName: "Apple AirPods Max",
      specification: ["Thiết kế chụp tai êm ái", "Chất liệu cao cấp", "Pin dung lượng cao sử dụng nhiều giờ, hỗ trợ sạc nhanh"],
      review: 59,
      star: 1,
    },
    {
      id: 6,
      url: "https://cdn2.cellphones.com.vn/x/media/catalog/product/b/u/buds4pro_tr.png",
      price: 56,
      productName: "Xiaomi Redmi Buds 4 Pro",
      specification: [
          "Nhỏ gọn",
          "AI tự động phân tích và giảm ồn",
          "Thiết kế lạ mắt.",
      ],
      review: 25,
      star: 2,
    },
    {
      id: 7,
      url: "https://hanoicomputercdn.com/media/product/68140_tai_nghe_e_dra_eh414_pro_usb_7_1_0001_2.jpg",
      price: 56,
      productName: "E-DRA EH414 PRO",
      specification: ["Thiết kế chụp tai êm ái", "Chất liệu cao cấp", "Pin dung lượng cao, hỗ trợ sạc nhanh."],
      review: 25,
      star: 2,
    },
    {
      id: 8,
      url: "https://hanoicomputercdn.com/media/product/53849_tuf_gaming_h3_red_05.png",
      price: 56,
      productName: "ASUS TUF GAMING H3 ",
      specification: ["Cao su chống trượt", "Độ bền cao", "RGB 16.8 triệu màu"],
      review: 25,
      star: 2,
    },
    {
      id: 9,
      url: "https://hanoicomputercdn.com/media/product/69735_tai_nghe_hp_hyperx_stinger_black_ii_519t1aa_0004_5.jpg",
      price: 56,
      productName: "HYPERX STINGER",
      specification: [
        "Chống ồn",
        "Kết nối ổn định",
      ],
      review: 25,
      star: 2,
    },
  ]);
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  useEffect(() => {
    const loadFavoriteProducts = async () => {
      try {
        const savedFavoriteProducts = await AsyncStorage.getItem(
          "favoriteProducts"
        );
        if (savedFavoriteProducts) {
          const parsedFavoriteProducts = JSON.parse(savedFavoriteProducts);
          setFavoriteProducts(parsedFavoriteProducts);
        }
      } catch (error) {
        console.log("Error loading favorite products:", error);
      }
    };

    loadFavoriteProducts();
  }, []);

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
            favoriteProducts={favoriteProducts}
            setFavoriteProducts={setFavoriteProducts}
          />
        )}
      </Tab.Screen>
      <Tab.Screen name={"Cart"} options={{ tabBarLabel: "Cart" }}>
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
