import React from "react";
import { Link } from "react-router-dom";
import { main, logo, link } from "./Style";
import Grid from "@mui/material/Grid";
import WhiteButton from "../../components/atoms/buttons/WhiteButton";
import MainText from "../../components/atoms/text/MainText";
import Logo from "../../components/resources/Logo.png";

const Welcome = () => {
  return (
    <div style={main}>
      <Grid container justifyContent="center" alignItems="center">
        <img style={logo} src={Logo} alt="the official logo" />
        <Grid item xs={10} justifyContent="center">
          <MainText
            text="Welcome To Trulif"
            size="32px"
            color="white"
            weight="600"
          />
        </Grid>

        <Grid item xs={7.5} justifyContent="center" padding="10px 0px 30px">
          <MainText
            text="Making investing easier with non-custodial asset management on the blockchain"
            size="18px"
            color="white"
          />
        </Grid>

        <Grid item xs={10} justifyContent="center" padding="20px 0px">
          <Link to="/" style={link}>
            <WhiteButton text="Create a fund" />
          </Link>
        </Grid>

        <Grid item xs={10} justifyContent="center">
          <Link to="/Connect" style={link}>
            <WhiteButton text="Invest in fund" />
          </Link>
        </Grid>
      </Grid>
    </div>
  );
};

export default Welcome;
