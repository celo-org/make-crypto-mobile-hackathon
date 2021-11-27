import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  tokenCont,
  nameAvatar,
  belowGraph,
  inBelowGraph,
  belowGraphy,
} from "./Style";
import MainText from "../../components/atoms/text/MainText";
import Header from "../../components/molecules/header/Header";
import Avatar from "../../components/resources/icons/avatar.png";
import { trulifData } from "../../store/API";
import { DataContext, PurchaseContext } from "../../store/Context";

const Portfolio = () => {
  const { setSelected } = useContext(DataContext);
  const { purchase } = useContext(PurchaseContext);

  const showI = (x) => {
    for (var i = 0; i < trulifData.length; i++) {
      if (x === trulifData[i].name) {
        setSelected(trulifData[i]);
      }
    }
  };

  const convertWithComma = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div>
      <div style={tokenCont}>
        <div style={nameAvatar}>
          <MainText
            text={`Your Portfolio`}
            color="#333333"
            weight="600"
            size="32px"
          />
          <img
            style={{ width: "30px", height: "30px" }}
            src={Avatar}
            alt="avatar"
          />
        </div>
        {/* <div style={graph}>
          <img style={{ width: "100%" }} src={Graph} alt="graph" />
        </div> */}
        <div style={belowGraph}>
          <MainText
            text={`Holdings`}
            color="#333333"
            weight="500"
            size="15px"
          />
          <div style={inBelowGraph}>
            <MainText text={`ROI`} color="#333333" weight="500" size="15px" />
            <MainText
              text={`Amount`}
              color="#333333"
              weight="500"
              size="15px"
            />
          </div>
        </div>
        <Link style={{ textDecoration: "none" }} to="/token">
          {purchase.map((i, name) => (
            <div key={name} style={belowGraphy} onClick={() => showI(i.name)}>
              <MainText
                text={i.name}
                color="#333333"
                weight="normal"
                size="17px"
              />
              <div style={inBelowGraph}>
                <MainText
                  text={i.ROI}
                  color="#333333"
                  weight="normal"
                  size="17px"
                />
                <MainText
                  text={convertWithComma(i.amount)}
                  color="#333333"
                  weight="normal"
                  size="17px"
                />
              </div>
            </div>
          ))}
        </Link>

        <Header />
      </div>
    </div>
  );
};

export default Portfolio;
