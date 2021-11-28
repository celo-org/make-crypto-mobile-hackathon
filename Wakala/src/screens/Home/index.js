import React, { Fragment, useRef, useState, useEffect } from "react";
import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import Banner from "../../components/Banner";
import ScreenCmpt from "../../components/ScreenCmpt";
import RequestCard from "../../components/RequestCard";

import { COLORS, SIZES, FONTS } from "../../consts/theme";
import rawData from "../../utils/DepositRequestData";
import { MODEL, HOME_EMPTY } from "../../assets/images";
import ContractMethods from "../../utils/celo-integration/ContractMethods";
import { connect, useDispatch } from "react-redux";

const NavMenu = (props) => {
  const navigation = useNavigation();

  return (
    <View style={navStyles.nav}>
      <TouchableOpacity
        style={navStyles.buttonShadow}
        onPress={props.openModal}
      >
        <LinearGradient
          colors={[
            "#133FDB",
            "rgba(20, 63, 218, 0.994943)",
            "rgba(183, 0, 77, 0.3)",
          ]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1.2, y: 1.4 }}
          locations={[0.09, 0.5754, 1]}
          style={navStyles.button}
        >
          <Text style={navStyles.buttonText}>Send</Text>
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity
        style={navStyles.buttonShadow}
        onPress={() => navigation.navigate("Select Operation")}
      >
        <LinearGradient
          colors={["#133FDB", "rgba(183, 0, 77, 0.3)"]}
          start={{ x: -0.5, y: -0.5 }}
          end={{ x: 1, y: 1.5 }}
          style={navStyles.button}
        >
          <Text style={navStyles.buttonText}>Add/Withdraw</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const BannerContent = (props) => {
  return (
    <View style={bannerStyles.container}>
      <Image source={MODEL} style={bannerStyles.image} />
      <Text style={bannerStyles.title}>Coming soon</Text>
      <Text style={bannerStyles.text}>
        Stay put, we are soon adding cash option.
      </Text>

      <TouchableOpacity
        style={bannerStyles.buttonContainer}
        onPress={() => props.bannerRef.current?.closeBanner()}
      >
        <Text style={bannerStyles.button}>Dismiss</Text>
      </TouchableOpacity>
    </View>
  );
};

const HomeScreen = (props) => {
  const { navigation, magic, transactions } = props
  const bannerRef = useRef();

  const [isEmpty, setIsEmpty] = useState(true);
  const [depositRequestData, setDepositRequestData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const dispatch = useDispatch();
  let contractMethods = new ContractMethods(magic);


  function getDepositRequestData() {
    setDepositRequestData(rawData);

    if (rawData.length >= 1) {
      setIsEmpty(false);
    }
  }

  function removeDepositRequestItem(id) {
    const newData = depositRequestData.filter((item) => item._id !== id);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setDepositRequestData(newData);

    if (newData.length < 1) {
      setIsEmpty(true);
    }
  }
  const onRefresh = async () => {
    setIsFetching(true)
    const transactions = contractMethods.initEventListeners();
    const dispatchNewTx = (tx) => {
      dispatch({ type: "ADD_TRANSACTION", value: tx });
    };
    contractMethods.getPastEvents(dispatchNewTx);
    console.log(transactions);
    setIsFetching(false)
  }

  useEffect(async () => {
    getDepositRequestData();
    const isLoggedIn = await magic.user.isLoggedIn();
    if (isLoggedIn) {

      await contractMethods.init();
      if(props.contractMethods.initialized){
        contractMethods = props.contractMethods
      }else {
        setLoadingMessage("Initializing the Blockchain connection...")
        await contractMethods.init()
        dispatch({
          type: "INIT_CONTRACT_METHODS",
          value: contractMethods,
        });
      }
       await onRefresh()

    }
  }, []);
  const makeViewable = (_transactions) => {
    let newTXs = [];
    _transactions.forEach((tx) => {
      let newTX = tx;
      newTX._id = tx.id;
      newTX.stars = 0;
      newTX.type = tx.txType;
      newTXs.push(newTX);
    });
    return newTXs;
  };

  return (
    <Fragment>
      <ScreenCmpt home={true}>
        <View style={styles.menu}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Ionicons name="list-outline" size={38} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        {makeViewable(transactions).length === 0 ? (
          <View style={styles.wrapper}>
            {isFetching? <Text>{loadingMessage}</Text> : <></>}
            <Image source={HOME_EMPTY} style={styles.image} />
            <Text style={styles.text}>
              All requests have been fullfilled. Take a break, get some air,
              check back in later
            </Text>
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FlatList
              data={makeViewable(transactions)}
              keyExtractor={(item) => item._id}
              onRefresh={() => onRefresh()}
              refreshing={isFetching}
              renderItem={({ item }) => (
                <RequestCard
                  _id={item._id}
                  amount={item.amount}
                  stars={item.stars}
                  rating={item.rating}
                  type={item.type}
                  transaction={item}
                  deleteItem={removeDepositRequestItem}
                />
              )}
            />
          </View>
        )}
        <NavMenu openModal={() => bannerRef.current?.openBanner()} />
      </ScreenCmpt>
      <Banner
        ref={bannerRef}
        style={{ height: 350 }}
        content={<BannerContent bannerRef={bannerRef} />}
      />
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  menu: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 30,
  },

  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },

  image: {
    height: 180,
    maxWidth: SIZES.width * 0.8,
    resizeMode: "contain",
  },

  text: {
    fontSize: FONTS.body4.fontSize,
    fontFamily: FONTS.body4.fontFamily,
    lineHeight: FONTS.body4.lineHeight,
    textAlign: "center",
  },
});

const navStyles = StyleSheet.create({
  nav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 80,
    width: "100%",
    paddingHorizontal: 10,
    backgroundColor: "#F5F5F5",

    shadowColor: "#000",
    shadowOffset: {
      width: -4,
      height: -4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,

    elevation: 4,
  },

  button: {
    justifyContent: "center",
    borderRadius: (SIZES.width * 0.14) / 2,
    height: SIZES.width * 0.14,
    minWidth: SIZES.width * 0.41,
  },

  buttonShadow: {
    shadowColor: "#133FDB",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.22,
    shadowRadius: 4,

    elevation: 4,
  },

  buttonText: {
    fontSize: 13,
    lineHeight: 15,
    fontFamily: "Rubik_500Medium",
    textAlign: "center",
    color: "#FFF",
  },
});

const bannerStyles = StyleSheet.create({
  container: {
    height: "100%",
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },

  image: {
    height: 150,
    maxWidth: SIZES.width * 0.8,
    resizeMode: "contain",
    marginBottom: 20,
  },

  title: {
    fontSize: 18,
    lineHeight: 22,
    color: "#2C2948",
    textAlign: "center",
    fontFamily: "Rubik_500Medium",
  },

  text: {
    fontSize: 14,
    lineHeight: 21,
    color: "#1C1939",
    textAlign: "center",
    fontFamily: "Rubik_400Regular",
  },

  buttonContainer: {
    height: 50,
    width: 100,
    justifyContent: "center",
  },

  button: {
    fontSize: 14,
    lineHeight: 23,
    color: "#4840BB",
    textAlign: "center",
    fontFamily: "Rubik_700Bold",
  },
});

const mapStateToProps = (state) => {
  return {
    magic: state.magic,
    transactions: state.transactions,
    contractMethods: state.contractMethods
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: async (action) => {
      await dispatch(action);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
