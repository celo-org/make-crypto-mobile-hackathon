import Celebration from "../../components/resources/celebrationBackground.gif";

export const main = {
  width: "100vw",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
};

export const top = {
  width: "100vw",
  height: "60%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "whitesmoke",
};

export const bottom = {
  width: "100vw",
  height: "40%",
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
  flexWrap: "wrap",
  backgroundColor: "rgba(206, 210, 217, 0.7)",
};

export const iconbox = {
  width: "90vw",
  height: "50px",
  display: "flex",
  justifyContent: "left",
  alignItems: "center",
};

export const input = {
  width: "100vw",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

export const button = {
  width: "27%",
  height: "50px",
  backgroundColor: "#FFFFFF",
  boxShadow: "0px 1px 0px rgba(0, 0, 0, 0.3)",
  fontSize: "25px",
  border: 0,
  borderRadius: "5px",
};

export const plainButton = {
  width: "27%",
  height: "50px",
  backgroundColor: "rgba(206, 210, 217, 0)",
  fontSize: "25px",
  border: 0,
  borderRadius: "5px",
};

export const approvalCont = {
  width: "100%",
  height: "60%",
  position: "fixed",
  bottom: 0,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#fff",
  borderRadius: "15px 15px 0 0",
  zIndex: 9,
  boxShadow: "1px 1px 7px 0px rgba(0, 0, 0, 0.3)",
};

export const summaryCont = {
  width: "100%",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "whitesmoke",
  zIndex: 10,
};

export const summaryTop = {
  width: "100%",
  height: "45%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "whitesmoke",
  zIndex: 10,
};

export const summaryBottom = {
  width: "100%",
  height: "50%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "whitesmoke",
  zIndex: 10,
};

export const congrats = {
  width: "100%",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "whitesmoke",
  zIndex: 10,
  backgroundImage: `url(${Celebration})`,
};

export const tokenCont = {
  width: "100vw",
  height: "100%",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "whitesmoke",
};

export const nameAvatar = {
  width: "90vw",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

export const graph = {
  width: "90vw",
  height: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  margin: "20px 0",
  borderRadius: "5px",
};

export const belowGraph = {
  width: "90vw",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  margin: "45px 0 5px",
};

export const belowGraphy = {
  width: "90vw",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  margin: "5px 0",
  backgroundColor: "white",
  padding: "10px",
  borderRadius: "5px",
  boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.12)",
};

export const inBelowGraph = {
  width: "40vw",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

export const strategy = {
  width: "90vw",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  margin: "20px 0 10px",
};

export const strategyInfo = {
  width: "90vw",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  margin: "10px 0 150px",
  textAlign: "left",
};

export const investButton = {
  width: "90vw",
  position: "fixed",
  bottom: "80px",
};
