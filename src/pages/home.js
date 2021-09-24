import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Keyboard,
  FlatList,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { RFValue } from "react-native-responsive-fontsize";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNetInfo } from "@react-native-community/netinfo";
import { BorderlessButton } from "react-native-gesture-handler";
import {
  getBottomSpace,
  getStatusBarHeight,
} from "react-native-iphone-x-helper";

import api from "../services/api";
import { colors, W, H } from "../config";
import { ProductCard } from "../components/ProductCard";
import { CategoryCard } from "../components/CategoryCard";
import { SkeletonCategoryCards } from "../components/SkeletonCategoryCards";
import { SkeletonProductCard } from "../components/SkeletonProductCard";

export function Home() {
  const navigation = useNavigation();
  const netInfo = useNetInfo();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [textForSearch, setTextForSearch] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [productsIsLoading, setProductsIsLoading] = useState(true);
  const [categoriesIsLoading, setCategoriesIsLoading] = useState(true);

  useEffect(() => {
    SearchDataInApi();
  }, []);
  useEffect(() => {
    if (netInfo.isInternetReachable) {
      SearchDataInApi();
    }
  }, [netInfo.isInternetReachable]);

  function Logout() {
    navigation.navigate("Login");
  }
  function SearchDataInApi() {
    api
      .get("/categories")
      .then((response) => {
        setCategories(response.data);
        setCategoriesIsLoading(false);
      })
      .catch(() => {})
      .finally(() => {});

    api
      .get("/products")
      .then((response) => {
        setProducts(response.data);
        setAllProducts(response.data);
        setProductsIsLoading(false);
      })
      .catch(() => {})
      .finally(() => {});
  }
  function SearchForProduct() {
    setSearchLoading(true);

    setSelectedId(null);
    DeselectCategory();

    if (textForSearch !== "") {
      api
        .get(`/products?search=${textForSearch.toLowerCase()}`)
        .then((response) => {
          if (Array.isArray(response.data) === true) {
            setProducts(response.data);
          } else {
            let transformObjectResponseInArray = Object.values(response.data);

            setProducts(transformObjectResponseInArray);
          }
        })
        .catch(() => {})
        .finally(() => {
          setSearchLoading(false);
        });
    } else {
      api
        .get("/products")
        .then((response) => {
          if (Array.isArray(response.data) === true) {
            setProducts(response.data);
          } else {
            let transformObjectResponseInArray = Array.of(
              Object.entries(response.data)[0][1]
            );

            setProducts(transformObjectResponseInArray);
          }
        })
        .catch(() => {})
        .finally(() => {
          setSearchLoading(false);
        });
    }
  }
  function SelectCategory(id) {
    let productsFiltred = allProducts.filter(
      (category) => category.category_id === id
    );

    setProducts(productsFiltred);
  }
  function DeselectCategory() {
    setProducts(allProducts);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Quitanda do Zé</Text>
        <BorderlessButton onPress={Logout}>
          <Icon name={"logout"} color={colors.white} size={RFValue(30)} />
        </BorderlessButton>
      </View>

      <View>
        <Text style={styles.categoriesTitle}>Categorias</Text>
        {categoriesIsLoading ? (
          <SkeletonCategoryCards />
        ) : (
          <FlatList
            data={categories}
            keyExtractor={(item) => String(item.id)}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            contentContainerStyle={styles.categoryFlatlist}
            renderItem={({ item }) => (
              <CategoryCard
                item={item}
                selectCategory={(id) => {
                  SelectCategory(id);
                  setSelectedId(id);
                }}
                deselectCategory={() => {
                  setSelectedId(null);
                  DeselectCategory();
                }}
                selectedId={selectedId}
              />
            )}
          />
        )}

        <View style={styles.searchInputContainer}>
          <Icon
            name={"search"}
            color={colors.border}
            size={RFValue(30)}
            style={styles.searchInputIcon}
          />
          <TextInput
            style={styles.searchTextInput}
            placeholder="Buscar produtos..."
            placeholderTextColor={colors.border}
            returnKeyType="done"
            value={textForSearch}
            underlineColorAndroid="transparent"
            onSubmitEditing={() => SearchForProduct()}
            multiline={false}
            onChangeText={setTextForSearch}
            onBlur={() => Keyboard.dismiss()}
          />
          {searchLoading && (
            <ActivityIndicator
              color={colors.primary_light}
              style={styles.loading}
              size={RFValue(20)}
            />
          )}
        </View>
        <View style={styles.productsContainer}>
          <Text style={styles.productTitle}>Produtos</Text>

          {productsIsLoading ? (
            <SkeletonProductCard />
          ) : (
            <FlatList
              data={Array.isArray(products) === true ? products : []}
              keyExtractor={(item) => String(item.id)}
              numColumns={2}
              columnWrapperStyle={styles.columnStyle}
              contentContainerStyle={styles.productsFlatlist}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => <ProductCard item={item} />}
            />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingBottom: getBottomSpace(),
  },
  header: {
    backgroundColor: colors.primary,
    height: H * 0.1 + getStatusBarHeight(),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: getStatusBarHeight(),
    shadowColor: colors.dark,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 8,
  },
  headerTitle: {
    color: colors.white,
    fontSize: RFValue(25),
    paddingLeft: 10,
  },
  categoriesTitle: {
    color: colors.primary,
    fontSize: RFValue(23),
    paddingLeft: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  categoryFlatlist: {
    paddingRight: 20,
    height: W / 3,
  },
  searchInputContainer: {
    backgroundColor: colors.white,
    width: W - 40,
    height: H / 15,
    marginVertical: 10,
    marginVertical: 40,
    borderRadius: 14,
    borderColor: colors.border,
    borderWidth: 1,
    alignSelf: "center",
    flexDirection: "row",
  },
  searchInputIcon: {
    alignSelf: "center",
    paddingHorizontal: 10,
  },
  searchTextInput: {
    flex: 1,
    color: colors.text,
    fontSize: RFValue(18),
  },
  productsContainer: {
    backgroundColor: colors.primary,
    width: W,
    height: H / 2,
    borderTopLeftRadius: W / 5,
    borderTopRightRadius: W / 5,
  },
  productTitle: {
    color: colors.white,
    fontSize: RFValue(23),
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  productsFlatlist: {
    alignSelf: "center",
    paddingBottom: 20,
  },
  loading: {
    position: "absolute",
    right: 20,
    alignSelf: "center",
  },
  columnStyle: {
    justifyContent: "space-evenly",
    width: W,
  },
});
