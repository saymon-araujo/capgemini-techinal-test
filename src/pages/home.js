import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Keyboard,
  FlatList,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { useNetInfo } from "@react-native-community/netinfo";

import {
  getStatusBarHeight,
  getBottomSpace,
} from "react-native-iphone-x-helper";

import { useNavigation } from "@react-navigation/core";

import { RFValue } from "react-native-responsive-fontsize";
import { colors, W, H } from "../config";
import { BorderlessButton } from "react-native-gesture-handler";
import api from "../services/api";

import { CategoryCard } from "../components/CategoryCard";
import { ProductCard } from "../components/ProductCard";

export function Home() {
  const navigation = useNavigation();
  const netInfo = useNetInfo();

  const [categories, setCategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [textForSearch, setTextForSearch] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [categoriesIsLoading, setCategoriesIsLoading] = useState(true);
  const [productsIsLoading, setProductsIsLoading] = useState(true);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    if (netInfo.isInternetReachable) {
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
  }, [netInfo.isInternetReachable]);

  function Logout() {
    navigation.navigate("Login");
  }
  function SearchForProduct() {
    setSearchLoading(true);
    setSelectedId(null);
    DeselectCategory();

    if (textForSearch !== "") {
      api
        .get(`/products?search=${textForSearch.toLowerCase()}`)
        .then((response) => {
          setProducts(response.data);
          setAllProducts(response.data);
        })
        .catch((error) => {})
        .finally(() => {
          setSearchLoading(false);
        });
    } else {
      api
        .get("/products")
        .then((response) => {
          setProducts(response.data);
          setAllProducts(response.data);
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
          <View style={{ flexDirection: "row" }}>
            <View style={styles.containerItem}>
              <SkeletonPlaceholder
                backgroundColor={colors.text_light}
                speed={1000}
              >
                <View
                  style={{
                    width: W / 4.5,
                    height: RFValue(15),
                    borderRadius: 4,
                    alignSelf: "center",
                  }}
                />
              </SkeletonPlaceholder>
            </View>
            <View style={styles.containerItem}>
              <SkeletonPlaceholder
                backgroundColor={colors.text_light}
                speed={1000}
              >
                <View
                  style={{
                    width: W / 4.5,
                    height: RFValue(15),
                    borderRadius: 4,
                    alignSelf: "center",
                  }}
                />
              </SkeletonPlaceholder>
            </View>
            <View style={styles.containerItem}>
              <SkeletonPlaceholder
                backgroundColor={colors.text_light}
                speed={1000}
              >
                <View
                  style={{
                    width: W / 4.5,
                    height: RFValue(15),
                    borderRadius: 4,
                    alignSelf: "center",
                  }}
                />
              </SkeletonPlaceholder>
            </View>
          </View>
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
            <FlatList
              data={[1, 2, 3, 4]}
              keyExtractor={(index) => String(index)}
              numColumns={2}
              columnWrapperStyle={{
                justifyContent: "space-evenly",
                width: W,
              }}
              contentContainerStyle={styles.productsFlatlist}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <View style={styles.containerProduct}>
                  <SkeletonPlaceholder
                    backgroundColor={colors.text_light}
                    speed={1000}
                  >
                    <View
                      style={{
                        width: W / 4,
                        height: RFValue(15),
                        borderRadius: 4,
                        alignSelf: "center",
                      }}
                    />
                  </SkeletonPlaceholder>

                  <SkeletonPlaceholder
                    backgroundColor={colors.text_light}
                    speed={1000}
                  >
                    <View
                      style={{
                        width: W / 8,
                        height: RFValue(15),
                        borderRadius: 4,
                        alignSelf: "flex-end",

                        position: "absolute",

                        bottom: W / 5,
                        right: 20,
                      }}
                    />
                  </SkeletonPlaceholder>
                </View>
              )}
            />
          ) : (
            <FlatList
              data={products}
              keyExtractor={(item) => String(item.id)}
              numColumns={2}
              columnWrapperStyle={{
                justifyContent: "space-evenly",
                width: W,
              }}
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

  containerItem: {
    backgroundColor: colors.dark,
    height: W / 3,
    width: W / 3,
    marginLeft: 20,

    alignItems: "center",
    justifyContent: "flex-end",
    borderRadius: 14,
    paddingBottom: 5,
  },
  containerProduct: {
    backgroundColor: colors.dark,
    height: W / 2.3,
    width: W / 2.3,
    marginVertical: 20,

    borderRadius: 20,
    padding: 5,
  },
});
