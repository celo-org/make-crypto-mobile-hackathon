import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import {
  main,
  link,
  modal,
  modalItem,
  divButton,
  walletOptions,
  walletContainer,
} from "./Style";
import Grid from "@mui/material/Grid";
import { TokenContext } from "../../store/Context";
import MainText from "../../components/atoms/text/MainText";
import Header from "../../components/molecules/header/Header";
import BlockCard from "../../components/molecules/blockCard/BlockCard";
import GreenButton from "../../components/atoms/buttons/GreenButton";
import Meta from "../../components/resources/icons/metamaskLogo.png";
import Valora from "../../components/resources/icons/valoraLogo.png";
import Avatar from "../../components/resources/icons/avatar.png";
import TrulifLoader from "../../components/resources/icons/trulifLoader.gif";
import Success from "../../components/resources/sucessLogo.png";

const Connect = () => {
  const { setMyToken } = useContext(TokenContext);

  const [showModal, setShowModal] = useState(false);
  const [chooseWallet, setChooseWallet] = useState(false);
  const [confirmWallet, setConfirmWallet] = useState(false);
  const [loadingWallet, setLoadingWallet] = useState(false);
  const [showComplete, setShowComplete] = useState(false);
  const [discover, setDiscover] = useState(false);
  const [meta, setMeta] = useState(false);

  const handleWallet = () => {
    setShowModal(true);
    setChooseWallet(true);
    setConfirmWallet(false);
    setLoadingWallet(false);
    setShowComplete(false);
  };

  const handleMeta = () => {
    setMeta(true);
    setMyToken("meta");
    setChooseWallet(false);
    setConfirmWallet(true);
    setLoadingWallet(false);
    setShowComplete(false);
  };

  const handleValora = () => {
    setMeta(false);
    setMyToken("valora");
    setChooseWallet(false);
    setConfirmWallet(true);
    setLoadingWallet(false);
    setShowComplete(false);
  };

  const handleLoading = () => {
    setChooseWallet(false);
    setConfirmWallet(false);
    setLoadingWallet(true);
    setShowComplete(false);
    var interval = setInterval(function () {
      clearInterval(interval);
      handleComplete();
    }, 5000);
  };

  const handleComplete = () => {
    setChooseWallet(false);
    setConfirmWallet(false);
    setLoadingWallet(false);
    setShowComplete(true);
    var interval = setInterval(function () {
      clearInterval(interval);
      setDiscover(true);
      setShowModal(false);
      setShowComplete(false);
    }, 5000);
  };

  return (
    <div style={main}>
      <Grid container justifyContent="center">
        <Grid
          container
          margin="10px auto"
          position="fixed"
          bottom="75px"
          justifyContent="center"
        >
          <div style={discover ? { display: "none" } : { width: "85%" }}>
            <GreenButton text="Connect wallet" onClick={() => handleWallet()} />
          </div>
        </Grid>
        <Grid
          container
          item
          xs={11}
          margin="40px 0px 10px"
          justifyContent="space-between"
        >
          <MainText text="Discover" size="32px" color="#333333" weight="600" />
          <img
            style={
              discover
                ? { display: "block", width: "25px", height: "25px" }
                : { display: "none" }
            }
            src={Avatar}
            alt="avatar"
          />
        </Grid>

        <Grid container item xs={11} margin="10px 0px">
          <Link to={discover ? `/token` : `/connect`} style={link}>
            <BlockCard />
          </Link>
        </Grid>
        <Header />
      </Grid>
      <div style={showModal ? modal : { dispay: "none" }}>
        <button style={divButton} onClick={() => setShowModal(false)}></button>
        <div style={modalItem}>
          {/* Choose the wallet */}
          <div style={chooseWallet ? walletContainer : { display: "none" }}>
            <MainText text={"Choose a wallet"} size="17px" color="#333333" />
            <div style={walletOptions} onClick={() => handleMeta()}>
              <img style={{ marginRight: "15px" }} src={Meta} alt="meta logo" />
              <MainText text={"Meta Mask"} size="17px" color="#333333" />
            </div>
            <div style={walletOptions} onClick={() => handleValora()}>
              <img
                style={{ marginRight: "15px" }}
                src={Valora}
                alt="meta logo"
              />
              <MainText text={"Valora"} size="17px" color="#333333" />
            </div>
          </div>
          {/* Confirm Selection */}
          <div
            style={confirmWallet ? { display: "block" } : { display: "none" }}
          >
            <img src={meta ? Meta : Valora} alt="meta logo" />
            <MainText
              text={meta ? "Meta Mask" : "Valora"}
              size="17px"
              color="#333333"
            />
            <div style={{ margin: "20px auto" }}>
              <MainText
                text={`Connect to Account A`}
                size="17px"
                color="#333333"
              />
              <MainText text={`(0x72...2389)`} size="17px" color="#333333" />
            </div>
            <div
              style={{
                width: "80%",
                display: "flex",
                justifyContent: "center",
                margin: "20px auto",
              }}
            >
              <MainText
                text={`By clicking continue, this app will have access to your addresses`}
                size="14px"
                color="#828282"
              />
            </div>
            <div style={{ width: "80%", margin: "20px auto" }}>
              <GreenButton text={"Connect"} onClick={() => handleLoading()} />
            </div>
          </div>
          {/* Wallet Loading */}
          <div
            style={
              loadingWallet || showComplete
                ? { width: "100%" }
                : { display: "none" }
            }
          >
            <MainText
              text={
                loadingWallet
                  ? "Connecting to Account A(0x72...2389)"
                  : "Connected to Account A(0x72...2389)"
              }
              color="#333333"
              weight="600"
            />
            <img
              style={{
                margin: "60px auto 30px",
                height: "70px",
                width: "70px",
              }}
              src={loadingWallet ? TrulifLoader : Success}
              alt="meta logo"
            />
            <div style={{ width: "80%", margin: "20px auto" }}>
              <GreenButton text={"Continue"} disabled />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Connect;
