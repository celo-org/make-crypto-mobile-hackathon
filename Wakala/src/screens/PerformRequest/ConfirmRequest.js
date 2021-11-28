import React, { Fragment, useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { TextInputMask } from "react-native-masked-text";

import SwipeButton from "../../components/SwipeButton";
import ScreenCmpt from "../../components/ScreenCmpt";
import Modal from "../../components/Modal";

import {COLORS, FONTS, SIZES} from "../../consts/theme";
import { ERROR, BORED } from "../../assets/images";
import ContractMethods from "../../utils/celo-integration/ContractMethods";
import ModalLoading from "../../components/ModalLoading";
import {mainStyles, cardStyles, modalStyles} from "../../consts/transactionScreenStyles";
import {connect} from "react-redux";
const styles = mainStyles

const CardElement = (props) => {
  return (
    <View style={cardStyles.container}>
      <View>
        <Text style={cardStyles.subTitle}>Send</Text>
        <TextInputMask
          type={"money"}
          options={{
            unit: "Ksh ",
          }}
          style={cardStyles.title}
          value={props.value}
          placeholder="Ksh 0,00"
          placeholderTextColor={COLORS.primary}
        />
      </View>
      <View>
        <Text style={cardStyles.subTitle}>To</Text>
        <Text style={cardStyles.title}>+254 705 124 767</Text>
        <TouchableOpacity style={cardStyles.copyContainer}>
          <Text style={cardStyles.copyText}>Copy</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ModalContent = (props) => {
  return (
    <View style={modalStyles.container}>
      {props.isActionSuccess ? (
        props.operation === "TopUp" ? (
          <View>
            <Image source={BORED} style={modalStyles.image} />
            <Text style={modalStyles.title}>Thank you!</Text>
            <Text style={modalStyles.text}>
              After your agents confirms of M-PESA payment receipt. Your cUSD
              will be deposited to your wallet.
            </Text>

            <TouchableOpacity onPress={() => props.handleAction()}>
              <Text style={modalStyles.button}>Got it!</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <Ionicons
              name="checkmark-circle"
              size={36}
              color="#4840BB"
              style={{ textAlign: "center", marginBottom: 12 }}
            />
            <Text style={[styles.title, { color: "#4840BB" }]}>
              Transaction Successful!
            </Text>
            <TouchableOpacity onPress={() => props.handleAction()}>
              <Text style={modalStyles.button}>Got it!</Text>
            </TouchableOpacity>
          </View>
        )
      ) : (
        <View>
          <Image source={ERROR} style={modalStyles.errorImage} />
          <Text style={modalStyles.title}>Oh Snap!</Text>
          <Text style={modalStyles.text}>
            Something just happened. Please try again.
          </Text>
          <Text style={{ ...FONTS.body5, textAlign: "center", marginTop: 5 }}>
            {props.errorMessage}
          </Text>
          <TouchableOpacity onPress={() => props.handleAction()}>
            <Text style={modalStyles.button}>Try again</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const ConfirmRequest = (props) => {
  const route = useRoute();
  const modalRef = useRef();
  const navigation = useNavigation();

  const value = route.params.value;
  const operation = route.params.operation;
  const transaction = route.params.transaction

  const [isActionSuccess, setIsActionSuccess] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("");

  const handleAction = async () => {
    openModal();
    //Init
    setIsLoading(true);
    setLoadingMessage("Initializing the transaction...");
    let contractMethods = new ContractMethods(props.magic)
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

    if (operation === "TopUp") {
      setLoadingMessage("Sending the deposit transaction...");
      try {
        let result = await contractMethods.agentAcceptDepositTransaction(transaction.id);
        setLoadingMessage("");
        setIsLoading(false);
      } catch (error) {
        setLoadingMessage(error.toString());
        setIsActionSuccess(false);
        setIsLoading(false);
      }
    } else {
      try {
        setLoadingMessage("Sending the withdrawal transaction...");
        let result = await contractMethods.agentAcceptWithdrawalTransaction(transaction.id);
        setLoadingMessage("");
        setIsLoading(false);
      } catch (error) {
        setLoadingMessage(error.toString());
        setIsActionSuccess(false);
        setIsLoading(false);
      }
    }
    setIsLoading(false);
  };

  const openModal = () => {
    modalRef.current?.openModal();
  };

  const closeModal = () => {
    if (!isActionSuccess) {
      modalRef.current?.closeModal();
      return;
    }

    modalRef.current?.closeModal();

    if (operation === "TopUp") {
      navigation.navigate("Success", {
        operation: operation,
      });
    } else {
      navigation.navigate("Rate", {
        operation: operation,
      });
    }
  };

  return (
    <Fragment>
      <ScreenCmpt>
        <View style={styles.container}>
          <View>
            <View style={styles.titleContainer}>
              <View style={styles.iconContainer}>
                {operation === "TopUp" ? (
                  <Ionicons
                    name="md-paper-plane-sharp"
                    size={20}
                    color="white"
                  />
                ) : (
                  <FontAwesome5 name="money-bill" size={20} color="white" />
                )}
              </View>
              <Text style={styles.title}>
                {operation === "TopUp"
                  ? "Send M-PESA now"
                  : "Confirm M-PESA Payment "}
              </Text>
            </View>

            <Text style={[styles.text, { marginBottom: 30, marginTop: 15 }]}>
              {operation === "TopUp"
                ? "Your cUSD is ready and has been deposited to the Wakala escrow account!"
                : "The agent confirmed that he sent Ksh 1,000 to your number +254 706 427 718"}
            </Text>
            <Text style={styles.text}>
              {operation === "TopUp"
                ? "To receive your cUSD, send M-PESA to details below."
                : "Once you receive the payment, confirm the transaction below."}
            </Text>
          </View>

          {operation === "TopUp" && <CardElement value={value} />}
          <View>
            <SwipeButton handleAction={handleAction} />
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.goBack()}
            >
              <Text style={[styles.secondaryButtonText, { color: "#133FDB" }]}>
                {operation === "TopUp" ? "Cancel" : "Didn’t receive payments?"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScreenCmpt>
      <Modal
          ref={modalRef}
          style={
            !isActionSuccess
                ? { height: 490 }
                : operation === "TopUp"
                    ? { height: 420 }
                    : { height: 300 }
          }
          content={
            isLoading ? (
                <ModalLoading loadingMessage={loadingMessage} />
            ) : (
                <ModalContent
                    handleAction={closeModal}
                    operation={operation}
                    isActionSuccess={isActionSuccess}
                    errorMessage={loadingMessage}
                />
            )
          }
      />
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    magic: state.magic,
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

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmRequest);

