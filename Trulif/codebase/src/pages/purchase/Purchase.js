import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { BsBackspace } from "react-icons/bs";
import {
  main,
  top,
  bottom,
  iconbox,
  input,
  button,
  plainButton,
  approvalCont,
  summaryCont,
  summaryTop,
  summaryBottom,
  congrats,
  tokenCont,
  nameAvatar,
  graph,
  belowGraph,
  inBelowGraph,
  strategy,
  strategyInfo,
  investButton,
} from "./Style";
import MainText from "../../components/atoms/text/MainText";
import GreenButton from "../../components/atoms/buttons/GreenButton";
import WhiteButton from "../../components/atoms/buttons/WhiteButton";
import Header from "../../components/molecules/header/Header";
import Valora from "../../components/resources/icons/valoraLogo.png";
import Graph from "../../components/resources/Chartgraph.png";
import Avatar from "../../components/resources/icons/avatar.png";
import Metamask from "../../components/resources/icons/metamaskLogo.png";
import {
  DataContext,
  PurchaseContext,
  TokenContext,
} from "../../store/Context";

const Purchase = () => {
  // context starts here
  const { selected } = useContext(DataContext);
  const { purchase, setPurchase } = useContext(PurchaseContext);
  const { myToken } = useContext(TokenContext);
  // context ends here
  const [amount, setAmount] = useState(0);
  const [tokenPage, setTokenPage] = useState(true);
  const [mainCont, setMainCont] = useState(false);
  const [summary, setSummary] = useState(false);
  const [btSecond, setBtSecond] = useState(false);
  const [initCongrats, setInitCongrats] = useState(false);
  const navigate = useNavigate();

  const handleTokenPage = () => {
    setTokenPage(false);
    setMainCont(true);
    setSummary(false);
    setBtSecond(false);
    setInitCongrats(false);
  };

  const handleBtSecond = () => {
    setTokenPage(false);
    setMainCont(true);
    setSummary(false);
    setBtSecond(true);
    setInitCongrats(false);
  };

  const handleMainCont = () => {
    setTokenPage(false);
    setMainCont(true);
    setSummary(false);
    setBtSecond(false);
    setInitCongrats(false);
  };

  const handleSummary = () => {
    setTokenPage(false);
    setMainCont(false);
    setSummary(true);
    setBtSecond(false);
    setInitCongrats(false);
  };

  const handleCongrats = () => {
    setTokenPage(false);
    setMainCont(false);
    setSummary(false);
    setBtSecond(false);
    setInitCongrats(true);
    updatePorfolio();
    var interval = setInterval(function () {
      clearInterval(interval);
      setTokenPage(false);
      setMainCont(false);
      setSummary(false);
      setBtSecond(false);
      setInitCongrats(false);
      setAmount(0);
      navigate("/portfolio");
    }, 5000);
  };

  const updatePorfolio = () => {
    // console.log(purchase);
    for (var i = 0; i < purchase.length; i++) {
      if (purchase[i].name === selected.name) {
        purchase.splice(i, 1);
        purchase.unshift({ name: selected.name, ROI: "0%", amount: amount });
      }
      setPurchase(purchase);
    }
  };

  const assign = (x) => {
    if (amount !== 0) {
      let y = amount;
      let z = y * 10 + x;
      if (z < 50000001) {
        setAmount(z);
      } else {
        setAmount(amount);
      }
    } else {
      setAmount(x);
    }
  };

  const reassign = () => {
    let x = amount;
    let y = Math.floor(x / 10);
    setAmount(y);
  };
  return (
    <div>
      <div style={tokenPage ? tokenCont : { display: "none" }}>
        <div style={nameAvatar}>
          <MainText
            text={selected.name}
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
        <div style={nameAvatar}>
          <MainText
            text={`Managed by ${selected.managed_by}`}
            color="#333333"
            weight="normal"
            size="14px"
          />
        </div>
        <div style={graph}>
          <img style={{ width: "100%" }} src={Graph} alt="graph" />
        </div>
        <div style={belowGraph}>
          <MainText
            text={`Asset Name`}
            color="#333333"
            weight="600"
            size="17px"
          />
          <div style={inBelowGraph}>
            <MainText text={`%`} color="#333333" weight="600" size="17px" />
            <MainText text={`Amt`} color="#333333" weight="600" size="17px" />
          </div>
        </div>
        {selected.assets.map((i, name) => (
          <div style={belowGraph} key={name}>
            <MainText
              text={i.name}
              color="#333333"
              weight="normal"
              size="17px"
            />
            <div style={inBelowGraph}>
              <MainText
                text={i.per}
                color="#333333"
                weight="normal"
                size="17px"
              />
              <MainText
                text={i.amount}
                color="#333333"
                weight="normal"
                size="17px"
              />
            </div>
          </div>
        ))}

        <div style={strategy}>
          <MainText
            text={`Strategy`}
            color="#333333"
            weight="600"
            size="17px"
          />
        </div>
        <div style={strategyInfo}>
          <MainText
            text={selected.strategy}
            color="#333333"
            weight="normal"
            size="17px"
          />
        </div>
        <div style={investButton}>
          <GreenButton text={"Invest"} onClick={() => handleTokenPage()} />
        </div>

        <Header />
      </div>
      {/*the main container */}
      <div style={mainCont ? main : { display: "none" }}>
        <div style={top}>
          <div style={iconbox}>
            <Link to="/connect">
              <AiOutlineClose />
            </Link>
          </div>
          <div style={input}>
            <MainText
              text={`Enter Amount`}
              color="#828282"
              weight="normal"
              size="17px"
            />
            <MainText
              text={`$${amount}`}
              color={amount === 0 ? "#828282" : "#27AE60"}
              weight="600"
              size="75px"
            />
            <div style={{ width: "80vw", margin: "120px auto 0px" }}>
              <GreenButton text={"Submit"} onClick={() => handleBtSecond()} />
            </div>
          </div>
        </div>
        <div style={bottom}>
          <button style={button} onClick={() => assign(1)}>
            1
          </button>
          <button style={button} onClick={() => assign(2)}>
            2
          </button>
          <button style={button} onClick={() => assign(3)}>
            3
          </button>
          <button style={button} onClick={() => assign(4)}>
            4
          </button>
          <button style={button} onClick={() => assign(5)}>
            5
          </button>
          <button style={button} onClick={() => assign(6)}>
            6
          </button>
          <button style={button} onClick={() => assign(7)}>
            7
          </button>
          <button style={button} onClick={() => assign(8)}>
            8
          </button>
          <button style={button} onClick={() => assign(9)}>
            9
          </button>
          <button style={plainButton}></button>
          <button style={button} onClick={() => assign(0)}>
            0
          </button>
          <button style={plainButton} onClick={() => reassign()}>
            <BsBackspace />
          </button>
        </div>
        {/* bottom second div */}
        <div style={btSecond ? approvalCont : { display: "none" }}>
          <img src={myToken !== "meta" ? Valora : Metamask} alt="logo" />
          <MainText
            text={myToken !== "meta" ? `valora` : `metamask`}
            color="#828282"
            weight="normal"
            size="17px"
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "80vw",
              margin: "60px auto 0px",
            }}
          >
            <MainText
              text={`Allow Trulif to spend ${amount} cUSD?`}
              color="#333333"
              weight="600"
              size="18px"
            />
            <MainText
              text={`A transaction fee of ${
                amount * 0.001
              } cUSD will be applied`}
              color="#828282"
              weight="400"
              size="14px"
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "80vw",
              margin: "50px auto 0px",
            }}
          >
            <GreenButton text={"Approve"} onClick={() => handleSummary()} />
            <WhiteButton text={"Cancel"} onClick={() => handleMainCont()} />
          </div>
        </div>
      </div>
      {/* summary container */}
      <div style={summary ? summaryCont : { display: "none" }}>
        <div style={summaryTop}>
          <MainText
            text={`$${amount}`}
            color={amount === 0 ? "#828282" : "#27AE60"}
            weight="600"
            size="75px"
          />
        </div>
        <div style={summaryBottom}>
          <MainText
            text={`Order summary`}
            color="#333333"
            weight="600"
            size="17px"
          />
          <div
            style={{
              display: "flex",
              width: "80vw",
              justifyContent: "space-between",
              margin: "10px auto",
            }}
          >
            <MainText
              text={`Amount`}
              color="#333333"
              weight="normal"
              size="17px"
            />
            <MainText
              text={`${amount} cUSD`}
              color="#333333"
              weight="normal"
              size="17px"
            />
          </div>
          <div
            style={{
              display: "flex",
              width: "80vw",
              justifyContent: "space-between",
              margin: "10px auto",
            }}
          >
            <MainText
              text={`Fee`}
              color="#333333"
              weight="normal"
              size="17px"
            />
            <MainText
              text={`${amount * 0.001} cUSD`}
              color="#333333"
              weight="normal"
              size="17px"
            />
          </div>
          <div
            style={{
              display: "flex",
              width: "80vw",
              justifyContent: "space-between",
              margin: "10px auto",
            }}
          >
            {/* <MainText
              text={`Tokens issued`}
              color="#333333"
              weight="normal"
              size="17px"
            />
            <MainText
              text={`${(amount / 13).toFixed(2)} Tokens`}
              color="#333333"
              weight="normal"
              size="17px"
            /> */}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "80vw",
              justifyContent: "space-between",
              margin: "90px auto 0px",
            }}
          >
            <MainText
              text={`Are you sure you want to invest?`}
              color="#333333"
              weight="normal"
              size="17px"
            />
            <GreenButton text="Invest" onClick={() => handleCongrats()} />
          </div>
        </div>
      </div>
      <div style={initCongrats ? congrats : { display: "none" }}>
        <MainText
          text={`$${amount}`}
          color={amount === 0 ? "#828282" : "#27AE60"}
          weight="600"
          size="75px"
        />
        <div
          style={{ display: "flex", width: "70%", justifyContent: "center" }}
        >
          <MainText
            text={`Congratulations!
          You have invested $${amount} cUSD in ${selected.name}.`}
            color="#333333"
            weight="normal"
            size="17px"
          />
        </div>
      </div>
    </div>
  );
};

export default Purchase;
